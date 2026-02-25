# 🔧 Production OAuth Redirect Fix

## Problem
Production site was redirecting to `http://localhost:5000/api/auth/google` instead of the production backend URL.

## Root Causes Found
Three hardcoded `localhost:5000` references in frontend code:

1. ❌ `frontend/src/services/api.js` - Line 3
2. ❌ `frontend/src/pages/Login.jsx` - Line 86  
3. ❌ `frontend/src/pages/Register.jsx` - Line 98

## Fixes Applied

### 1. API Base URL (api.js)
```javascript
// Before
const API_BASE_URL = "http://localhost:5000/api";

// After
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

### 2. Google OAuth URLs (Login.jsx & Register.jsx)
```javascript
// Before
const popup = window.open(
  "http://localhost:5000/api/auth/google?prompt=select_account",
  ...
);

// After
const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const baseUrl = backendUrl.replace('/api', '');
const popup = window.open(
  `${baseUrl}/api/auth/google?prompt=select_account`,
  ...
);
```

### 3. Environment Variables Updated
```env
# frontend/.env.production
VITE_API_URL=https://pet-adoption-platform-pkhw.onrender.com/api
```

## Next Steps

### 1. Redeploy Frontend to Vercel
```bash
cd frontend
npm run build
# Push to Git or deploy via Vercel CLI
```

### 2. Verify Vercel Environment Variables
Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Ensure this is set:
```
VITE_API_URL = https://pet-adoption-platform-pkhw.onrender.com/api
```

### 3. Update Google Cloud OAuth Configuration
Go to: [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials

Add these to your OAuth 2.0 Client:

**Authorized JavaScript Origins:**
- `https://your-frontend.vercel.app`
- `https://pet-adoption-platform-pkhw.onrender.com`

**Authorized Redirect URIs:**
- `https://pet-adoption-platform-pkhw.onrender.com/api/auth/google/callback`

### 4. Test Production
After redeployment, test:
1. Visit your Vercel site
2. Click "Continue with Google"
3. Should redirect to: `https://pet-adoption-platform-pkhw.onrender.com/api/auth/google`
4. NOT to localhost anymore ✅

## Architecture Verification
- ✅ Frontend: Vercel
- ✅ Backend: Render (https://pet-adoption-platform-pkhw.onrender.com)
- ✅ Environment variables: Using `import.meta.env.VITE_API_URL`
- ✅ Fallback to localhost for local development

## Why This Happened
The code had hardcoded URLs that worked in development but failed in production. Now it uses environment variables that adapt to each environment automatically.
