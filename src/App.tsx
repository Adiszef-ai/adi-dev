import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider } from './contexts/SidebarContext';
import Sidebar from './components/Sidebar';
import ScrollProgress from './components/ScrollProgress';
import ParticlesBackground from './components/ParticlesBackground';
import SlideNav from './components/SlideNav';
import ThemeToggleFloating from './components/ThemeToggleFloating';
import EasterEgg from './components/EasterEgg';
import Hero from './sections/Hero';
import About from './sections/About';
import Timeline from './sections/Timeline';
import Skills from './sections/Skills';
import TechRadar from './sections/TechRadar';
import Projects from './sections/Projects';
import Analyses from './sections/Analyses';
import Agents from './sections/Agents';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SidebarProvider>
          <ScrollProgress />
          <EasterEgg />
          <SlideNav />
          <ThemeToggleFloating />

          {/* Ambient aura background — 3 blobs subtelnie się mieniące */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full aura-bg-aether opacity-[0.12] blur-[120px] blob-bg" />
            <div
              className="absolute top-[35%] -right-[20%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full aura-bg-vital opacity-[0.10] blur-[140px] blob-bg"
              style={{ animationDelay: '-4s' }}
            />
            <div
              className="absolute -bottom-[25%] left-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full aura-bg-flow opacity-[0.08] blur-[100px] blob-bg"
              style={{ animationDelay: '-8s' }}
            />
          </div>

          <ParticlesBackground />
          <Sidebar />
          <main className="main">
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Timeline />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <TechRadar />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <Analyses />
            <div className="section-divider" />
            <Agents />
            <div className="section-divider" />
            <Certifications />
            <div className="section-divider" />
            <Contact />
            <Footer />
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
