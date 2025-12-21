import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      // Handle OAuth error
      if (window.opener) {
        window.opener.postMessage({
          type: 'GOOGLE_AUTH_ERROR',
          error: 'Google authentication failed'
        }, window.location.origin);
        window.close();
      } else {
        navigate('/login?error=Google authentication failed');
      }
      return;
    }

    if (token && userData) {
      try {
        // If this is in a popup, send message to parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'GOOGLE_AUTH_SUCCESS',
            token: token,
            user: JSON.parse(userData)
          }, window.location.origin);
          window.close();
        } else {
          // Fallback: store token and redirect (for direct navigation)
          localStorage.setItem("token", token);
          localStorage.setItem("user", userData);
          window.location.href = "/dashboard";
        }
      } catch (err) {
        console.error("Error processing OAuth callback:", err);
        if (window.opener) {
          window.opener.postMessage({
            type: 'GOOGLE_AUTH_ERROR',
            error: 'Authentication processing failed'
          }, window.location.origin);
          window.close();
        } else {
          navigate('/login?error=Authentication processing failed');
        }
      }
    } else {
      // Missing required data
      if (window.opener) {
        window.opener.postMessage({
          type: 'GOOGLE_AUTH_ERROR',
          error: 'Invalid authentication response'
        }, window.location.origin);
        window.close();
      } else {
        navigate('/login?error=Invalid authentication response');
      }
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Completing Sign In</h2>
        <p className="text-gray-600">Please wait while we finish setting up your account...</p>
      </div>
    </div>
  );
}