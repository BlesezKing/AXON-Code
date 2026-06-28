'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '34601151617';
const WHATSAPP_DISPLAY = '601 15 16 17';
const EMAIL = 'axoncodeservice@gmail.com';

// Distance (in px of page scroll), measured after the hero animation ends,
// over which the button rises from the bottom of the hero to the top.
const RISE_DISTANCE = 400;
const TOP_OFFSET = 20;
const BOTTOM_OFFSET = 32;

export default function ContactCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  // Button stays docked at the bottom-right of the hero for the entire
  // assembly animation, then rises to the top-right once it's finished.
  useEffect(() => {
    const update = () => {
      const btn = btnRef.current;
      const hero = document.getElementById('hero-canvas-container');
      if (!btn || !hero) return;

      const heroEnd = hero.offsetTop + hero.offsetHeight - window.innerHeight;
      const startTop = window.innerHeight - BOTTOM_OFFSET - btn.offsetHeight;
      const scrollPastHero = Math.max(window.scrollY - heroEnd, 0);
      const progress = Math.min(scrollPastHero / RISE_DISTANCE, 1);
      const top = startTop + (TOP_OFFSET - startTop) * progress;
      btn.style.top = `${top}px`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      {/* Floating CTA button */}
      <motion.button
        ref={btnRef}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-white rounded-full px-8 py-4 text-base font-semibold transition-colors duration-200"
        style={{
          fontFamily: 'Inter, sans-serif',
          position: 'fixed',
          right: '24px',
          zIndex: 50,
          background: 'linear-gradient(to bottom, #2563EB, #1E6BFF)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 12px 36px rgba(30,107,255,0.5)',
        }}
        id="floating-cta"
        aria-haspopup="dialog"
        aria-label="Comenzar proyecto"
      >
        Comenzar proyecto
        <span aria-hidden="true" style={{ opacity: 0.7 }}>→</span>
      </motion.button>

      {/* Contact modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(8,11,16,0.75)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '440px',
                borderRadius: '24px',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(30,107,255,0.55) 0%, rgba(0,180,216,0.2) 50%, rgba(30,107,255,0.35) 100%)',
              }}
            >
              <div
                style={{
                  borderRadius: '23px',
                  padding: '48px 36px',
                  background: 'linear-gradient(160deg, rgba(13,17,23,0.98) 0%, rgba(8,11,16,1) 100%)',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Close button */}
                <button
                  onClick={close}
                  aria-label="Cerrar"
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(148,163,184,0.7)',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>

                <h2
                  id="contact-modal-title"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
                    color: '#fff',
                    marginBottom: '12px',
                  }}
                >
                  Hablemos de tu proyecto
                </h2>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '15px',
                    color: 'rgba(148,163,184,0.7)',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                  }}
                >
                  Elige cómo prefieres contactar con nosotros. Te respondemos en menos de 24h.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* WhatsApp link */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-whatsapp-link"
                    aria-label={`Contactar por WhatsApp al ${WHATSAPP_DISPLAY}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      borderRadius: '14px',
                      padding: '16px 20px',
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.25)',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#22C55E" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.732-.866-2.866-1.547-4.005-3.506-.302-.522.302-.485.864-1.617.099-.198.05-.371-.05-.519-.099-.149-.668-1.612-.917-2.21-.247-.594-.498-.514-.683-.524-.173-.01-.371-.012-.57-.012-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479s1.064 2.876 1.213 3.075c.149.198 2.064 3.156 5.005 4.297 2.94 1.14 2.94.76 3.469.71.528-.05 1.758-.718 2.006-1.413.247-.694.247-1.29.173-1.413-.074-.124-.273-.198-.57-.347z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.94.55 3.752 1.5 5.292L2.06 22l4.85-1.41C8.385 21.5 10.144 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.65 0-3.2-.46-4.516-1.255l-.323-.193-3.346.973.99-3.27-.21-.336A7.94 7.94 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#fff' }}>
                        WhatsApp
                      </div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(148,163,184,0.6)' }}>
                        {WHATSAPP_DISPLAY}
                      </div>
                    </div>
                  </a>

                  {/* Email link */}
                  <a
                    href={`mailto:${EMAIL}`}
                    id="contact-email-link"
                    aria-label={`Enviar email a ${EMAIL}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      borderRadius: '14px',
                      padding: '16px 20px',
                      background: 'rgba(30,107,255,0.08)',
                      border: '1px solid rgba(30,107,255,0.25)',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E6BFF" strokeWidth="1.6" aria-hidden="true">
                      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                      <path d="M3.5 6l8.5 6.5L20.5 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#fff' }}>
                        Email
                      </div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(148,163,184,0.6)' }}>
                        {EMAIL}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
