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
import { Helmet } from "react-helmet";

<Helmet>
  <title></title>
  <meta
    name="description"
    content="Portfolio Rakha Fausta - Fullstack Developer & Cybersecurity Enthusiast."
  />
</Helmet>

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
  return (
    <BrowserRouter>
      <div className="relative bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 scanlines z-[9998]" />
        <div className="fixed inset-0 crt-vignette z-[9999]" />
        
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
      </div>
    </BrowserRouter>
  );
}