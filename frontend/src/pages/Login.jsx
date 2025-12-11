import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("LOGIN RESPONSE:", res.data);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.log("FRONTEND LOGIN ERROR:", err);
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF8F3] via-[#F4F1DE] to-[#81B29A]/20 p-4">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#E07A5F]/10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#81B29A]/10 animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#FFB347]/10 animate-spin-slow"></div>

      <div className="relative w-full max-w-lg">
        {/* Card with gradient border */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#FFB347] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#E07A5F] to-[#81B29A] p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <i className="fas fa-paw text-white text-3xl"></i>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-white/90">Sign in to continue your pet adoption journey</p>
            </div>

            {/* Card Body */}
            <div className="p-8">
              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <i className="fas fa-envelope mr-2 text-[#E07A5F]"></i>
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    className="w-full border-2 border-gray-200 p-4 pl-12 rounded-xl focus:outline-none focus:border-[#81B29A] focus:ring-2 focus:ring-[#81B29A]/20 transition-all duration-300 bg-gray-50/50"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="fas fa-user-circle text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <i className="fas fa-lock mr-2 text-[#81B29A]"></i>
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border-2 border-gray-200 p-4 pl-12 pr-12 rounded-xl focus:outline-none focus:border-[#81B29A] focus:ring-2 focus:ring-[#81B29A]/20 transition-all duration-300 bg-gray-50/50"
                    placeholder="Enter your password"
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#81B29A] peer-checked:border-[#81B29A] transition-all duration-300"></div>
                    <i className="fas fa-check absolute inset-0 text-white text-xs opacity-0 peer-checked:opacity-100 flex items-center justify-center"></i>
                  </div>
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-[#E07A5F] hover:text-[#81B29A] transition-colors font-medium">
                  Forgot Password?
                </a>
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

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#E07A5F] to-[#FFB347] hover:from-[#FFB347] hover:to-[#E07A5F] hover:shadow-xl transform hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white">Sign In</span>
                      <i className="fas fa-arrow-right text-white transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </>
                  )}
                </div>
              </button>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500">Or continue with</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center space-x-3 p-3 border-2 border-gray-200 rounded-xl hover:border-[#81B29A]/50 hover:bg-[#81B29A]/5 transition-all duration-300">
                  <i className="fab fa-google text-red-500"></i>
                  <span className="text-gray-700">Google</span>
                </button>
                <button className="flex items-center justify-center space-x-3 p-3 border-2 border-gray-200 rounded-xl hover:border-[#81B29A]/50 hover:bg-[#81B29A]/5 transition-all duration-300">
                  <i className="fab fa-facebook text-blue-600"></i>
                  <span className="text-gray-700">Facebook</span>
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center pt-6 border-t border-gray-100">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-[#81B29A] hover:text-[#E07A5F] font-bold transition-colors group"
                  >
                    <span className="inline-flex items-center space-x-1">
                      <span>Create Account</span>
                      <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </span>
                  </Link>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-[#81B29A]/10 rounded-xl">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-shield-alt text-[#81B29A] mt-1"></i>
                  <div>
                    <p className="text-sm text-gray-600">
                      Your information is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative paw prints */}
        <div className="absolute -top-4 -left-4 w-8 h-8 opacity-20">
          <i className="fas fa-paw text-[#E07A5F] text-2xl"></i>
        </div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 opacity-20">
          <i className="fas fa-paw text-[#81B29A] text-2xl"></i>
        </div>
      </div>
    </div>
  );
}