import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [kineticVisible, setKineticVisible] = useState(false);
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const kineticRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(currentScrollY / documentHeight, 1);
      
      setScrollY(currentScrollY);
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for kinetic typography
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === kineticRef.current && entry.isIntersecting) {
            setKineticVisible(true);
            // Once triggered, we don't need to observe anymore
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before the section is fully visible
      }
    );

    if (kineticRef.current) {
      observer.observe(kineticRef.current);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (kineticRef.current) {
        observer.unobserve(kineticRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/20 overflow-hidden">
      
      {/* Professional Parallax Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" ref={parallaxRef}>
        
        {/* Layered Parallax Elements */}
        <div className="parallax-layer-1" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-pink-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"
            style={{
              left: mousePosition.x * 0.02 - 200,
              top: mousePosition.y * 0.02 - 200,
              transition: 'all 0.3s ease-out'
            }}
          />
        </div>

        <div className="parallax-layer-2" style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollProgress * 360}deg)` }}>
          <div className="absolute -right-32 -top-32 w-80 h-80 bg-gradient-to-l from-pink-300/30 to-rose-300/30 rounded-full blur-2xl animate-bounce-slow" />
        </div>

        <div className="parallax-layer-3" style={{ transform: `translateY(${scrollY * -0.2}px)` }}>
          <div className="absolute -left-32 bottom-32 w-64 h-64 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-2xl animate-pulse-slow" />
        </div>
        
        {/* Floating Panda Elements */}
        <div 
          className="absolute top-1/4 right-1/4 w-16 h-16 opacity-20 floating-element"
          style={{ transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollProgress * 0.2})` }}
        >
          <div className="w-full h-full bg-gray-800 rounded-full relative">
            <div className="absolute top-2 left-3 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-2 right-3 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-1 left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="absolute top-1 right-1 w-3 h-3 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        <div 
          className="absolute top-1/3 left-1/4 w-12 h-12 opacity-15 floating-element"
          style={{ 
            transform: `translateY(${scrollY * -0.3}px) rotate(${scrollProgress * 180}deg)`,
            animationDelay: '1s' 
          }}
        >
          <div className="w-full h-full bg-pink-400 rounded-full paw-print"></div>
        </div>

        <div 
          className="absolute bottom-1/4 right-1/3 w-8 h-8 opacity-25 floating-element"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px) scale(${1 - scrollProgress * 0.3})`,
            animationDelay: '2s' 
          }}
        >
          <div className="w-full h-full bg-rose-400 rounded-full heart-shape"></div>
        </div>

        {/* Parallax Panda Hero */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{ 
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.6}px) scale(${1 + scrollProgress * 0.5})`,
            filter: `hue-rotate(${scrollProgress * 60}deg)`
          }}
        >
          <div className="w-64 h-64 relative parallax-panda">
            {/* Panda Body */}
            <div className="absolute inset-0 bg-white rounded-full shadow-2xl"></div>
            
            {/* Panda Ears */}
            <div className="absolute -top-8 left-12 w-16 h-16 bg-gray-800 rounded-full"></div>
            <div className="absolute -top-8 right-12 w-16 h-16 bg-gray-800 rounded-full"></div>
            
            {/* Panda Eyes */}
            <div className="absolute top-16 left-16 w-12 h-16 bg-gray-800 rounded-full transform rotate-12"></div>
            <div className="absolute top-16 right-16 w-12 h-16 bg-gray-800 rounded-full transform -rotate-12"></div>
            
            {/* Panda Eye Whites */}
            <div className="absolute top-20 left-18 w-6 h-6 bg-white rounded-full"></div>
            <div className="absolute top-20 right-18 w-6 h-6 bg-white rounded-full"></div>
            
            {/* Panda Nose */}
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gray-800 rounded-full"></div>
            
            {/* Panda Arms */}
            <div className="absolute top-32 -left-8 w-16 h-20 bg-gray-800 rounded-full transform rotate-45"></div>
            <div className="absolute top-32 -right-8 w-16 h-20 bg-gray-800 rounded-full transform -rotate-45"></div>
          </div>
        </div>

        {/* Floating Hearts with Parallax */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-float-up"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
              transform: `translateY(${scrollY * (0.2 + i * 0.1)}px)`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${1 + (i % 3) * 0.5}rem`
            }}
          >
            💕
          </div>
        ))}

        {/* Floating Paw Prints with Parallax */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-15 paw-trail"
            style={{
              right: `${5 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              transform: `translateY(${scrollY * (0.3 + i * 0.05)}px) rotate(${scrollProgress * 360 + i * 60}deg)`,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${0.8 + (i % 2) * 0.4}rem`
            }}
          >
            🐾
          </div>
        ))}
      </div>

      {/* HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center px-6 lg:px-8 pt-20 pb-16"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            
            {/* Main Heading with Advanced Animations */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                <span className="inline-block animate-fade-in-up animation-delay-100 hover:scale-105 transition-transform duration-300 cursor-default">
                  Unwavering
                </span>{' '}
                <span className="inline-block bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent animate-fade-in-up animation-delay-200 gradient-text-animated hover:scale-105 transition-transform duration-300 cursor-default">
                  Pet Care
                </span>
              </h1>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mt-1 leading-tight">
                <span className="inline-block animate-fade-in-up animation-delay-300 hover:scale-105 transition-transform duration-300 cursor-default">
                  For Your
                </span>{' '}
                <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in-up animation-delay-400 gradient-text-animated hover:scale-105 transition-transform duration-300 cursor-default">
                  Furry Friend
                </span>
              </h2>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 mt-1 animate-fade-in-up animation-delay-500 hover:scale-105 transition-transform duration-300 cursor-default">
                Everyday, All Day!
              </h3>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <Link
                to="/pets"
                className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl morph-button"
              >
                <span className="relative z-10 transition-all duration-300 group-hover:text-white">Browse Pets</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500 transform scale-0" />
              </Link>
              
              <Link to="/shelters" className="group flex items-center gap-3 px-6 py-4 text-gray-700 font-semibold text-lg hover:text-pink-600 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-pink-600 group-hover:rotate-12">
                  <svg className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="group-hover:text-shimmer">Check Shelters</span>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 scroll-indicator">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center font-medium">Scroll</p>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING PET CARDS SECTION */}
      <section 
        className="relative py-16 px-6 lg:px-8 -mt-20"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="max-w-6xl mx-auto">
          
          {/* Section Divider */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent w-full max-w-xs"></div>
            <div className="mx-6 text-pink-500 text-2xl">🐾</div>
            <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent w-full max-w-xs"></div>
          </div>
          
          {/* Pet Cards with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Cat Card */}
            <div className={`transform transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transform rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl" />
                <div className="relative bg-teal-400 rounded-full p-4 transform group-hover:scale-105 transition-all duration-500 hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=face" 
                    alt="Stylish Cat" 
                    className="w-full h-32 object-cover rounded-full group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Dog Card */}
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl" />
                <div className="relative bg-pink-400 rounded-full p-4 transform group-hover:scale-105 transition-all duration-500 hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face" 
                    alt="Happy Dog" 
                    className="w-full h-32 object-cover rounded-full group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Another Cat Card */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transform rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-lg group-hover:shadow-2xl" />
                <div className="relative bg-purple-400 rounded-full p-4 transform group-hover:scale-105 transition-all duration-500 hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop&crop=face" 
                    alt="Cute Kitten" 
                    className="w-full h-32 object-cover rounded-full group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🚚', title: 'One day delivery. Order before 6:00 PM', color: 'from-teal-100 to-teal-200', textColor: 'text-teal-700' },
              { icon: '💕', title: 'Live for 5-10 kids. MAD Happiness Guarantee', color: 'from-pink-100 to-pink-200', textColor: 'text-pink-700' },
              { icon: '📞', title: 'Call us at 08:00 AM to 10:00 PM', color: 'from-yellow-100 to-yellow-200', textColor: 'text-yellow-700' },
              { icon: '💬', title: 'Message us, respond same day', color: 'from-purple-100 to-purple-200', textColor: 'text-purple-700' }
            ].map((service, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 delay-${(index + 1) * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              >
                <div className={`bg-gradient-to-br ${service.color} rounded-xl p-4 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105`}>
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <p className={`font-semibold ${service.textColor} text-sm leading-relaxed`}>{service.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: '1000+', label: 'Happy Pets', icon: '🐕' },
              { number: '500+', label: 'Loving Families', icon: '👨‍👩‍👧‍👦' },
              { number: '50+', label: 'Partner Shelters', icon: '🏠' },
              { number: '24/7', label: 'Support Available', icon: '💬' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/80 ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ 
                  animationDelay: `${(index + 1) * 0.1}s`,
                  transform: `translateY(${scrollY * (0.02 + index * 0.01)}px)`
                }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Professional Parallax Showcase Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 p-12 mb-16 parallax-gradient">
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Meet Our Adorable Friends
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                  Every pet has a unique story and personality. Discover the joy of companionship with our loving animals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    name: 'Panda', 
                    type: 'Playful & Gentle', 
                    description: 'Loves cuddles and bamboo treats',
                    color: 'from-gray-100 to-gray-200',
                    emoji: '🐼'
                  },
                  { 
                    name: 'Whiskers', 
                    type: 'Curious Cat', 
                    description: 'Enjoys sunny windowsills',
                    color: 'from-orange-100 to-orange-200',
                    emoji: '🐱'
                  },
                  { 
                    name: 'Buddy', 
                    type: 'Loyal Dog', 
                    description: 'Perfect walking companion',
                    color: 'from-amber-100 to-amber-200',
                    emoji: '🐕'
                  }
                ].map((pet, index) => (
                  <div 
                    key={index}
                    className={`relative bg-gradient-to-br ${pet.color} rounded-xl p-6 transform transition-all duration-500 hover:scale-105 parallax-interactive floating-depth`}
                    style={{ 
                      transform: `translateY(${scrollY * (0.03 + index * 0.01)}px) scale(${1 + scrollProgress * 0.05})`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3 animate-bounce-gentle">{pet.emoji}</div>
                      <h4 className="font-bold text-gray-900 mb-1">{pet.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{pet.type}</p>
                      <p className="text-xs text-gray-500">{pet.description}</p>
                    </div>
                    
                    {/* Floating hearts around each pet */}
                    <div className="absolute -top-2 -right-2 text-pink-400 text-sm animate-float-up opacity-60">💕</div>
                    <div className="absolute -bottom-1 -left-1 text-purple-400 text-xs animate-float-up opacity-40" style={{ animationDelay: '1s' }}>✨</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Parallax Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute top-4 right-4 w-16 h-16 opacity-10 parallax-scroll-slow"
                style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollProgress * 180}deg)` }}
              >
                <div className="w-full h-full bg-pink-300 rounded-full"></div>
              </div>
              <div 
                className="absolute bottom-4 left-4 w-12 h-12 opacity-15 parallax-scroll-fast"
                style={{ transform: `translateY(${scrollY * -0.08}px) rotate(${scrollProgress * -120}deg)` }}
              >
                <div className="w-full h-full bg-purple-300 rounded-full"></div>
              </div>
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-5"
                style={{ transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.3}) rotate(${scrollProgress * 360}deg)` }}
              >
                <div className="w-full h-full bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SHOWCASE SECTION */}
      <section className="relative py-16 px-6 lg:px-8 bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header with Kinetic Typography */}
          <div 
            ref={kineticRef}
            className="text-center mb-16" 
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 overflow-hidden">
              <span className={`inline-block ${kineticVisible ? 'kinetic-word kinetic-delay-1' : 'kinetic-word-hidden'}`}>Why</span>
              <span className={`inline-block mx-3 ${kineticVisible ? 'kinetic-word kinetic-delay-2' : 'kinetic-word-hidden'}`}>Choose</span>
              <span className={`inline-block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent ${kineticVisible ? 'kinetic-word kinetic-delay-3 kinetic-scale' : 'kinetic-word-hidden'}`}>Pet</span>
              <span className={`inline-block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mx-2 ${kineticVisible ? 'kinetic-word kinetic-delay-4 kinetic-bounce' : 'kinetic-word-hidden'}`}>Haven</span>
              <span className={`inline-block ${kineticVisible ? 'kinetic-word kinetic-delay-5 kinetic-rotate' : 'kinetic-word-hidden'}`}>?</span>
            </h2>
            <p className={`text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed ${kineticVisible ? 'kinetic-fade-up kinetic-delay-6' : 'kinetic-word-hidden'}`}>
              <span className={`inline-block ${kineticVisible ? 'kinetic-word-slide kinetic-delay-7' : 'kinetic-word-hidden'}`}>We're</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-8' : 'kinetic-word-hidden'}`}>more</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-9' : 'kinetic-word-hidden'}`}>than</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-10' : 'kinetic-word-hidden'}`}>just</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-11' : 'kinetic-word-hidden'}`}>a</span>
              <span className={`inline-block mx-1 text-pink-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-12' : 'kinetic-word-hidden'}`}>pet</span>
              <span className={`inline-block mx-1 text-pink-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-13' : 'kinetic-word-hidden'}`}>adoption</span>
              <span className={`inline-block mx-1 text-pink-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-14' : 'kinetic-word-hidden'}`}>platform.</span>
              <br className="hidden md:block" />
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-15' : 'kinetic-word-hidden'}`}>We're</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-16' : 'kinetic-word-hidden'}`}>your</span>
              <span className={`inline-block mx-1 text-purple-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-17' : 'kinetic-word-hidden'}`}>partners</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-18' : 'kinetic-word-hidden'}`}>in</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-19' : 'kinetic-word-hidden'}`}>creating</span>
              <span className={`inline-block mx-1 text-purple-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-20' : 'kinetic-word-hidden'}`}>lasting</span>
              <span className={`inline-block mx-1 text-purple-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-21' : 'kinetic-word-hidden'}`}>bonds</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-22' : 'kinetic-word-hidden'}`}>between</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-23' : 'kinetic-word-hidden'}`}>families</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-24' : 'kinetic-word-hidden'}`}>and</span>
              <span className={`inline-block mx-1 ${kineticVisible ? 'kinetic-word-slide kinetic-delay-25' : 'kinetic-word-hidden'}`}>their</span>
              <span className={`inline-block mx-1 text-pink-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-26' : 'kinetic-word-hidden'}`}>perfect</span>
              <span className={`inline-block mx-1 text-pink-600 font-semibold ${kineticVisible ? 'kinetic-word-slide kinetic-delay-27' : 'kinetic-word-hidden'}`}>companions.</span>
            </p>
          </div>

          {/* Features Grid with Sliding Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: '🏥',
                title: 'Health Guaranteed',
                description: 'All pets come with complete medical records and health certifications from licensed veterinarians.',
                color: 'from-green-100 to-emerald-100',
                delay: '0s'
              },
              {
                icon: '🎯',
                title: 'Perfect Matching',
                description: 'Our AI-powered system matches you with pets based on lifestyle, preferences, and compatibility.',
                color: 'from-blue-100 to-cyan-100',
                delay: '0.2s'
              },
              {
                icon: '🏠',
                title: 'Home Visits',
                description: 'Free home assessment and setup guidance to ensure your new pet feels comfortable from day one.',
                color: 'from-purple-100 to-pink-100',
                delay: '0.4s'
              },
              {
                icon: '📱',
                title: 'Digital Support',
                description: '24/7 virtual vet consultations and training resources through our mobile app.',
                color: 'from-orange-100 to-yellow-100',
                delay: '0.6s'
              },
              {
                icon: '🌟',
                title: 'Lifetime Care',
                description: 'Ongoing support, training programs, and emergency assistance for the life of your pet.',
                color: 'from-rose-100 to-pink-100',
                delay: '0.8s'
              },
              {
                icon: '🤝',
                title: 'Community',
                description: 'Join thousands of pet parents in our supportive community with events and meetups.',
                color: 'from-indigo-100 to-purple-100',
                delay: '1s'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`relative group slide-in-left bg-gradient-to-br ${feature.color} rounded-2xl p-6 hover:shadow-xl transition-all duration-500 transform hover:scale-105`}
                style={{ 
                  animationDelay: feature.delay,
                  transform: `translateX(${scrollY * (0.02 + index * 0.005)}px)`
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Process Steps with Sliding Animation */}
          <div className="relative">
            <div className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Simple <span className="text-pink-600">3-Step</span> Process
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                From browsing to bringing your new friend home, we've made pet adoption simple and joyful.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 transform -translate-y-1/2"></div>
              <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 transform -translate-y-1/2"></div>

              {[
                {
                  step: '01',
                  title: 'Browse & Connect',
                  description: 'Explore our curated selection of pets and connect with the ones that capture your heart.',
                  icon: '🔍',
                  animation: 'slide-in-right'
                },
                {
                  step: '02',
                  title: 'Meet & Greet',
                  description: 'Schedule a meet-and-greet session to ensure compatibility and build that special bond.',
                  icon: '🤝',
                  animation: 'slide-in-up'
                },
                {
                  step: '03',
                  title: 'Welcome Home',
                  description: 'Complete the adoption process and welcome your new family member with our support.',
                  icon: '🏡',
                  animation: 'slide-in-left'
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className={`relative text-center ${step.animation} group`}
                  style={{ 
                    animationDelay: `${index * 0.3}s`,
                    transform: `translateY(${scrollY * (0.01 + index * 0.005)}px)`
                  }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      {step.step}
                    </div>
                    <div className="absolute -top-2 -right-2 text-2xl group-hover:animate-bounce">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative py-16 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-pink-50/30">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Happy Families, <span className="text-pink-600">Happy Pets</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Don't just take our word for it. Here's what our amazing pet families have to say about their experience.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                pet: 'Luna (Golden Retriever)',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                text: 'Pet Haven made finding Luna so easy! The matching process was perfect, and the support team guided us through everything. Luna is now the heart of our family.',
                rating: 5,
                delay: '0s'
              },
              {
                name: 'Mike Chen',
                pet: 'Whiskers (Maine Coon)',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                text: 'The health guarantee and medical records gave us complete peace of mind. Whiskers arrived healthy and happy, and the transition was seamless.',
                rating: 5,
                delay: '0.3s'
              },
              {
                name: 'Emily Rodriguez',
                pet: 'Max (Rescue Mix)',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
                text: 'The home visit service was incredible! They helped us pet-proof our apartment and gave us amazing tips. Max settled in immediately.',
                rating: 5,
                delay: '0.6s'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 slide-in-up`}
                style={{ 
                  animationDelay: testimonial.delay,
                  transform: `translateY(${scrollY * (0.015 + index * 0.005)}px)`
                }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.pet}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="relative py-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8 md:p-12 text-center"
            style={{ transform: `translateY(${scrollY * 0.01}px)` }}
          >
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-8 left-8 w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Stay Connected with Pet Haven
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Get the latest updates on new pets, adoption success stories, and exclusive tips for pet care delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                />
                <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
              
              <p className="text-white/70 text-sm mt-4">
                Join 10,000+ pet lovers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section 
        className="relative py-12 px-6 lg:px-8"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-6 md:p-8">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full pattern-dots" />
              </div>

              <div className="relative flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-1 lg:max-w-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop" 
                    alt="Happy person with pet" 
                    className="w-full rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1 text-white text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
                    New Pet In Home?
                  </h2>
                  <p className="text-base mb-4 opacity-90 leading-relaxed">
                    Start your journey with a loving companion today. Our expert team will guide you through every step of pet adoption.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link
                      to="/pets"
                      className="group relative px-6 py-3 bg-white text-green-600 rounded-full font-bold text-base overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <span className="relative z-10">Find Your Pet</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 font-bold">
                        Find Your Pet
                      </span>
                    </Link>
                    
                    <Link
                      to="/volunteer"
                      className="px-6 py-3 border-2 border-white text-white rounded-full font-bold text-base hover:bg-white hover:text-green-600 transition-all duration-300"
                    >
                      Get Involved
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL FOOTER SECTION */}
      <footer 
        className="relative bg-gray-900 text-white py-12 px-6 lg:px-8 overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.01}px)` }}
      >
        {/* Footer Parallax Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-4 right-8 w-8 h-8 opacity-10 floating-element"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            🐾
          </div>
          <div 
            className="absolute bottom-8 left-12 w-6 h-6 opacity-15 floating-element"
            style={{ transform: `translateY(${scrollY * -0.03}px)`, animationDelay: '2s' }}
          >
            💕
          </div>
          <div 
            className="absolute top-1/2 right-1/4 w-4 h-4 opacity-20 floating-element"
            style={{ transform: `translateY(${scrollY * 0.04}px)`, animationDelay: '1s' }}
          >
            ✨
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8">
                  <Logo width={32} height={32} />
                </div>
                <span className="text-xl font-bold">Pet Haven</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Connecting loving families with adorable pets. Your journey to finding the perfect companion starts here.
              </p>
              <div className="flex gap-3">
                {['🐕', '🐱', '🐰', '🐦'].map((emoji, index) => (
                  <div 
                    key={index}
                    className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-sm hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3 text-pink-400">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/pets" className="text-gray-400 hover:text-white transition-colors">Browse Pets</Link></li>
                <li><Link to="/shelters" className="text-gray-400 hover:text-white transition-colors">Find Shelters</Link></li>
                <li><Link to="/volunteer" className="text-gray-400 hover:text-white transition-colors">Volunteer</Link></li>
                <li><Link to="/donate" className="text-gray-400 hover:text-white transition-colors">Donate</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-3 text-pink-400">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-400">📞 1-800-PET-LOVE</span></li>
                <li><span className="text-gray-400">📧 help@pethaven.com</span></li>
                <li><span className="text-gray-400">🕒 24/7 Support</span></li>
                <li><span className="text-gray-400">💬 Live Chat Available</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 Pet Haven. Made with 💕 for pets and families.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

