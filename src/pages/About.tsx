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

const About: React.FC = () => {
  const stats = [
    { icon: Camera, label: "Photos Taken", value: "10,000+" },
  ];

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
            About Me.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate photographer dedicated to capturing the beauty in every
            moment
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="public/images/C5F89460-8FBA-4DB2-9F53-68FC447B1A57.JPG"
              alt="Emma - Photographer"
              className="aspect-square object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              My Photography Journey
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hey, I’m Emma Ratkowski. I’ve been taking photos for over five years, and I recently turned my passion into a photography business. I love capturing landscapes, skies, people, families, and animals—basically anything that tells a story.<br></br> Living in Kalispell, Montana gives me endless spots to shoot, and I especially love heading to Glacier for the perfect shot. Photography is my way of sharing the moments and beauty I see every day.
              </p>
              <p>
               
              </p>
              <p>
               
              </p>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                My Philosophy
              </h3>
              <p className="text-gray-600 italic">
                "Every moment is unique and deserves to be captured with care,
                creativity, and genuine emotion."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-1 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="font-serif text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Behind the Scenes Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-8">
            Behind the Scenes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: "public/images/64B68F5E-3959-425F-8F64-BA1877838C1B.JPG",
                alt: "Emma with camera",
              },
              {
                src: "public/images/9771B0B6-D9A4-46B5-B61F-DCDEA032FE10.JPG",
                alt: "Studio setup",
              },
              {
                src: "public/images/253A077B-5D12-4B63-8573-257E9B9654D6.JPG",
                alt: "On location shoot",
              },
              {
                src: "public/images/258B8FF9-7F9D-49D3-9C2C-D8F764D50F20.JPG",
                alt: "Camera equipment",
              },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6 }}
                   viewport={{ once: true }}
                   className="text-center mb-16"
                 >
          <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-8">
            What I Offer
          </h2>
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
        </motion.div>
      </div>
    </div>
  );
};

export default About;
