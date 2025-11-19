import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Upload,
  Trash2,
  Edit,
  Eye,
  Tag,
  X,
  Save,
  AlertCircle,
  Star,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { usePhotos, useCategories } from "../hooks/useFirebase";

const Admin: React.FC = () => {
  const { currentUser } = useAuth();
  const {
    photos,
    loading: photosLoading,
    uploadPhoto,
    deletePhoto,
    updatePhoto,
    toggleFeatured,
  } = usePhotos();
  const {
    categories,
    loading: categoriesLoading,
    addCategory,
    deleteCategory,
    updateCategory,
  } = useCategories();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPhotoData, setEditPhotoData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState("");

  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setError("");
      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title || !uploadForm.category) {
      setError("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      await uploadPhoto(uploadForm.file, {
        title: uploadForm.title,
        description: uploadForm.description,
        category: uploadForm.category,
      });

      setUploadForm({ title: "", description: "", category: "", file: null });
      setShowUploadModal(false);
    } catch (error: any) {
      setError(error.message || "Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photo: any) => {
    if (
      window.confirm(
        "Are you sure you want to delete this photo? This action cannot be undone."
      )
    ) {
      try {
        await deletePhoto(photo);
      } catch (error: any) {
        setError(error.message || "Failed to delete photo");
      }
    }
  };

  const handleEditPhoto = (photo: any) => {
    setEditingPhoto(photo.id);
    setEditPhotoData({
      title: photo.title,
      description: photo.description,
      category: photo.category,
    });
    setShowEditModal(true);
  };

  const handleUpdatePhoto = async () => {
    if (!editingPhoto) return;

    try {
      await updatePhoto(editingPhoto, editPhotoData);
      setShowEditModal(false);
      setEditingPhoto(null);
      setEditPhotoData({ title: "", description: "", category: "" });
    } catch (error: any) {
      setError(error.message || "Failed to update photo");
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      await addCategory(newCategoryName.trim());
      setNewCategoryName("");
      setShowCategoryModal(false);
    } catch (error: any) {
      setError(error.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    // Check if category is in use
    const photosInCategory = photos.filter((p) => p.category === categoryId);
    if (photosInCategory.length > 0) {
      setError(
        `Cannot delete category: ${photosInCategory.length} photos are using this category`
      );
      return;
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
      } catch (error: any) {
        setError(error.message || "Failed to delete category");
      }
    }
  };

  const handleUpdateCategory = async (categoryId: string, newName: string) => {
    try {
      await updateCategory(categoryId, newName);
      setEditingCategory(null);
    } catch (error: any) {
      setError(error.message || "Failed to update category");
    }
  };

  if (photosLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Portfolio Management
            </h1>
            <p className="text-gray-600 mt-1">
              Upload and manage your photography portfolio
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <Tag className="h-4 w-4" />
              <span>Manage Categories</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Photo</span>
            </button>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-gray-900">
              {photos.length}
            </div>
            <div className="text-sm text-gray-600">Total Photos</div>
          </div>
          {categories.slice(0, 3).map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="text-2xl font-bold text-gray-900">
                {photos.filter((p) => p.category === category.slug).length}
              </div>
              <div className="text-sm text-gray-600">{category.name}</div>
            </div>
          ))}
        </motion.div>

        {/* Photos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {photos.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No photos yet
              </h3>
              <p className="text-gray-600">
                Upload your first photo to get started
              </p>
            </div>
          ) : (
            photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {photo.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {categories.find((c) => c.slug === photo.category)
                        ?.name || photo.category}
                    </span>
                    {photo.featured && (
                      <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          toggleFeatured(photo.id, !photo.featured)
                        }
                        className={`${
                          photo.featured
                            ? "text-yellow-600 hover:text-yellow-700"
                            : "text-gray-400 hover:text-yellow-600"
                        }`}
                        title={
                          photo.featured
                            ? "Remove from featured"
                            : "Add to featured"
                        }
                      >
                        <Star
                          className={`h-4 w-4 ${
                            photo.featured ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => window.open(photo.imageUrl, "_blank")}
                        className="text-gray-600 hover:text-gray-900"
                        title="View full size"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditPhoto(photo)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Edit photo"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeletePhoto(photo)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete photo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upload New Photo
              </h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={(e) =>
                      setUploadForm({ ...uploadForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Photo title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    rows={3}
                    placeholder="Photo description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={uploadForm.category}
                    onChange={(e) =>
                      setUploadForm({ ...uploadForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo File *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max file size: 5MB
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center"
                  >
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      "Upload Photo"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Photo Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Edit Photo
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editPhotoData.title}
                    onChange={(e) =>
                      setEditPhotoData({
                        ...editPhotoData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter photo title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editPhotoData.description}
                    onChange={(e) =>
                      setEditPhotoData({
                        ...editPhotoData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter photo description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editPhotoData.category}
                    onChange={(e) =>
                      setEditPhotoData({
                        ...editPhotoData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePhoto}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Update Photo
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Category Management Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Manage Categories
              </h2>

              {/* Add New Category */}
              <form onSubmit={handleAddCategory} className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="New category name"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </form>

              {/* Categories List */}
              <div className="space-y-2 mb-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    {editingCategory === category.id ? (
                      <input
                        type="text"
                        defaultValue={category.name}
                        onBlur={(e) =>
                          handleUpdateCategory(category.id, e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateCategory(
                              category.id,
                              e.currentTarget.value
                            );
                          }
                        }}
                        className="flex-1 px-2 py-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <span className="flex-1">{category.name}</span>
                    )}
                    <div className="flex space-x-1">
                      <button
                        onClick={() =>
                          setEditingCategory(
                            editingCategory === category.id ? null : category.id
                          )
                        }
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {editingCategory === category.id ? (
                          <Save className="h-4 w-4" />
                        ) : (
                          <Edit className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowCategoryModal(false)}
                className="w-full btn-secondary"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
