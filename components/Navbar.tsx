'use client';

import { useEffect, useState, useCallback } from 'react';

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
      <div style={{ maxWidth: '1024px', marginLeft: 'auto', marginRight: 'auto', width: '100%', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-axon-code.png"
            alt="Axon Code"
            width={36}
            height={36}
            style={{ width: '36px', height: '36px', objectFit: 'contain' }}
          />

          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Axon Code
          </span>
        </div>
      </div>
    </nav>
  );
}
