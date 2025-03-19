import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 pt-8 pb-16 text-center"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-base text-gray-500 dark:text-gray-400">
          &copy; 2025 ParcelAI. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
