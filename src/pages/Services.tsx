import React from "react";
import { motion } from "framer-motion";

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <h1 className="text-4xl font-bold text-blue-600 dark:text-white">Our Services</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          AI-powered tracking, on-time delivery, and logistics automation.
        </p>
      </motion.div>
    </div>
  );
};

export default Services;
