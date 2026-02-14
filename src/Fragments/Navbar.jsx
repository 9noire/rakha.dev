import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (e, section) => {
    e.preventDefault();
    setIsOpen(false);

    const sectionId = section.toLowerCase();
    
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } 
    else {
      navigate('/', { 
        state: { scrollTo: sectionId },
        replace: true 
      });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo && location.pathname === '/') {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      
      navigate('/', { 
        state: {}, 
        replace: true 
      });
    }
  }, [location, navigate]);

  const isActive = (section) => {
    if (location.pathname !== '/') return false;
    return false;
  };

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      scrolled 
          ? 'bg-[var(--color-bg)]/80 backdrop-blur-md shadow-lg shadow-[var(--color-accent)]/5' 
          : 'bg-[var(--color-bg)]/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 
          onClick={() => navigate('/')}
          className="text-xl font-bold relative group cursor-pointer"
        >
          <span className="relative z-10 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text">
            rakha.dev
          </span>
          <span className="absolute -inset-1 bg-[var(--color-accent)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </h1>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
          {['Home', 'About', 'Skills', 'Project', 'Certificates', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={location.pathname === '/' ? `#${item.toLowerCase()}` : '/'}
                onClick={(e) => handleNavigation(e, item)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 group
                  ${isActive(item) 
                    ? 'text-[var(--color-accent)]' 
                    : 'text-white/80 hover:text-[var(--color-accent)]'
                  }`}
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-[var(--color-accent)]/0 group-hover:bg-[var(--color-accent)]/10 rounded-lg backdrop-blur-none group-hover:backdrop-blur-[2px] transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <button 
          onClick={toggleMenu} 
          className="md:hidden focus:outline-none relative p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/30 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[var(--color-bg)]/80 backdrop-blur-md border-t border-[var(--color-accent)]/20 shadow-inner">
          <ul className="flex flex-col text-center py-2">
            {['Home', 'About', 'Skills', 'Project', 'Certificates', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={location.pathname === '/' ? `#${item.toLowerCase()}` : '/'}
                  onClick={(e) => {
                    handleNavigation(e, item);
                    setIsOpen(false);
                  }}
                  className="block px-4 py-3 text-white/70 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
    </nav>
  );
}