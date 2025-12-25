# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Pet Haven Auth"
4. Click "Create"

## Step 2: Enable Google Identity Services

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Identity Services API"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure OAuth consent screen:
   - Choose "External" user type
   - Fill in app name: "Pet Haven"
   - Add your email as developer contact
   - Save and continue through all steps

4. For OAuth 2.0 Client ID:
   - Application type: "Web application"
   - Name: "Pet Haven Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173`
     - `http://localhost:5174`
     - `http://127.0.0.1:5173`
     - `http://127.0.0.1:5174`
   - Authorized redirect URIs:
     - `http://localhost:5173`
     - `http://localhost:5174`

5. Click "Create"
6. Copy the Client ID (it looks like: `123456789-abcdefg.apps.googleusercontent.com`)

## Step 4: Update Environment Variables

1. Open `frontend/.env`
2. Replace `your-google-client-id.apps.googleusercontent.com` with your actual Client ID:

```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
```

## Step 5: Test the Integration

1. Restart your frontend server: `npm run dev`
2. Go to the login page
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the dashboard

## Features Implemented

✅ **Google Sign-In Button** - Functional Google OAuth button
✅ **JWT Token Generation** - Backend creates JWT tokens for Google users  
✅ **User Creation** - New users are automatically created from Google data
✅ **Account Linking** - Existing users can link their Google accounts
✅ **Profile Pictures** - Google profile pictures are saved
✅ **Loading States** - Button shows loading spinner during authentication
✅ **Error Handling** - Proper error messages for failed authentication

## Security Notes

- Google Client ID is safe to expose in frontend code
- JWT tokens are stored in localStorage
- Random passwords are generated for Google-only users
- Google ID is stored for account linking

## Troubleshooting

**Error: "Invalid Google authentication data"**
- Check if VITE_GOOGLE_CLIENT_ID is set correctly
- Ensure Google Identity Services script is loaded

**Error: "Google sign-in failed"**
- Check browser console for detailed errors
- Verify authorized origins in Google Cloud Console
- Make sure you're accessing the site from an authorized domain

**Error: "Server error during Google authentication"**
- Check backend logs for detailed error messages
- Ensure MongoDB is running and connected