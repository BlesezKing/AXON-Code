'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroCanvas from '@/components/HeroCanvas';
import Footer from '@/components/Footer';

/* ─── Inline style constants ─────────────────────────────────────── */
const container: React.CSSProperties = {
  maxWidth: '1024px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  paddingLeft: '24px',
  paddingRight: '24px',
  position: 'relative',
  zIndex: 10,
};

/* ─── Animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.7, delay, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
  }),
};

/* ─── TYPES ──────────────────────────────────────────────────────── */
interface Feature {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
}

/* ─── DATA ───────────────────────────────────────────────────────── */
const features: Feature[] = [
  {
    id: 'feat-ai',
    badge: 'IA & Machine Learning',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" fill="#1E6BFF" />
        <circle cx="12" cy="3" r="1.5" fill="#1E6BFF" opacity="0.6" />
        <circle cx="12" cy="21" r="1.5" fill="#1E6BFF" opacity="0.6" />
        <circle cx="3" cy="12" r="1.5" fill="#1E6BFF" opacity="0.6" />
        <circle cx="21" cy="12" r="1.5" fill="#1E6BFF" opacity="0.6" />
        <circle cx="5.3" cy="5.3" r="1.2" fill="#00B4D8" opacity="0.5" />
        <circle cx="18.7" cy="5.3" r="1.2" fill="#00B4D8" opacity="0.5" />
        <circle cx="5.3" cy="18.7" r="1.2" fill="#00B4D8" opacity="0.5" />
        <circle cx="18.7" cy="18.7" r="1.2" fill="#00B4D8" opacity="0.5" />
        <line x1="12" y1="9" x2="12" y2="4.5" stroke="#1E6BFF" strokeWidth="1" opacity="0.5" />
        <line x1="12" y1="15" x2="12" y2="19.5" stroke="#1E6BFF" strokeWidth="1" opacity="0.5" />
        <line x1="9" y1="12" x2="4.5" y2="12" stroke="#1E6BFF" strokeWidth="1" opacity="0.5" />
        <line x1="15" y1="12" x2="19.5" y2="12" stroke="#1E6BFF" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    title: 'Inteligencia Artificial',
    description: 'Modelos predictivos, NLP y automatización inteligente integrados directamente en tu stack productivo mediante APIs robustas.',
    stat: '+40%',
    statLabel: 'Eficiencia operativa',
  },
  {
    id: 'feat-software',
    badge: 'Engineering Premium',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#1E6BFF" strokeWidth="1.5" fill="none" />
        <line x1="2" y1="7" x2="22" y2="7" stroke="#1E6BFF" strokeWidth="0.8" opacity="0.4" />
        <circle cx="4.5" cy="5" r="0.8" fill="#00B4D8" />
        <circle cx="7" cy="5" r="0.8" fill="#1E6BFF" opacity="0.5" />
        <path d="M7 11l-2 2 2 2" stroke="#1E6BFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 11l2 2-2 2" stroke="#1E6BFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Desarrollo de Software',
    description: 'Arquitecturas cloud-native, microservicios y aplicaciones web y móviles construidas con código limpio, tests y CI/CD desde el día uno.',
    stat: '100%',
    statLabel: 'Cloud-native & escalable',
  },
  {
    id: 'feat-consulting',
    badge: 'Consultoría Estratégica',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#1E6BFF" strokeWidth="1.5" fill="none" opacity="0.35" />
        <circle cx="12" cy="12" r="5.5" stroke="#1E6BFF" strokeWidth="1.5" fill="none" opacity="0.6" />
        <circle cx="12" cy="12" r="2.5" fill="#1E6BFF" />
        <line x1="12" y1="3" x2="12" y2="6.5" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="17.5" x2="12" y2="21" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="12" x2="6.5" y2="12" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17.5" y1="12" x2="21" y2="12" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Consultoría Tecnológica',
    description: 'Auditorías de infraestructura, optimización de costes cloud y diseño de roadmaps con acompañamiento total del equipo.',
    stat: '24/7',
    statLabel: 'Soporte & monitorización',
  },
];

const processSteps: ProcessStep[] = [
  { number: '01', title: 'Auditoría Inicial', description: 'Escáner técnico completo de tu stack actual.', detail: 'Análisis en profundidad de dependencias, cuellos de botella y oportunidades de mejora.' },
  { number: '02', title: 'Arquitectura', description: 'Diseñamos la estructura ideal para tu producto.', detail: 'Roadmap priorizado, selección de tecnologías y estimación de plazos realista.' },
  { number: '03', title: 'Desarrollo', description: 'Sprints semanales con entregables medibles.', detail: 'Código limpio, code reviews, tests automatizados y despliegue continuo.' },
  { number: '04', title: 'Lanzamiento', description: 'Despliegue escalable con monitorización total.', detail: 'Alertas proactivas, dashboards de rendimiento y soporte post-lanzamiento.' },
];

const testimonials: Testimonial[] = [
  { id: 'test-1', quote: 'Axon Code transformó nuestra infraestructura legacy en una plataforma cloud-native en tiempo récord. El nivel de detalle técnico y la comunicación durante todo el proyecto fue excepcional.', name: 'Carlos Méndez', role: 'CTO', company: 'FinSolutions', initials: 'CM', color: '#1E6BFF' },
  { id: 'test-2', quote: 'Su equipo de IA diseñó un modelo predictivo que redujo nuestros costes operativos un 38% en los primeros tres meses. Resultados reales, no promesas vacías.', name: 'Ana Torres', role: 'Head of Operations', company: 'LogiFlow', initials: 'AT', color: '#00B4D8' },
  { id: 'test-3', quote: 'La consultoría inicial fue un punto de inflexión. Identificaron vulnerabilidades críticas que no habíamos visto y nos dieron un plan claro para solucionarlas.', name: 'Sergio Ramos', role: 'Product Director', company: 'RetailCore', initials: 'SR', color: '#7C3AED' },
  { id: 'test-4', quote: 'Desarrollaron nuestra app móvil con una arquitectura tan sólida que escalar de 1.000 a 200.000 usuarios activos no requirió ningún rediseño. Impresionante.', name: 'Marta Iglesias', role: 'CEO', company: 'UrbanApp', initials: 'MI', color: '#059669' },
  { id: 'test-5', quote: 'El soporte 24/7 no es un cliché en Axon Code. Tuvimos un incidente crítico a las 3am y el equipo respondió en minutos con una solución definitiva.', name: 'David Fuertes', role: 'DevOps Lead', company: 'CloudPay', initials: 'DF', color: '#DC2626' },
  { id: 'test-6', quote: 'La transparencia en el proceso fue lo que más valoramos. Siempre supimos en qué punto estábamos, qué se estaba haciendo y por qué. Volvería a trabajar con ellos sin duda.', name: 'Lucía Vega', role: 'COO', company: 'MedTech Labs', initials: 'LV', color: '#D97706' },
];

const stats: Stat[] = [
  { value: '99.9%', label: 'Uptime Garantizado' },
  { value: '+15M', label: 'Peticiones / Día' },
  { value: '100%', label: 'Casos de Éxito' },
  { value: '<48h', label: 'Tiempo de Respuesta' },
];

const processTabIds = ['tab-01', 'tab-02', 'tab-03', 'tab-04'];

/* ─── Section badge ───────────────────────────────────────────────── */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
      <span style={{ height: '1px', width: '32px', background: 'linear-gradient(to right, transparent, rgba(30,107,255,0.5))', display: 'block' }} aria-hidden="true" />
      <span style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif', background: 'linear-gradient(to right, #1E6BFF, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {children}
      </span>
      <span style={{ height: '1px', width: '32px', background: 'linear-gradient(to left, transparent, rgba(30,107,255,0.5))', display: 'block' }} aria-hidden="true" />
    </div>
  );
}

/* ─── Gradient headline ──────────────────────────────────────────── */
function GradientHeading({ children, id, size = '3rem' }: { children: React.ReactNode; id?: string; size?: string }) {
  return (
    <h2
      id={id}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.15,
        textAlign: 'center',
        background: 'linear-gradient(to right, #e2e8f0, #bfdbfe, #f8fafc, #93c5fd, #e2e8f0)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradientShift 6s linear infinite',
        marginBottom: '20px',
      }}
    >
      {children}
    </h2>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main style={{ background: '#080B10', color: '#fff', width: '100%', overflowX: 'clip' }}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <Navbar />
      <HeroCanvas />

      {/* ══════════════════════ FEATURES ══════════════════════════ */}
      <section
        id="services"
        aria-labelledby="services-heading"
        style={{ background: '#0D1117', padding: '112px 0', position: 'relative', overflow: 'hidden' }}
      >
        {/* Ambient glow */}
        <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: '700px', height: '350px', background: 'radial-gradient(ellipse, rgba(30,107,255,0.35) 0%, transparent 70%)', filter: 'blur(70px)', opacity: 0.25 }} />

        <div style={container}>
          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <SectionBadge>Servicios Core</SectionBadge>
            <GradientHeading id="services-heading" size="clamp(2rem, 4vw, 3rem)">¿Qué impulsamos?</GradientHeading>
            <p style={{ color: 'rgba(148,163,184,0.75)', fontFamily: 'DM Sans, sans-serif', fontSize: '18px', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              Tres pilares tecnológicos diseñados para llevar tu producto al siguiente nivel de rendimiento e inteligencia.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {features.map((feat, idx) => (
              <motion.div
                key={feat.id}
                id={feat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx * 0.12}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                style={{ borderRadius: '16px', padding: '1px', background: 'linear-gradient(135deg, rgba(30,107,255,0.3) 0%, rgba(255,255,255,0.04) 50%, rgba(0,180,216,0.15) 100%)' }}
              >
                <div style={{ borderRadius: '15px', padding: '36px 28px', background: 'linear-gradient(160deg, rgba(13,17,23,0.98) 0%, rgba(8,11,16,1) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', height: '100%' }}>
                  {/* Badge */}
                  <span style={{ borderRadius: '999px', padding: '4px 14px', fontSize: '12px', fontFamily: 'DM Sans, sans-serif', border: '1px solid rgba(30,107,255,0.3)', background: 'rgba(30,107,255,0.08)', color: '#93c5fd' }}>
                    {feat.badge}
                  </span>
                  {/* Icon */}
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', border: '1px solid rgba(30,107,255,0.2)', background: 'rgba(30,107,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {feat.icon}
                  </div>
                  {/* Title */}
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', margin: 0 }}>
                    {feat.title}
                  </h3>
                  {/* Description */}
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(148,163,184,0.75)', lineHeight: 1.75, flex: 1, margin: 0 }}>
                    {feat.description}
                  </p>
                  {/* Stat */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '26px', background: 'linear-gradient(to right, #1E6BFF, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {feat.stat}
                    </span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(148,163,184,0.5)' }}>
                      {feat.statLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════════════ */}
      <section id="stats" aria-label="Estadísticas de Axon Code" style={{ background: '#080B10', padding: '64px 0' }}>
        <div style={container}>
          <div style={{ borderRadius: '16px', padding: '1px', background: 'linear-gradient(to right, transparent, rgba(30,107,255,0.4), rgba(0,180,216,0.2), transparent)' }}>
            <div style={{ borderRadius: '15px', padding: '40px 24px', background: 'linear-gradient(135deg, rgba(13,17,23,0.94) 0%, rgba(8,11,16,0.97) 100%)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  id={`stat-${idx}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx * 0.1}
                  variants={fadeIn}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '16px 8px', borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 3vw, 3rem)', background: 'linear-gradient(to bottom, #1E6BFF, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px' }}>
                    {stat.value}
                  </span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(148,163,184,0.45)' }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PROCESS ════════════════════════════ */}
      <section id="process" aria-labelledby="process-heading" style={{ background: '#0D1117', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute', right: 0, bottom: 0, width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,180,216,0.45) 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.18 }} />

        <div style={container}>
          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionBadge>Metodología</SectionBadge>
            <GradientHeading id="process-heading" size="clamp(2rem, 4vw, 3rem)">Cómo trabajamos.</GradientHeading>
            <p style={{ color: 'rgba(148,163,184,0.75)', fontFamily: 'DM Sans, sans-serif', fontSize: '18px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Un proceso probado, transparente y orientado a resultados. Sabes exactamente qué pasa en cada fase.
            </p>
          </motion.div>

          {/* Tab selector */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} variants={fadeIn} style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div role="tablist" aria-label="Fases del proceso" style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '16px', padding: '6px', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {processSteps.map((step, idx) => (
                <button
                  key={step.number}
                  id={processTabIds[idx]}
                  role="tab"
                  aria-selected={activeStep === idx}
                  aria-controls={`tabpanel-${idx}`}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    borderRadius: '12px', padding: '8px 18px',
                    fontSize: '14px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    background: activeStep === idx ? 'linear-gradient(to bottom, rgba(30,107,255,0.25), rgba(30,107,255,0.1))' : 'transparent',
                    color: activeStep === idx ? '#93c5fd' : 'rgba(148,163,184,0.5)',
                    border: activeStep === idx ? '1px solid rgba(30,107,255,0.3)' : '1px solid transparent',
                  }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px', color: activeStep === idx ? '#1E6BFF' : 'rgba(148,163,184,0.3)' }}>
                    {step.number}
                  </span>
                  <span>{step.title}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab panel */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            id={`tabpanel-${activeStep}`}
            role="tabpanel"
            aria-labelledby={processTabIds[activeStep]}
          >
            <div style={{ borderRadius: '20px', padding: '1px', background: 'linear-gradient(135deg, rgba(30,107,255,0.4) 0%, rgba(255,255,255,0.04) 50%, rgba(0,180,216,0.2) 100%)' }}>
              <div style={{ borderRadius: '19px', padding: '64px 48px', background: 'linear-gradient(160deg, rgba(13,17,23,0.98) 0%, rgba(8,11,16,1) 100%)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '96px', lineHeight: 1, marginBottom: '16px', background: 'linear-gradient(to bottom, rgba(30,107,255,0.5), rgba(30,107,255,0.08))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {processSteps[activeStep].number}
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(148,163,184,0.4)', marginBottom: '12px' }}>
                  Fase {activeStep + 1} de 4
                </p>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#fff', marginBottom: '16px' }}>
                  {processSteps[activeStep].title}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px', maxWidth: '480px', margin: '0 auto 12px' }}>
                  {processSteps[activeStep].description}
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'rgba(148,163,184,0.65)', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto' }}>
                  {processSteps[activeStep].detail}
                </p>
                {/* Progress dots */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                  {processSteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      aria-label={`Ir a fase ${i + 1}`}
                      style={{ height: '6px', width: i === activeStep ? '32px' : '8px', borderRadius: '999px', transition: 'all 0.3s ease', background: i === activeStep ? '#1E6BFF' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section id="testimonials" aria-labelledby="testimonials-heading" style={{ background: '#080B10', padding: '112px 0' }}>
        <div style={container}>
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(100,116,139,0.2), transparent)', marginBottom: '64px' }} aria-hidden="true" />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <SectionBadge>Casos Reales</SectionBadge>
            <GradientHeading id="testimonials-heading" size="clamp(2rem, 4vw, 3rem)">Lo que dicen los equipos.</GradientHeading>
            <p style={{ color: 'rgba(148,163,184,0.72)', fontFamily: 'DM Sans, sans-serif', fontSize: '18px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Empresas que transformaron su tecnología con nosotros. Sin letra pequeña.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {testimonials.map((t, idx) => (
              <motion.article
                key={t.id}
                id={t.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx * 0.08}
                variants={fadeUp}
                aria-label={`Testimonio de ${t.name}`}
                style={{ borderRadius: '16px', padding: '1px', background: 'linear-gradient(135deg, rgba(30,107,255,0.2) 0%, rgba(255,255,255,0.03) 60%, rgba(30,107,255,0.12) 100%)' }}
              >
                <div style={{ borderRadius: '15px', padding: '28px', background: 'linear-gradient(135deg, rgba(13,17,23,0.97) 0%, rgba(8,11,16,0.99) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', height: '100%' }}>
                  <div style={{ fontSize: '48px', lineHeight: 1, color: t.color, opacity: 0.25, fontFamily: 'serif' }} aria-hidden="true">&ldquo;</div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(148,163,184,0.82)', lineHeight: 1.75, flex: 1 }}>{t.quote}</p>
                  <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)' }} aria-hidden="true" />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff' }} aria-hidden="true">
                      {t.initials}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#fff' }}>{t.name}</div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.45)' }}>
                        {t.role} — <span style={{ color: t.color, opacity: 0.85 }}>{t.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA ════════════════════════════════ */}
      <section id="cta" aria-labelledby="cta-heading" style={{ background: '#0D1117', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(30,107,255,0.22) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        </div>

        <div style={{ ...container, maxWidth: '760px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeIn}>
            <div style={{ borderRadius: '24px', padding: '1px', background: 'linear-gradient(135deg, rgba(30,107,255,0.55) 0%, rgba(0,180,216,0.2) 50%, rgba(30,107,255,0.35) 100%)' }}>
              <div style={{ borderRadius: '23px', padding: '64px 48px', background: 'linear-gradient(160deg, rgba(13,17,23,0.98) 0%, rgba(8,11,16,1) 100%)', textAlign: 'center' }}>
                <SectionBadge>Consultoría Gratuita</SectionBadge>
                <GradientHeading id="cta-heading" size="clamp(1.8rem, 3.5vw, 2.8rem)">
                  Lleva tu producto al siguiente nivel.
                </GradientHeading>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: 'rgba(148,163,184,0.72)', maxWidth: '440px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                  Hablemos de tu proyecto. Una sesión de consultoría técnica inicial gratuita — sin compromiso.
                </p>
                {/* Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                  <motion.button
                    id="cta-primary-btn"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Agendar consultoría técnica gratuita"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', padding: '14px 36px', fontSize: '16px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#fff', background: 'linear-gradient(to bottom, #2563EB, #1E6BFF)', boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 8px 32px rgba(30,107,255,0.35)', border: 'none', cursor: 'pointer' }}
                  >
                    Agendar Consultoría <span style={{ opacity: 0.6 }}>→</span>
                  </motion.button>
                  <motion.button
                    id="cta-secondary-btn"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Ver casos de éxito"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', padding: '14px 36px', fontSize: '16px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif', color: 'rgba(226,232,240,0.8)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                  >
                    Ver casos de éxito
                  </motion.button>
                </div>
                {/* Trust indicators */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '24px', marginTop: '36px' }}>
                  {['Sin compromiso', 'Respuesta en 24h', 'Equipo senior'].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', color: 'rgba(148,163,184,0.45)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="6.5" stroke="#1E6BFF" strokeWidth="1" opacity="0.5" />
                        <path d="M4 7l2.1 2.1L10 4.9" stroke="#1E6BFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
