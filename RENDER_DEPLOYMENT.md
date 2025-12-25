# 🚀 Render Deployment Guide

## 🎯 Quick Deploy to Render (Recommended)

### Step 1: Prepare Your Repository
Your code is already ready! Just make sure it's pushed to GitHub.

### Step 2: Deploy Backend (API)
1. **Go to [render.com](https://render.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name**: `pethaven-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pet_adoption
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_CLIENT_ID=your-google-client-id-here
   GOOGLE_CLIENT_SECRET=your-google-client-secret-here
   GOOGLE_CALLBACK_URL=https://pethaven-backend.onrender.com/api/auth/google/callback
   RAZORPAY_DEMO_MODE=true
   RAZORPAY_KEY_ID=rzp_test_demo123456789
   RAZORPAY_KEY_SECRET=demo_secret_key_simulation
   ```

7. **Click "Create Web Service"**

### Step 3: Deploy Frontend (Static Site)
1. **Click "New +"** → **"Static Site"**
2. **Connect the same GitHub repository**
3. **Configure:**
   - **Name**: `pethaven-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://pethaven-backend.onrender.com
   ```

5. **Click "Create Static Site"**

### Step 4: Update Google OAuth
1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Navigate to APIs & Services → Credentials**
3. **Edit your OAuth 2.0 Client**
4. **Add to Authorized redirect URIs:**
   ```
   https://pethaven-backend.onrender.com/api/auth/google/callback
   ```

## 🎉 That's It!

Your Pet Haven will be live at:
- **Frontend**: `https://pethaven-frontend.onrender.com`
- **Backend API**: `https://pethaven-backend.onrender.com`

## 📱 MongoDB Atlas Setup (Required)

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create free cluster**
3. **Get connection string**
4. **Add to Render environment variables**

## 🔧 Troubleshooting

### Common Issues:
- **Build fails**: Check Node.js version (use 18.x)
- **CORS errors**: Backend CORS is configured for any origin
- **OAuth not working**: Update Google Console redirect URLs
- **Database connection**: Check MongoDB Atlas connection string

### Free Tier Limitations:
- **Backend sleeps after 15 minutes** of inactivity
- **First request after sleep** takes ~30 seconds to wake up
- **750 hours/month** free (enough for personal projects)

## 💡 Pro Tips:
- Render automatically redeploys on GitHub pushes
- Free tier is perfect for showcasing to friends
- Upgrade to paid plan for production use
- Monitor logs in Render dashboard

---

**🎊 Your Pet Haven will be live and shareable with friends!**