import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      // User is already logged in, redirect to welcome page
      navigate("/welcome");
      return;
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      if (!name || !email || !password || !confirm) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      if (password !== confirm) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      const response = await authAPI.register({
        name,
        email,
        password,
      });

      // Store token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess("Account created successfully! Redirecting...");
      
      // Redirect to welcome page after success and refresh
      setTimeout(() => {
        navigate("/welcome");
        window.location.reload(); // Refresh page after account creation
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "Failed to create account");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    
    // Open Google OAuth in popup with account selection forced
    const popup = window.open(
      "http://localhost:5000/api/auth/google?prompt=select_account",
      "googleAuth",
      "width=500,height=600,scrollbars=yes,resizable=yes"
    );

    // Listen for popup to close or receive message
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        setIsGoogleLoading(false);
        // Check if authentication was successful by checking localStorage
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/welcome"); // Redirect to welcome page
          window.location.reload(); // Refresh page after Google sign in
        }
      }
    }, 1000);

    // Listen for messages from popup
    const messageListener = (event) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        localStorage.setItem("token", event.data.token);
        localStorage.setItem("user", JSON.stringify(event.data.user));
        popup.close();
        clearInterval(checkClosed);
        setIsGoogleLoading(false);
        navigate("/welcome"); // Redirect to welcome page
        window.location.reload(); // Refresh page after Google sign in
      } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
        popup.close();
        clearInterval(checkClosed);
        setIsGoogleLoading(false);
        setError("Google authentication failed. Please try again.");
      }
    };

    window.addEventListener('message', messageListener);

    // Cleanup listener when component unmounts or popup closes
    setTimeout(() => {
      window.removeEventListener('message', messageListener);
    }, 300000); // 5 minutes timeout
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Panda Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 relative overflow-hidden">
        {/* Botanical Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          {/* Floating Leaves */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${10 + (i % 4) * 20}%`,
                top: `${10 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${1.5 + (i % 3) * 0.5}rem`
              }}
            >
              {i % 4 === 0 ? '🌿' : i % 4 === 1 ? '🍃' : i % 4 === 2 ? '🌱' : '🌾'}
            </div>
          ))}
          
          {/* Floating Flowers */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce-gentle"
              style={{
                right: `${5 + (i % 3) * 25}%`,
                top: `${15 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.7}s`,
                fontSize: `${1 + (i % 2) * 0.3}rem`
              }}
            >
              {i % 2 === 0 ? '🌸' : '🌺'}
            </div>
          ))}
        </div>

        {/* Main Panda Character */}
        <div className="flex items-center justify-center w-full relative z-10">
          <div className="text-center animate-bounce-gentle">
            {/* Panda Face */}
            <div className="relative mb-8">
              <div className="w-48 h-48 bg-white rounded-full shadow-2xl relative mx-auto">
                {/* Panda Ears */}
                <div className="absolute -top-8 left-12 w-16 h-16 bg-gray-800 rounded-full"></div>
                <div className="absolute -top-8 right-12 w-16 h-16 bg-gray-800 rounded-full"></div>
                
                {/* Inner Ears */}
                <div className="absolute -top-6 left-14 w-12 h-12 bg-purple-200 rounded-full"></div>
                <div className="absolute -top-6 right-14 w-12 h-12 bg-purple-200 rounded-full"></div>
                
                {/* Eye Patches */}
                <div className="absolute top-12 left-12 w-16 h-20 bg-gray-800 rounded-full transform rotate-12"></div>
                <div className="absolute top-12 right-12 w-16 h-20 bg-gray-800 rounded-full transform -rotate-12"></div>
                
                {/* Eyes */}
                <div className="absolute top-16 left-16 w-8 h-8 bg-white rounded-full">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-gray-800 rounded-full">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="absolute top-16 right-16 w-8 h-8 bg-white rounded-full">
                  <div className="absolute top-1 right-1 w-6 h-6 bg-gray-800 rounded-full">
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Nose */}
                <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gray-800 rounded-full"></div>
                
                {/* Mouth */}
                <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-4 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-3 -left-2 w-4 h-2 border-b-2 border-gray-800 rounded-full"></div>
                  <div className="absolute top-3 -right-1 w-4 h-2 border-b-2 border-gray-800 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating Hearts */}
              <div className="absolute -top-4 -right-4 text-purple-400 text-2xl animate-float-up">💜</div>
              <div className="absolute -bottom-2 -left-6 text-pink-400 text-lg animate-float-up" style={{ animationDelay: '1s' }}>💖</div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Pet Haven!</h2>
            <p className="text-gray-600 text-lg">Create your account to start your pet journey</p>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl">🐾</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Pet Haven</h1>
            <p className="text-gray-600 mt-1">Create your account</p>
          </div>

          {/* Register Form */}
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white pr-12"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white pr-12"
                  placeholder="Confirm your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-green-600 text-sm font-medium">{success}</p>
              </div>
            )}

            {/* Create Account Button */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
              </div>
            </div>

            {/* Social Register Button */}
            <div>
              <button 
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-3"></div>
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">
                  {isGoogleLoading ? 'Opening Google...' : 'Continue with Google'}
                </span>
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-pink-600 hover:text-pink-700 font-semibold transition-colors duration-200">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}