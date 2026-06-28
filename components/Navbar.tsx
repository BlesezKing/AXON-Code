'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080B10]/90 backdrop-blur-xl border-b border-white/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div style={{ maxWidth: '1024px', marginLeft: 'auto', marginRight: 'auto', width: '100%', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* SVG Tech/AI icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Central node */}
            <circle cx="16" cy="16" r="3" fill="#1E6BFF" />
            {/* Outer nodes */}
            <circle cx="16" cy="5" r="2" fill="#00B4D8" />
            <circle cx="16" cy="27" r="2" fill="#00B4D8" />
            <circle cx="5" cy="16" r="2" fill="#00B4D8" />
            <circle cx="27" cy="16" r="2" fill="#00B4D8" />
            <circle cx="8" cy="8" r="1.5" fill="#1E6BFF" opacity="0.6" />
            <circle cx="24" cy="8" r="1.5" fill="#1E6BFF" opacity="0.6" />
            <circle cx="8" cy="24" r="1.5" fill="#1E6BFF" opacity="0.6" />
            <circle cx="24" cy="24" r="1.5" fill="#1E6BFF" opacity="0.6" />
            {/* Connection lines */}
            <line x1="16" y1="13" x2="16" y2="7" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
            <line x1="16" y1="19" x2="16" y2="25" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
            <line x1="13" y1="16" x2="7" y2="16" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
            <line x1="19" y1="16" x2="25" y2="16" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
            <line x1="14" y1="14" x2="9.5" y2="9.5" stroke="#1E6BFF" strokeWidth="1" opacity="0.4" />
            <line x1="18" y1="14" x2="22.5" y2="9.5" stroke="#1E6BFF" strokeWidth="1" opacity="0.4" />
            <line x1="14" y1="18" x2="9.5" y2="22.5" stroke="#1E6BFF" strokeWidth="1" opacity="0.4" />
            <line x1="18" y1="18" x2="22.5" y2="22.5" stroke="#1E6BFF" strokeWidth="1" opacity="0.4" />
          </svg>

          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Axon Code
          </span>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#1E6BFF] text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-[#00B4D8] transition-colors duration-200"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
          id="navbar-cta"
          aria-label="Comenzar proyecto"
        >
          Comenzar proyecto
        </motion.button>
      </div>
    </nav>
  );
}
