# 🚨 SECURITY ALERT - IMMEDIATE ACTION REQUIRED

## ⚠️ CLIENT SECRET WAS EXPOSED PUBLICLY

Your Google OAuth Client Secret was accidentally shared in a public message:
```
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t
```

## 🔥 IMMEDIATE STEPS (DO THIS NOW):

### Step 1: Delete Compromised OAuth Client
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find OAuth Client ID: `719670600296-76c0j82pt0b2ijmekh6js4e89jh1llea`
3. Click the trash icon to DELETE it
4. Confirm deletion

### Step 2: Create NEW OAuth Client
1. Click "Create Credentials" → "OAuth 2.0 Client ID"
2. Application type: "Web application"
3. Name: "Pet Haven Production"

### Step 3: Configure NEW OAuth Client

**Authorized JavaScript Origins:**
```
http://localhost:5173
http://localhost:5000
https://pet-adoption-platform-pkhw.onrender.com
https://YOUR-VERCEL-APP.vercel.app
```

**Authorized Redirect URIs:**
```
http://localhost:5000/api/auth/google/callback
https://pet-adoption-platform-pkhw.onrender.com/api/auth/google/callback
```

### Step 4: Update Backend Environment Variables

**Local (backend/.env):**
```env
GOOGLE_CLIENT_ID=your-new-client-id
GOOGLE_CLIENT_SECRET=your-new-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5174
```

**Render Dashboard → Environment:**
```env
GOOGLE_CLIENT_ID=your-new-client-id
GOOGLE_CLIENT_SECRET=your-new-client-secret
GOOGLE_CALLBACK_URL=https://pet-adoption-platform-pkhw.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## 🔒 Security Best Practices

1. **NEVER share Client Secrets publicly**
2. **NEVER commit secrets to Git** (use .env files that are in .gitignore)
3. **Rotate secrets immediately if exposed**
4. **Use environment variables for all sensitive data**
5. **Keep production secrets separate from development**

## ✅ After Creating New Credentials

1. Update `backend/.env` with new credentials
2. Update Render environment variables
3. Redeploy backend on Render
4. Test OAuth flow locally first
5. Test OAuth flow in production

## 📝 What Was Fixed

1. ✅ Removed hardcoded localhost URLs from `googleAuth.js`
2. ✅ Added `FRONTEND_URL` environment variable
3. ✅ Backend now uses env vars for all redirects
4. ✅ Removed exposed secrets from `.env.production`

## 🎯 Complete Environment Variables Needed

### Render (Backend):
```
PORT=10000
NODE_ENV=production
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-jwt-secret
FRONTEND_URL=https://your-vercel-app.vercel.app
GOOGLE_CLIENT_ID=your-new-client-id
GOOGLE_CLIENT_SECRET=your-new-client-secret
GOOGLE_CALLBACK_URL=https://pet-adoption-platform-pkhw.onrender.com/api/auth/google/callback
RAZORPAY_DEMO_MODE=true
RAZORPAY_KEY_ID=rzp_test_demo123456789
RAZORPAY_KEY_SECRET=demo_secret_key_simulation
```

### Vercel (Frontend):
```
VITE_API_URL=https://pet-adoption-platform-pkhw.onrender.com/api
```

## 🧪 Testing After Fix

1. **Test Backend Route:**
   ```
   https://pet-adoption-platform-pkhw.onrender.com/api/auth/google
   ```
   Should redirect to Google login page

2. **Test Complete Flow:**
   - Visit your Vercel site
   - Click "Continue with Google"
   - Should redirect to Google
   - After login, should redirect back to your Vercel site

## ⚠️ Remember

Client Secrets are like passwords - treat them with the same security!
