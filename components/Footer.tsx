'use client';

const containerStyle: React.CSSProperties = {
  maxWidth: '1024px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  paddingLeft: '24px',
  paddingRight: '24px',
};

interface FooterLink { label: string; href: string }
interface FooterColumn { title: string; links: FooterLink[] }

const columns: FooterColumn[] = [
  {
    title: 'Servicios',
    links: [
      { label: 'Inteligencia Artificial', href: '#services' },
      { label: 'Desarrollo de Software', href: '#services' },
      { label: 'Consultoría Tecnológica', href: '#services' },
      { label: 'Auditoría de Infraestructura', href: '#process' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Cómo trabajamos', href: '#process' },
      { label: 'Casos de éxito', href: '#testimonials' },
      { label: 'Equipo', href: '#' },
      { label: 'Carreras', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de privacidad', href: '#' },
      { label: 'Términos de uso', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
];

const socialLinks = [
  {
    id: 'footer-linkedin',
    label: 'Axon Code en LinkedIn',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: 'footer-twitter',
    label: 'Axon Code en X (Twitter)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'footer-github',
    label: 'Axon Code en GitHub',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{ background: '#080B10', position: 'relative', width: '100%' }}
    >
      {/* Top gradient border */}
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(30,107,255,0.5), rgba(0,180,216,0.3), transparent)',
        }}
      />

      <div style={{ ...containerStyle, paddingTop: '56px', paddingBottom: '56px' }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px', marginBottom: '48px' }}>

          {/* Brand column — spans 4 of 12 */}
          <div style={{ gridColumn: 'span 4' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="3" fill="#1E6BFF" />
                <circle cx="16" cy="5" r="2" fill="#00B4D8" />
                <circle cx="16" cy="27" r="2" fill="#00B4D8" />
                <circle cx="5" cy="16" r="2" fill="#00B4D8" />
                <circle cx="27" cy="16" r="2" fill="#00B4D8" />
                <circle cx="8" cy="8" r="1.5" fill="#1E6BFF" opacity="0.6" />
                <circle cx="24" cy="8" r="1.5" fill="#1E6BFF" opacity="0.6" />
                <circle cx="8" cy="24" r="1.5" fill="#1E6BFF" opacity="0.6" />
                <circle cx="24" cy="24" r="1.5" fill="#1E6BFF" opacity="0.6" />
                <line x1="16" y1="13" x2="16" y2="7" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
                <line x1="16" y1="19" x2="16" y2="25" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
                <line x1="13" y1="16" x2="7" y2="16" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
                <line x1="19" y1="16" x2="25" y2="16" stroke="#1E6BFF" strokeWidth="1" opacity="0.7" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff' }}>
                Axon Code
              </span>
            </div>

            {/* Tagline */}
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(148,163,184,0.65)', lineHeight: 1.7, maxWidth: '260px', marginBottom: '20px' }}>
              Innovación inteligente. Transformamos productos digitales con IA, ingeniería de software premium y consultoría estratégica.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              <a
                href="mailto:info@axoncode.com"
                id="footer-email"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(148,163,184,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.55)')}
              >
                info@axoncode.com
              </a>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(148,163,184,0.4)' }}>
                Madrid, España
              </span>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href="#"
                  id={s.id}
                  aria-label={s.label}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(148,163,184,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(30,107,255,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — each spans 2 of 12 */}
          {columns.map((col) => (
            <div key={col.title} style={{ gridColumn: 'span 2' }}>
              <h4 style={{
                fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '11px',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'rgba(148,163,184,0.4)', marginBottom: '16px',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(148,163,184,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.55)')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
          paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.3)' }}>
            © {currentYear} Axon Code S.L. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacidad', 'Términos', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.3)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
