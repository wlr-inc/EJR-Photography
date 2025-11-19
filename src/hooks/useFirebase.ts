import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../lib/firebase";

export interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: any;
  fileName?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: any;
}

// Hook for managing photos
export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const photosQuery = query(
        collection(db, "photos"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(photosQuery);
      const photosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Photo[];
      setPhotos(photosData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (
    file: File,
    photoData: Omit<Photo, "id" | "imageUrl" | "createdAt">
  ) => {
    try {
      console.log("Starting photo upload...", file.name);

      // Upload image to Firebase Storage
      const fileName = `photos/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);

      console.log("Uploading to Storage...", fileName);
      const snapshot = await uploadBytes(storageRef, file);

      console.log("Getting download URL...");
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("Saving to Firestore...", downloadURL);
      // Save photo metadata to Firestore
      const docRef = await addDoc(collection(db, "photos"), {
        ...photoData,
        imageUrl: downloadURL,
        fileName: fileName,
        createdAt: serverTimestamp(),
      });

      const newPhoto: Photo = {
        id: docRef.id,
        ...photoData,
        imageUrl: downloadURL,
        fileName: fileName,
        createdAt: new Date(),
      };

      setPhotos((prev) => [newPhoto, ...prev]);
      console.log("Photo uploaded successfully!", newPhoto);
      return newPhoto;
    } catch (err: any) {
      console.error("Upload error:", err);
      const errorMessage =
        err.code === "storage/unauthorized"
          ? "Storage not properly configured. Please check Firebase Storage setup."
          : err.message;
      setError(errorMessage);
      throw err;
    }
  };

  const deletePhoto = async (photo: Photo) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "photos", photo.id));

      // Delete from Storage
      if (photo.fileName) {
        const storageRef = ref(storage, photo.fileName);
        await deleteObject(storageRef);
      }

      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updatePhoto = async (photoId: string, updates: Partial<Photo>) => {
    try {
      await updateDoc(doc(db, "photos", photoId), updates);
      setPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, ...updates } : p))
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const toggleFeatured = async (photoId: string, featured: boolean) => {
    try {
      await updateDoc(doc(db, "photos", photoId), { featured });
      setPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, featured } : p))
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return {
    photos,
    loading,
    error,
    uploadPhoto,
    deletePhoto,
    updatePhoto,
    toggleFeatured,
    refetch: fetchPhotos,
  };
};

// Hook for managing categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesQuery = query(
        collection(db, "categories"),
        orderBy("createdAt", "asc")
      );
      const querySnapshot = await getDocs(categoriesQuery);
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string) => {
    try {
      const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      // Check if category already exists
      const existingCategory = categories.find((cat) => cat.slug === slug);
      if (existingCategory) {
        throw new Error("Category already exists");
      }

      const docRef = await addDoc(collection(db, "categories"), {
        name,
        slug,
        createdAt: serverTimestamp(),
      });

      const newCategory: Category = {
        id: docRef.id,
        name,
        slug,
        createdAt: new Date(),
      };

      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await deleteDoc(doc(db, "categories", categoryId));
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateCategory = async (categoryId: string, name: string) => {
    try {
      const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      await updateDoc(doc(db, "categories", categoryId), { name, slug });
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, name, slug } : c))
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    deleteCategory,
    updateCategory,
    refetch: fetchCategories,
  };
};
