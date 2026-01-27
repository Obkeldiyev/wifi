import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Lottie from 'lottie-react';
import Scene from './components/Scene';
import './index.css';

const TECH_LOTTIE = "https://lottie.host/98696898-7264-4e8c-8438-2a0785d0d663/6z4H5b5q2Z.json";

function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <div className="lenis-container">{children}</div>;
}

const SectionHeading = ({ children, number }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>
    <span style={{ fontSize: '1rem', marginRight: '20px', fontFamily: 'monospace', opacity: 0.5 }}>{number}</span>
    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, margin: 0 }}>{children}</h2>
  </div>
);

const StatItem = ({ label, value }) => (
  <div style={{ padding: '20px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
    <div style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '10px', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700 }}>{value}</div>
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <SmoothScroll>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 1000, transformOrigin: '0%' }}>
        <motion.div style={{ scaleX, background: '#fff', height: '100%' }} />
      </div>

      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '20px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, mixBlendMode: 'difference' }}>
        <img src="/netland-logo-oq.png" alt="Netland Logo" style={{ height: 'clamp(50px, 8vw, 80px)', objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 'clamp(15px, 4vw, 40px)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <span className="hide-mobile" style={{ display: 'inline-block' }}>Coverage</span>
          <span>Access</span>
          <span>Business</span>
        </div>
      </nav>

      <Scene />

      <div className="grid-bg" />

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 5vw 100px 5vw', position: 'relative' }}>
        <div style={{ width: '100%' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              style={{ fontSize: 'clamp(3.5rem, 13vw, 14rem)', lineHeight: 0.85, letterSpacing: '-0.04em', display: 'flex', flexDirection: 'column' }}
            >
              <span>GLOBAL</span>
              <span className="outline-text" style={{ marginLeft: '0.1em', opacity: 1, color: 'transparent', WebkitTextStroke: '1px white' }}>CONNECT</span>
            </motion.h1>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '60px', gap: '30px' }}>
            <div style={{ maxWidth: '400px', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.4, opacity: 0.8 }}>
              Национальный оператор беспроводного доступа.
              Инфраструктура нового поколения для цифрового общества Узбекистана.
            </div>
            <button className="btn-main">
              <span>Подключиться</span>
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: 'white', color: 'black', padding: '20px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ display: 'inline-flex', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', gap: '50px' }}
        >
          TASHKENT • SAMARKAND • BUKHARA • KHIVA • FERGANA • ANDIJAN • NUKUS • TASHKENT • SAMARKAND • BUKHARA •
        </motion.div>
      </div>

      {/* INFO / MANIFESTO */}
      <section className="section-wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
          <div>
            <SectionHeading number="01">ECOSYSTEM</SectionHeading>
            <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.2, fontWeight: 300 }}>
              Мы создаем бесшовную цифровую среду. Это не просто интернет. Это доступ к информации, образованию и развлечениям в любой точке города. Без паролей. Без ограничений.
            </p>
          </div>
          <div style={{ paddingTop: 'clamp(20px, 5vw, 100px)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.7 }}>
              FreeWiFi.uz — это крупнейшая сеть публичного доступа в Центральной Азии. Мы используем технологию Mesh для создания сплошного покрытия в парках, аэропортах, вокзалах, торговых центрах и на центральных улицах. Авторизация по SMS занимает 5 секунд.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <StatItem label="Active Users" value="2.5M+" />
              <StatItem label="Access Points" value="5,000+" />
              <StatItem label="Avg Speed" value="100 Mbps" />
              <StatItem label="Cities" value="12" />
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL / LOTTIE */}
      <section style={{ height: '80vh', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: '90%', maxWidth: '800px', height: '100%', position: 'relative' }}>
          <iframe
            src="https://lottie.host/embed/98696898-7264-4e8c-8438-2a0785d0d663/6z4H5b5q2Z.json"
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              filter: 'grayscale(100%) contrast(1.2)'
            }}
            title="Tech Animation"
          ></iframe>
        </div>
        <div style={{ position: 'absolute', bottom: '30px', left: '5vw' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>SYSTEM STATUS</div>
          <div style={{ color: '#00ff00', fontSize: '1.2rem', fontFamily: 'monospace' }}>● OPERATIONAL</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-wrapper">
        <SectionHeading number="02">ARCHITECTURE</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { step: '01', title: 'CONNECT', desc: 'Выберите сеть FreeWiFi.uz в настройках вашего устройства.' },
            { step: '02', title: 'AUTHORIZE', desc: 'Введите номер телефона для получения SMS с кодом доступа.' },
            { step: '03', title: 'ACCESS', desc: 'Полный доступ к сети на высокой скорости на 24 часа.' },
            { step: '04', title: 'ROAMING', desc: 'Автоматическое переключение между точками по всему городу.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 4vw, 40px)' }}>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, opacity: 0.2 }}>{item.step}</div>
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700 }}>{item.title}</div>
              </div>
              <div style={{ maxWidth: '400px', opacity: 0.7, fontSize: '0.95rem' }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BUSINESS */}
      <section className="section-wrapper" style={{ background: '#fff', color: '#000' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.04em' }}>FOR<br />BUSINESS</h2>
          </div>
          <div>
            <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginBottom: '40px' }}>
              Превратите WiFi в мощный маркетинговый инструмент. Показывайте рекламу, собирайте аналитику посещаемости и взаимодействуйте с клиентами.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ border: '1px solid black', padding: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>TARGETING</h3>
                <p>Настройка рекламы по геолокации, времени и типу устройства.</p>
              </div>
              <div style={{ border: '1px solid black', padding: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>ANALYTICS</h3>
                <p>Полный отчет о конверсии, просмотрах и поведении пользователей.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-wrapper">
        <SectionHeading number="03">ACCESS PLANS</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', alignItems: 'start' }}>
          {[
            { name: 'GUEST', price: 'FREE', features: ['1 hr/day limit', 'Ad-supported', 'Standard Speed', 'Shared IP'] },
            { name: 'RESIDENT', price: '50K', period: '/mon', features: ['Unlimited Access', 'Ad-Block', 'High Priority', 'Multi-device (3)', 'Premium Support'], active: true },
            { name: 'CORPORATE', price: 'CUSTOM', features: ['Dedicated Bandwidth', 'Static IP', 'SLA 99.9%', 'Account Manager', 'API Access'] }
          ].map((plan, i) => (
            <div key={i} className="glass-card" style={{ padding: '50px 30px', position: 'relative', border: plan.active ? '1px solid white' : '1px solid rgba(255,255,255,0.1)' }}>
              {plan.active && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '5px', textAlign: 'center', background: 'white', color: 'black', fontSize: '0.8rem', fontWeight: 700 }}>RECOMMENDED</div>}
              <div style={{ fontSize: '1.2rem', opacity: 0.6, marginBottom: '20px' }}>{plan.name}</div>
              <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '40px' }}>
                {plan.price}<span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.5 }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0' }}>
                {plan.features.map((f, fi) => (
                  <li key={fi} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }}>{f}</li>
                ))}
              </ul>
              <button className="btn-main" style={{ width: '100%', background: plan.active ? 'white' : 'transparent', color: plan.active ? 'black' : 'white', border: '1px solid white' }}>
                <span>SELECT DOCTRINE</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '100px 5vw', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ fontSize: '12vw', fontWeight: 900, opacity: 0.1, lineHeight: 0.8, wordBreak: 'break-all' }}>Netland Group</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            © 2026 UZINFRASTRUCTURE<br />
            Tashkent, Amir Temur Avenue, 108
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>INSTAGRAM</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>TELEGRAM</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>LINKEDIN</a>
          </div>
        </div>
      </footer>
    </SmoothScroll>
  );
}

export default App;
