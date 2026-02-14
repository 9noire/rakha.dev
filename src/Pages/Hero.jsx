import Button from "../Elements/Button";
import { Head } from "../Elements/Head";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go"

export default function Hero() {
  const handleScroll = () => {
    const section = document.querySelector("#project");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConnect = () => {
    const section = document.querySelector("#contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-10 relative"
    >
      {/* Social Media Icons - Posisi berbeda untuk mobile dan desktop */}

      {/* Desktop: Vertical Left Side (muncul di layar md ke atas) */}
      <div className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
        {/* Garis vertikal dekoratif */}
        <div className="w-px h-12 bg-[var(--color-accent)]/30 mx-auto mb-2"></div>

        <a
          href="https://github.com/rakhaafd"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group"
          aria-label="GitHub"
        >
          <FaGithub size={20} className="text-gray-400 group-hover:text-[var(--color-accent)]" />
        </a>

        <a
          href="https://www.linkedin.com/in/rakhafausta"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} className="text-gray-400 group-hover:text-[var(--color-accent)]" />
        </a>

        <a
          href="https://www.instagram.com/rakhaafd/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group"
          aria-label="Instagram"
        >
          <FaInstagram size={20} className="text-gray-400 group-hover:text-[var(--color-accent)]" />
        </a>

        {/* Garis vertikal dekoratif bawah */}
        <div className="w-px h-12 bg-[var(--color-accent)]/30 mx-auto mt-2"></div>
      </div>

      {/* ======= MAIN CONTENT ======= */}
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-4xl mx-auto md:mt-0 mt-8">
        {/* ^^^ Tambahkan mt-8 untuk mobile, dan md:mt-0 untuk desktop */}
        
        <h4 className="text-xl md:text-2xl font-medium text-[var(--color-text)]">
          Hello World!{' '}
          <span
            className="inline-block animate-wave"
            style={{ transformOrigin: '70% 70%' }}
          >
            👋
          </span>
        </h4>
        <style jsx>{`
  @keyframes wave {
    0% { transform: rotate(0deg); }
    10% { transform: rotate(14deg); }
    20% { transform: rotate(-8deg); }
    30% { transform: rotate(14deg); }
    40% { transform: rotate(-4deg); }
    50% { transform: rotate(10deg); }
    60% { transform: rotate(0deg); }
    100% { transform: rotate(0deg); }
  }
  
  .animate-wave {
    animation: wave 2.5s ease-in-out infinite;
  }
`}</style>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[var(--color-accent)]">
          <Head />
        </h1>

        <p className="text-[var(--color-subtext)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          I'm a <span className="text-[var(--color-accent)] font-medium">Software Engineer</span> who builds
          modern and efficient digital solutions, with a strong interest in
          <span className="text-[var(--color-accent)] font-medium"> Cybersecurity</span> to ensure every system
          I create is both powerful and secure.
        </p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-6 w-full sm:w-auto px-4">
          <Button
            text="See My Works"
            onClick={handleScroll}
            className="w-full sm:w-auto px-6 py-3 text-base"
          />
          <Button
            variant="outline"
            icon={<GoArrowUpRight className="text-lg" />}
            text="Get in Touch"
            onClick={handleConnect}
            className="w-full sm:w-auto px-6 py-3 text-base"
          />
        </div>

        {/* Mobile: Social Icons Horizontal (muncul di layar md ke bawah) */}
        <div className="flex md:hidden items-center justify-center gap-4 pt-8">
          {/* Garis horizontal dekoratif kiri */}
          <div className="w-12 h-px bg-[var(--color-accent)]/30"></div>

          <a
            href="https://github.com/rakhaafd"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group"
            aria-label="GitHub"
          >
            <FaGithub size={18} className="text-gray-400 group-hover:text-[var(--color-accent)]" />
          </a>

          <a
            href="https://www.linkedin.com/in/rakhafausta"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} className="text-gray-400 group-hover:text-[var(--color-accent)]" />
          </a>

          <a
            href="https://www.instagram.com/rakhaafd"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group"
            aria-label="Instagram"
          >
            <FaInstagram size={18} className="text-gray-400 group-hover:text-[var(--color-accent)]" />
          </a>

          {/* Garis horizontal dekoratif kanan */}
          <div className="w-12 h-px bg-[var(--color-accent)]/30"></div>
        </div>
      </div>
    </section>
  );
}