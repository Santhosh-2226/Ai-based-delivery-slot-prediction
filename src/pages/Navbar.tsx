import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between px-6">
        <Link to="/" className="text-xl font-bold text-blue-600">ParcelAI</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/services" className="hover:text-blue-500">Services</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
