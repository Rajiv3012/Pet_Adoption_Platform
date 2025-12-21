import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      // User is not logged in, redirect to login
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Extract first name from full name or email
  const getFirstName = () => {
    if (user?.name) {
      return user.name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Friend';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Paw Prints */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-200 animate-float-up opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            🐾
          </div>
        ))}
        
        {/* Floating Hearts */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-200 animate-bounce-gentle opacity-40"
            style={{
              right: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              fontSize: `${0.8 + Math.random() * 1}rem`,
              animationDuration: `${2 + Math.random() * 1.5}s`
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Welcome Animation Container */}
          <div className="mb-12 animate-fade-in-up">
            {/* Pet Haven Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl mb-8 shadow-2xl animate-bounce-gentle">
              <span className="text-4xl">🐾</span>
            </div>

            {/* Welcome Message */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent animate-gradient-x">
              Welcome to Pet Haven!
            </h1>
            
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
                Hello, <span className="text-pink-600">{getFirstName()}</span>! 👋
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We're thrilled to have you join our loving community of pet enthusiasts. 
                Your journey to find the perfect furry companion starts here!
              </p>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Browse Pets Card */}
            <Link to="/pets" className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-pink-100">
                <div className="text-5xl mb-4 group-hover:animate-bounce">🐕</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Browse Pets</h3>
                <p className="text-gray-600 mb-4">
                  Discover amazing pets waiting for their forever homes
                </p>
                <div className="inline-flex items-center text-pink-600 font-semibold group-hover:text-pink-700">
                  Start Browsing
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Find Shelters Card */}
            <Link to="/shelters" className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-100">
                <div className="text-5xl mb-4 group-hover:animate-bounce">🏠</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Find Shelters</h3>
                <p className="text-gray-600 mb-4">
                  Connect with local shelters and rescue organizations
                </p>
                <div className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Explore Shelters
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Volunteer Card */}
            <Link to="/volunteer" className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-rose-100">
                <div className="text-5xl mb-4 group-hover:animate-bounce">❤️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Volunteer</h3>
                <p className="text-gray-600 mb-4">
                  Make a difference by volunteering at local shelters
                </p>
                <div className="inline-flex items-center text-rose-600 font-semibold group-hover:text-rose-700">
                  Get Involved
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Pet Haven Community</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">500+</div>
                <div className="text-gray-600">Happy Adoptions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
                <div className="text-gray-600">Partner Shelters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-600 mb-1">200+</div>
                <div className="text-gray-600">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">1000+</div>
                <div className="text-gray-600">Community Members</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <Link 
              to="/pets"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-3">🎉</span>
              Start Your Pet Journey
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}