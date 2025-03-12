import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-col items-center space-y-2">
        {/* Social Icons */}
        <div className="flex space-x-6 text-gray-400 text-2xl">
          <FaInstagram className="hover:text-white transition" />
          <FaEnvelope className="hover:text-white transition" />
          <FaPhone className="hover:text-white transition" />
        </div>
        {/* Copyright */}
        <p className="text-sm text-gray-500">&copy; 2025 Scents. All rights reserved.</p>
      </div>
    </footer>
  );
}
