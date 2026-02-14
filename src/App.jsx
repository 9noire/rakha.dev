import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Fragments/Navbar";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import Tech from "./Pages/Tech";
import Project from "./Pages/Project";
import MoreProject from "./Pages/More/Projects"; 
import Certificate from "./Pages/Certificate";
import Contact from "./Pages/Contact";
import Footer from "./Fragments/Footer";
import ProjectDetail from "./Pages/Details/ProjectDetail";
import MoreCertificates from "./Pages/More/Certificates";
import CertificateDetail from "./Pages/Details/CertificateDetail";

function PageLayout({ children, showFooter = true }) {
  return (
    <>
      <Navbar />
      {children}
      {showFooter && <Footer />}
    </>
  );
}

function MainPage() {
  return (
    <>
      <Hero />
      <About />
      <Tech />
      <Project />
      <Certificate />
      <Contact />
    </>
  );
}

export default function App() {
  const scanLines = useMemo(() => {
    return [...Array(4)].map((_, i) => {
      const isHorizontal = Math.random() > 0.5;

      return {
        id: i,
        isHorizontal,
        duration: 6 + Math.random() * 4, // slow
        delay: Math.random() * 4,
        opacity: 0.25 + Math.random() * 0.1, // soft
        position: Math.random() * 100,
      };
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="relative bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--color-bg)]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,255,155,0.02)_1px,transparent_1.5px),linear-gradient(to_right,rgba(232,255,155,0.02)_1px,transparent_1.5px)] bg-[size:80px_80px]" />

          <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[var(--color-accent)] rounded-full mix-blend-soft-light blur-[140px] opacity-[0.02]" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[var(--color-accent-muted)] rounded-full mix-blend-soft-light blur-[140px] opacity-[0.015]" />

          <div className="absolute inset-0 pointer-events-none">
            {scanLines.map((line) => (
              <div
                key={line.id}
                className={`absolute ${
                  line.isHorizontal ? "w-full h-[1px]" : "h-full w-[1px]"
                } bg-gradient-to-${
                  line.isHorizontal ? "r" : "b"
                } from-transparent via-[var(--color-accent)] to-transparent`}
                style={{
                  top: line.isHorizontal ? `${line.position}%` : 0,
                  left: line.isHorizontal ? 0 : `${line.position}%`,
                  animation: `${
                    line.isHorizontal ? "scanHorizontal" : "scanVertical"
                  } ${line.duration}s ease-in-out infinite alternate`,
                  animationDelay: `${line.delay}s`,
                  opacity: line.opacity,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <Routes>
            <Route 
              path="/" 
              element={
                <PageLayout showFooter={true}>
                  <MainPage />
                </PageLayout>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <PageLayout showFooter={true}>
                  <MoreProject />
                </PageLayout>
              } 
            />
            <Route 
              path="/certificates" 
              element={
                <PageLayout showFooter={true}>
                  <MoreCertificates />
                </PageLayout>
              } 
            />
            <Route 
              path="/projects/:id" 
              element={
                <PageLayout showFooter={false}>
                  <ProjectDetail />
                </PageLayout>
              } 
            />
            <Route 
              path="/certificates/:id" 
              element={
                <PageLayout showFooter={false}>
                  <CertificateDetail />
                </PageLayout>
              } 
            />
          </Routes>
        </div>

        <style jsx>{`
          @keyframes scanHorizontal {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }

          @keyframes scanVertical {
            0% { transform: translateY(-120%); }
            100% { transform: translateY(120%); }
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}