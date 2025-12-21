// Google OAuth Configuration with proper setup
export const GOOGLE_CLIENT_ID = "1088896971354-your-actual-client-id.apps.googleusercontent.com";

let isGoogleLoaded = false;
let googleLoadPromise = null;

export const initializeGoogleAuth = () => {
  if (googleLoadPromise) {
    return googleLoadPromise;
  }

  googleLoadPromise = new Promise((resolve, reject) => {
    // Check if Google script is already loaded
    if (window.google && window.google.accounts) {
      isGoogleLoaded = true;
      resolve();
      return;
    }

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Wait for google object to be available
      const checkGoogle = setInterval(() => {
        if (window.google && window.google.accounts) {
          clearInterval(checkGoogle);
          isGoogleLoaded = true;
          resolve();
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogle);
        if (!isGoogleLoaded) {
          reject(new Error('Google Identity Services failed to load'));
        }
      }, 10000);
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Identity Services script'));
    };
    
    document.head.appendChild(script);
  });

  return googleLoadPromise;
};

export const signInWithGoogle = async () => {
  try {
    // Ensure Google is loaded
    await initializeGoogleAuth();
    
    return new Promise((resolve, reject) => {
      // For demo purposes, let's create a mock successful login
      // In production, you would use the real Google OAuth flow
      
      const mockLogin = () => {
        const userEmail = prompt("Demo: Enter your email for Google sign-in:");
        const userName = prompt("Demo: Enter your name:");
        
        if (userEmail && userName) {
          const mockUserInfo = {
            email: userEmail,
            name: userName,
            sub: `google_${Date.now()}`,
            picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=4285f4&color=fff&size=200`
          };
          
          resolve({
            credential: "demo-jwt-token",
            userInfo: mockUserInfo
          });
        } else {
          reject(new Error('Google sign-in cancelled'));
        }
      };

      // Use mock login for demo
      mockLogin();
      
      /* 
      // Real Google OAuth implementation (uncomment when you have valid Client ID):
      
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (response.credential) {
            const userInfo = parseJwt(response.credential);
            resolve({
              credential: response.credential,
              userInfo: userInfo
            });
          } else {
            reject(new Error('No credential received'));
          }
        }
      });

      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          reject(new Error('Google sign-in popup was blocked or dismissed'));
        }
      });
      */
    });
  } catch (error) {
    throw new Error(`Google sign-in failed: ${error.message}`);
  }
};

// Helper function to decode JWT token (for real implementation)
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};