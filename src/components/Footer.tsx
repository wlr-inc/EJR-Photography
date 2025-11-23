import React from "react";
import { Link } from "react-router-dom";
import { Camera, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { currentUser } = useAuth();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-white" />
              <span className="font-serif text-xl font-semibold">
                EJR Photography
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Capturing life's precious moments with artistic vision and
              professional expertise. Specializing in portraits, events, nature,
              and lifestyle photography.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  emmaratkowski@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">(406) 210-6827</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/captured_by_emma_photography/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Built by Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              Built by{" "}
              <code>
                <span className="text-gray-400">&lt;</span>wlr
                <span className="text-gray-400">&gt;</span>
              </code>
            </h3>
            <div className="flex space-x-4 mb-4">
              <p className="text-gray-300 text-sm">
                <a
                  href="https://wlrdevelopment.com"
                  className="hover:underline text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wlrdevelopment.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex justify-center items-center space-x-4 mb-2">
            <p className="text-gray-400 text-sm">
              © {currentYear} EJR Photography. All rights reserved.
            </p>
            {currentUser && (
              <Link
                to="/admin"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 underline"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
