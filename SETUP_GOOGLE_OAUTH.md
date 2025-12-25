# 🚀 Complete Google OAuth Setup Guide

## Quick Setup (5 minutes)

### Step 1: Get Google Client ID

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create New Project**:
   - Click "Select a project" → "New Project"
   - Project name: `Pet Haven`
   - Click "Create"

3. **Enable APIs**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Identity Services API"
   - Click "Enable"

4. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill required fields:
     - App name: `Pet Haven`
     - User support email: `your-email@gmail.com`
     - Developer contact: `your-email@gmail.com`
   - Click "Save and Continue" through all steps

5. **Create OAuth 2.0 Client ID**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: `Pet Haven Web Client`
   - **Authorized JavaScript origins**:
     ```
     http://localhost:5173
     http://localhost:5174
     http://127.0.0.1:5173
     http://127.0.0.1:5174
     ```
   - **Authorized redirect URIs**:
     ```
     http://localhost:5173/
     http://localhost:5174/
     ```
   - Click "Create"
   - **Copy the Client ID** (looks like: `123456789-abc123.apps.googleusercontent.com`)

### Step 2: Update Environment Variables

Replace the Client ID in `frontend/.env`:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com
```

### Step 3: Update the Google Auth Config

In `frontend/src/config/googleAuth.js`, replace line 2:

```javascript
export const GOOGLE_CLIENT_ID = "YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com";
```

And uncomment the real Google OAuth implementation (lines 45-65) and comment out the mock login.

### Step 4: Test the Integration

1. **Restart frontend server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Go to login page**: http://localhost:5174/login
3. **Click "Continue with Google"**
4. **Sign in with your Google account**
5. **You should be redirected to dashboard**

## 🔧 Current Demo Mode

Right now, the Google sign-in is in **DEMO MODE** and will show prompts for email/name instead of real Google OAuth. This is so you can test the functionality immediately.

Once you complete the setup above, it will use real Google authentication.

## ✅ What's Already Working

- ✅ Google sign-in button with loading states
- ✅ Backend Google OAuth endpoint (`/auth/google`)
- ✅ User creation from Google data
- ✅ JWT token generation
- ✅ Profile picture saving
- ✅ Dashboard redirect
- ✅ Error handling

## 🐛 Troubleshooting

**"Can't continue with google.com" error**:
- This happens when using invalid/demo Client ID
- Follow Step 1-3 above to get real Client ID

**"Popup blocked" error**:
- Allow popups for localhost in your browser
- Try different browser

**"Invalid client" error**:
- Check if Client ID is correct in `.env`
- Verify authorized origins in Google Cloud Console

**Backend errors**:
- Make sure backend server is running on port 5000
- Check MongoDB connection

## 🎯 Production Deployment

For production, you'll need to:
1. Add your production domain to authorized origins
2. Update the Client ID in production environment
3. Use HTTPS (required by Google for production)

## 📞 Need Help?

If you get stuck, the demo mode will still work for testing the user flow!