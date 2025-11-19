import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoModal({
  photo,
  isOpen,
  onClose,
}: PhotoModalProps) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close photo modal"
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            {/* Photo info */}
            <div className="p-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                {photo.title}
              </h3>
              <p className="text-gray-600 mb-4">{photo.description}</p>
              <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {photo.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
