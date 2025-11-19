import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePhotos, useCategories } from "../hooks/useFirebase";
import PhotoModal from "../components/PhotoModal";

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { photos, loading: photosLoading } = usePhotos();
  const { categories: firebaseCategories, loading: categoriesLoading } =
    useCategories();

  // Combine default categories with Firebase categories
  const allCategories = [
    { id: "all", name: "All Work" },
    ...firebaseCategories.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  // Filter photos based on selected category
  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  if (photosLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Portfolio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           Check out some of my latest work!
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openPhotoModal(photo)}
            >
              {/* Display actual image or placeholder */}
              {photo.imageUrl ? (
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <span className="text-gray-600">No Image</span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm opacity-90">{photo.description}</p>
                  {photo.featured && (
                    <span className="inline-block mt-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No photos found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closePhotoModal}
      />
    </div>
  );
};

export default Portfolio;
