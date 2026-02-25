# 🔐 Google OAuth Configuration Guide

## Your Google OAuth Credentials
```
Client ID: 719670600296-76c0j82pt0b2ijmekh6js4e89jh1llea.apps.googleusercontent.com
Client Secret: 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t
```

## ⚠️ CRITICAL: Google Cloud Console Configuration

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/apis/credentials

### Step 2: Select Your OAuth 2.0 Client ID
Find the client ID: `719670600296-76c0j82pt0b2ijmekh6js4e89jh1llea`

### Step 3: Configure Authorized JavaScript Origins
Add ALL of these URLs:

```
http://localhost:5173
http://localhost:5000
https://pet-adoption-platform-pkhw.onrender.com
https://your-vercel-app.vercel.app
```

**Replace `your-vercel-app.vercel.app` with your actual Vercel domain!**

### Step 4: Configure Authorized Redirect URIs
Add ALL of these URLs:

```
http://localhost:5000/api/auth/google/callback
https://pet-adoption-platform-pkhw.onrender.com/api/auth/google/callback
```

## 📋 Complete Configuration Checklist

### ✅ Backend Environment Variables (Render)

Go to: Render Dashboard → Your Service → Environment

Add these variables:

```env
GOOGLE_CLIENT_ID=719670600296-76c0j82pt0b2ijmekh6js4e89jh1llea.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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t
GOOGLE_CALLBACK_URL=https://pet-adoption-platform-pkhw.onrender.com/api/auth/google/callback
```

### ✅ Frontend Environment Variables (Vercel)

Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Add this variable:

```env
VITE_API_URL=https://pet-adoption-platform-pkhw.onrender.com/api
```

## 🔍 Common Issues & Solutions

### Issue 1: "redirect_uri_mismatch" Error
**Cause:** The redirect URI in Google Cloud Console doesn't match your backend URL.

**Solution:** 
1. Check the error message for the exact redirect URI being used
2. Add that EXACT URL to "Authorized redirect URIs" in Google Cloud Console
3. Make sure there are no trailing slashes or typos

### Issue 2: "origin_mismatch" Error
**Cause:** The origin (frontend URL) is not authorized.

**Solution:**
1. Add your Vercel URL to "Authorized JavaScript origins"
2. Format: `https://your-app.vercel.app` (no trailing slash, no /api)

### Issue 3: OAuth Popup Opens but Shows Error
**Cause:** Backend environment variables not set correctly on Render.

**Solution:**
1. Go to Render Dashboard
2. Navigate to your backend service
3. Go to "Environment" tab
4. Add/update the three Google OAuth variables listed above
5. Click "Save Changes" - this will trigger a redeploy

### Issue 4: Still Redirecting to Localhost
**Cause:** Frontend not using environment variables.

**Solution:**
1. Verify Vercel has `VITE_API_URL` set
2. Trigger a new deployment (push to GitHub or manual redeploy)
3. Clear browser cache and cookies
4. Try in incognito mode

## 🧪 Testing Steps

### 1. Test Locally First
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Visit: http://localhost:5173
Click "Continue with Google"
Should redirect to: http://localhost:5000/api/auth/google

### 2. Test Production
Visit: https://your-vercel-app.vercel.app
Click "Continue with Google"
Should redirect to: https://pet-adoption-platform-pkhw.onrender.com/api/auth/google

## 📸 What Google Cloud Console Should Look Like

### Authorized JavaScript Origins:
```
✓ http://localhost:5173
✓ http://localhost:5000
✓ https://pet-adoption-platform-pkhw.onrender.com
✓ https://your-vercel-app.vercel.app
```

### Authorized Redirect URIs:
```
✓ http://localhost:5000/api/auth/google/callback
✓ https://pet-adoption-platform-pkhw.onrender.com/api/auth/google/callback
```

## 🚀 Deployment Checklist

- [ ] Updated backend/.env with Google credentials
- [ ] Updated backend/.env.production with Google credentials
- [ ] Pushed changes to GitHub
- [ ] Configured Google Cloud Console (JavaScript Origins)
- [ ] Configured Google Cloud Console (Redirect URIs)
- [ ] Set environment variables in Render Dashboard
- [ ] Set environment variables in Vercel Dashboard
- [ ] Redeployed backend on Render
- [ ] Redeployed frontend on Vercel
- [ ] Tested OAuth flow in production
- [ ] Cleared browser cache before testing

## 🔗 Important URLs

- **Google Cloud Console:** https://console.cloud.google.com/apis/credentials
- **Render Dashboard:** https://dashboard.render.com/
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Backend:** https://pet-adoption-platform-pkhw.onrender.com
- **Your Frontend:** (Get from Vercel dashboard)

## 💡 Pro Tips

1. **Always use HTTPS in production** - Google OAuth requires secure connections
2. **No trailing slashes** - `https://example.com` not `https://example.com/`
3. **Exact matches only** - Google is very strict about URL matching
4. **Test in incognito** - Avoids cached credentials causing confusion
5. **Check Render logs** - If backend fails, check logs in Render dashboard
6. **Environment variables need redeploy** - Changing env vars requires redeployment

## 🆘 Still Not Working?

1. Check Render backend logs for errors
2. Open browser DevTools → Network tab → Look for failed requests
3. Verify the exact URL being called in the OAuth redirect
4. Make sure backend is actually running on Render (not sleeping)
5. Try the OAuth flow in a completely fresh incognito window
