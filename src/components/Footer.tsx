
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 py-6">
      <div className="section-container">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Raazi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
