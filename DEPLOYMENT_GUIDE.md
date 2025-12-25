# 🚀 Pet Haven Deployment Guide

This guide covers multiple deployment options for your Pet Adoption Platform.

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup
- ✅ Google OAuth credentials configured
- ✅ MongoDB connection string ready
- ✅ JWT secret configured
- ✅ All sensitive data in .env files

### 2. Build Preparation
```bash
# Frontend build
cd frontend
npm run build

# Backend is ready (no build needed for Node.js)
```

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

#### Frontend Deployment (Vercel)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure Environment Variables in Vercel Dashboard**
   - `VITE_API_URL=https://your-backend-url.railway.app`

#### Backend Deployment (Railway)
1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

3. **Add Environment Variables in Railway Dashboard**
   - All variables from your `.env` file
   - Update `GOOGLE_CALLBACK_URL` to production URL

---

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend Deployment (Netlify)
1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `dist` folder to Netlify
   - Or connect GitHub repository

3. **Configure Environment Variables**
   - `VITE_API_URL=https://your-backend.onrender.com`

#### Backend Deployment (Render)
1. **Connect GitHub repository**
2. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

3. **Add Environment Variables**
   - All variables from your `.env` file

---

### Option 3: Full Stack on Railway

1. **Deploy Both Frontend and Backend**
   ```bash
   railway login
   railway init
   railway up
   ```

2. **Configure Build Settings**
   - Add `railway.json` configuration file

---

### Option 4: Heroku (Full Stack)

#### Prepare for Heroku
1. **Create Procfile**
   ```
   web: cd backend && npm start
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

---

## 🔧 Production Configuration

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend-url.com
```

### Backend Environment Variables
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pet_adoption
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend-url.com/api/auth/google/callback
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. **Create MongoDB Atlas Account**
2. **Create New Cluster**
3. **Get Connection String**
4. **Update MONGO_URI in production**

### Local MongoDB (Development Only)
- Not recommended for production
- Use MongoDB Atlas or other cloud providers

## 🔐 Security Checklist

- [ ] All sensitive data in environment variables
- [ ] CORS configured for production domains
- [ ] JWT secret is strong and unique
- [ ] Google OAuth redirect URLs updated
- [ ] Database connection secured
- [ ] HTTPS enabled on production

## 🚀 Quick Deploy Commands

### Option 1: Vercel + Railway
```bash
# Frontend
cd frontend && vercel --prod

# Backend
cd backend && railway up
```

### Option 2: Netlify + Render
```bash
# Frontend
cd frontend && npm run build
# Upload dist folder to Netlify

# Backend - connect GitHub to Render
```

## 📱 Post-Deployment

1. **Test all functionality**
   - User registration/login
   - Google OAuth
   - Pet browsing
   - Volunteer registration
   - Donation system

2. **Update URLs**
   - Frontend API calls
   - Google OAuth callbacks
   - CORS settings

3. **Monitor logs**
   - Check for any errors
   - Verify database connections

## 🆘 Troubleshooting

### Common Issues
- **CORS errors**: Update backend CORS settings
- **OAuth not working**: Check callback URLs
- **Database connection**: Verify MongoDB URI
- **Build failures**: Check Node.js versions

### Support
- Check deployment platform documentation
- Review application logs
- Test locally first

---

Choose the deployment option that best fits your needs. **Vercel + Railway** is recommended for beginners due to their excellent free tiers and easy setup.