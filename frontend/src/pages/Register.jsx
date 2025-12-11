import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    try {
      setError("");
      setLoading(true);

      if (password !== confirm) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Email already exists");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF8F3] via-[#F4F1DE] to-[#81B29A]/20 p-4">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#FFB347]/10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#E07A5F]/10 animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#81B29A]/10 animate-spin-slow"></div>

      <div className="relative w-full max-w-lg">
        {/* Card with gradient border */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#81B29A] via-[#FFB347] to-[#E07A5F] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#81B29A] to-[#FFB347] p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <i className="fas fa-user-plus text-white text-3xl"></i>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join Our Family</h1>
              <p className="text-white/90">Start your pet adoption journey today</p>
            </div>

            {/* Card Body */}
            <div className="p-8">
              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <i className="fas fa-user mr-2 text-[#E07A5F]"></i>
                  Full Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 p-4 pl-12 rounded-xl focus:outline-none focus:border-[#81B29A] focus:ring-2 focus:ring-[#81B29A]/20 transition-all duration-300 bg-gray-50/50"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="fas fa-id-card text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <i className="fas fa-envelope mr-2 text-[#81B29A]"></i>
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    className="w-full border-2 border-gray-200 p-4 pl-12 rounded-xl focus:outline-none focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB347]/20 transition-all duration-300 bg-gray-50/50"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="fas fa-at text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <i className="fas fa-lock mr-2 text-[#FFB347]"></i>
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border-2 border-gray-200 p-4 pl-12 pr-12 rounded-xl focus:outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20 transition-all duration-300 bg-gray-50/50"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="fas fa-key text-gray-400"></i>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E07A5F] transition-colors"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                <div className="mt-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-1/4 h-1 rounded-full ${password.length > 0 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                    <div className={`w-1/4 h-1 rounded-full ${password.length >= 6 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                    <div className={`w-1/4 h-1 rounded-full ${password.length >= 8 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                    <div className={`w-1/4 h-1 rounded-full ${password.length >= 12 ? 'bg-[#81B29A]' : 'bg-gray-200'}`}></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {password.length === 0 ? 'Enter a password' : 
                     password.length < 6 ? 'Weak' : 
                     password.length < 8 ? 'Fair' : 
                     password.length < 12 ? 'Good' : 'Strong'}
                  </p>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <i className="fas fa-lock mr-2 text-[#81B29A]"></i>
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full border-2 p-4 pl-12 pr-12 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-gray-50/50 ${
                      confirm && password !== confirm 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                        : 'border-gray-200 focus:border-[#81B29A] focus:ring-[#81B29A]/20'
                    }`}
                    placeholder="Confirm your password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#81B29A] transition-colors"
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {confirm && password !== confirm && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="mb-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <div className="relative mt-1">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#81B29A] peer-checked:border-[#81B29A] transition-all duration-300"></div>
                    <i className="fas fa-check absolute inset-0 text-white text-xs opacity-0 peer-checked:opacity-100 flex items-center justify-center"></i>
                  </div>
                  <span className="text-gray-600 text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-[#E07A5F] hover:underline font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-[#E07A5F] hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center space-x-2 text-red-600">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Register Button */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#81B29A] to-[#FFB347] hover:from-[#FFB347] hover:to-[#81B29A] hover:shadow-xl transform hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white">Create Account</span>
                      <i className="fas fa-heart text-white"></i>
                    </>
                  )}
                </div>
              </button>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500">Already have an account?</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center space-x-2 text-[#81B29A] hover:text-[#E07A5F] font-bold transition-colors group"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Sign In to Existing Account</span>
                  <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
                </Link>
              </div>

              {/* Benefits */}
              <div className="mt-8 p-6 bg-[#E07A5F]/10 rounded-xl">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                  <i className="fas fa-star text-[#FFB347] mr-2"></i>
                  Benefits of Registering
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-[#81B29A] mr-3"></i>
                    Save your favorite pets
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-[#81B29A] mr-3"></i>
                    Faster adoption applications
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-[#81B29A] mr-3"></i>
                    Get adoption updates
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-[#81B29A] mr-3"></i>
                    Join our community
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative paw prints */}
        <div className="absolute -top-4 -left-4 w-8 h-8 opacity-20">
          <i className="fas fa-paw text-[#FFB347] text-2xl"></i>
        </div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 opacity-20">
          <i className="fas fa-paw text-[#81B29A] text-2xl"></i>
        </div>
        <div className="absolute top-1/2 -left-8 w-8 h-8 opacity-20">
          <i className="fas fa-paw text-[#E07A5F] text-2xl"></i>
        </div>
      </div>
    </div>
  );
}