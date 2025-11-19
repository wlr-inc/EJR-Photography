import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Heart,
  Star,
  Users,
  GraduationCap,
  Baby,
  User,
} from "lucide-react";
import { usePhotos } from "../hooks/useFirebase";
import PhotoModal from "../components/PhotoModal";

const Home: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { photos } = usePhotos();

  // Get only featured photos, limit to 6
  const featuredPhotos = photos.filter((photo) => photo.featured).slice(0, 6);

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("public/images/6B1FE07C-5320-42B8-9143-16608C1F8893.JPG")',
          }}
        ></div>
        <div className="absolute inset-0"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-2xl space-y-6 border border-gray-200"
          >
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900">
              Capturing Life's
              <span className="block text-gray-600 bold">
                Beautiful Moments
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-900 max-w-2xl mx-auto leading-relaxed">
              Capturing Life in The Flathead Valley, MT. Portraits, events, and
              everyday moments—photos that feel real, natural, and true to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/portfolio"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>View Portfolio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-secondary border bg-white text-gray-900 hover:bg-gray-100 inline-flex items-center space-x-2"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Photography Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specializing in capturing your most precious moments with
              creativity and professionalism
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Family Photos",
                description:
                  "No matter the size, every moment during our session will feel special and truly one-of-a-kind.",
              },
              {
                icon: GraduationCap,
                title: "Senior Photos",
                description:
                  "Celebrate this milestone with images that reflect your accomplishments and who you are! Memories to cherish for a lifetime.",
              },
              {
                icon: Heart,
                title: "Engagement & Proposals",
                description:
                  "Whether it's a surprise proposal or a romantic engagement, every photo will reflect your love, connection, and the excitement of your journey together.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: Baby,
                title: "Kid Photos",
                description:
                  "Childhood is short, but the memories last forever. I capture the wonder and imagination they carry and the love and giggles they hold. A memory to last a lifetime.",
              },
              {
                icon: User,
                title: "Portrait Photography",
                description:
                  "I focus on capturing your amazing personality, confidence, and what makes you, you!",
              },
              {
                icon: Star,
                title: "Maternity Photos",
                description:
                  "Every pregnancy is unique. I focus on capturing the love, excitement, and connection you feel as you await your little one.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-gray-600">Check out my best work!</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPhotos.length > 0
              ? featuredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openPhotoModal(photo)}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {photo.title}
                      </span>
                    </div>
                  </motion.div>
                ))
              : // Fallback placeholder grid when no featured photos
                [1, 2, 3, 4, 5, 6].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">
                        No Featured Photos
                      </span>
                    </div>
                  </motion.div>
                ))}
          </div>

          <div className="text-center mt-12 mb-0">
            <Link
              to="/portfolio"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact/Feedback Section with Map */}
      <section className="text-gray-600 body-font relative bg-gray-50">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Kalispell,+MT+(PhotoZ+Photography)&ie=UTF8&t=&z=12&iwloc=B&output=embed"
            className="grayscale contrast-125 opacity-40"
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Located in <strong>Kalispell, MT</strong>
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Serving the beautiful Flathead Valley and surrounding areas.
              Capturing life's precious moments in the heart of Montana's
              stunning landscape.
            </p>

            <Link
              to="/contact"
              className="mt-6 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg text-center inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Ready to Capture Your Story?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Let's work together to create beautiful, timeless photographs that
              you'll treasure forever. Get in touch to discuss your photography
              needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closePhotoModal}
      />
    </div>
  );
};

export default Home;
