import Navbar from "./Fragments/Navbar";
import Hero from "./Hero";
import About from "./About";
import Tech from "./Tech";
import Project from "./Project";
import Certificate from "./Certificate";
import Contact from "./Contact";
import Footer from "./Fragments/Footer";

export default function App() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen overflow-x-hidden">
      <Navbar />

      <Hero />

      <About />

      <Tech />

      <Project />

      <Certificate />

      <Contact />

      <Footer />
    </div>
  );
}
