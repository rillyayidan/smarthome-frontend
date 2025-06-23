import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Estimasi", path: "/predict" },
    { name: "Eksplorasi", path: "/explore" },
    { name: "Tentang", path: "/about" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg text-gray-800 py-2' 
        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                : 'bg-white/25 backdrop-blur-sm shadow-lg'
            } group-hover:scale-110 group-hover:rotate-6`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className={`text-xl font-bold transition-all duration-300 ${
              scrolled ? 'text-gray-800' : 'text-white'
            }`}
            style={{
              textShadow: !scrolled ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
              color: !scrolled ? '#ffffff' : undefined
            }}
            >
              <span className={`${scrolled ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' : 'text-white font-bold'}`}>
                Smart
              </span>
              <span className={scrolled ? 'text-gray-800' : 'text-white font-bold'}>
                HomeValuator
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? scrolled
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-white/40 backdrop-blur-sm text-white shadow-xl border border-white/40'
                    : scrolled
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      : 'text-white hover:text-white hover:bg-white/25 hover:shadow-lg'
                } group`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  textShadow: !scrolled ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
                  color: !scrolled ? '#ffffff' : undefined
                }}
              >
                <span className="relative z-10 font-semibold">{item.name}</span>
                {location.pathname === item.path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse"></div>
                )}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
              scrolled 
                ? 'text-gray-800 bg-gray-100 hover:bg-gray-200' 
                : 'text-white bg-white/25 hover:bg-white/35 shadow-lg'
            } ${isOpen ? 'rotate-90' : ''}`}
            style={{
              textShadow: !scrolled ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
              color: !scrolled ? '#ffffff' : undefined
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className={`rounded-2xl backdrop-blur-md border ${
            scrolled 
              ? 'bg-white/90 border-gray-200 shadow-xl' 
              : 'bg-white/25 border-white/40 shadow-2xl'
          } p-4 space-y-2`}>
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? scrolled
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-white/40 text-white shadow-lg border border-white/40'
                    : scrolled
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      : 'text-white hover:text-white hover:bg-white/25'
                } group`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isOpen ? 'slideInFromTop 0.3s ease-out forwards' : '',
                  textShadow: !scrolled ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
                  color: !scrolled ? '#ffffff' : undefined
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-white shadow-sm'
                      : scrolled
                        ? 'bg-blue-500 group-hover:bg-blue-600'
                        : 'bg-white/70 group-hover:bg-white'
                  }`}></div>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      {!scrolled && (
        <>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute -top-1/4 -right-1/4 w-64 h-64 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}