import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaEnvelope, FaArrowRight } from "react-icons/fa"; 

function Footer() {
  return (
    <div>
      <footer className="bg-sky-800 text-white pt-16 pb-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-wider uppercase">ABOUT US</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We believe books are more than just pages – they are windows into new worlds, teachers of wisdom, and companions for life. Our journey began with a passion for storytelling and a mission to make reading accessible, enjoyable, and inspiring for everyone.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-wider uppercase">NEWS LETTER</h3>
            <p className="text-gray-300 text-sm">
              Stay updated with our latest trends
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center max-w-sm">
              <input 
                type="email" 
                placeholder="E Mail" 
                className="bg-white text-gray-900 px-4 py-2.5 w-full focus:outline-none text-sm"
                required
              />
              <button 
                type="submit" 
                className="bg-sky-50 hover:bg-sky-300 text-black px-5 py-2.5 flex items-center justify-center transition-colors"
              >
                <FaArrowRight size={16} />
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-wider uppercase">FOLLOW US</h3>
            <p className="text-gray-300 text-sm">
              Let us be social
            </p>
            <div className="flex items-center gap-5 pt-2">
              <a href="#" className="text-white hover:text-sky-400 transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-white hover:text-sky-400 transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-sky-400 transition-colors">
                <FaXTwitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-sky-400 transition-colors">
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-sky-700/50 pt-6 text-center text-xs text-gray-300">
          <p>
            ArchivalBlue © 2026 All rights reserved 
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;