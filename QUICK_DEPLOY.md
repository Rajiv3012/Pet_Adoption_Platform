# 🚀 Quick Deploy Guide

## 🎯 Fastest Deployment (Recommended)

### Step 1: Install CLI Tools
```bash
# Install Vercel CLI (for frontend)
npm i -g vercel

# Install Railway CLI (for backend)
npm install -g @railway/cli
```

### Step 2: Deploy Backend First
```bash
cd backend
railway login
railway init
railway up
```
**📝 Note:** Copy the Railway URL (e.g., `https://your-app.railway.app`)

### Step 3: Update Frontend Environment
```bash
cd ../frontend
# Create .env.production file with:
echo "VITE_API_URL=https://your-app.railway.app" > .env.production
```

### Step 4: Deploy Frontend
```bash
npm run build
vercel --prod
```

### Step 5: Configure Environment Variables

#### Railway (Backend):
Add these in Railway dashboard:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Strong secret key
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth secret
- `GOOGLE_CALLBACK_URL`: `https://your-backend.railway.app/api/auth/google/callback`

#### Vercel (Frontend):
Add in Vercel dashboard:
- `VITE_API_URL`: Your Railway backend URL

## 🎉 That's it!

Your Pet Haven platform is now live! 

### 📱 Test Your Deployment:
1. Visit your Vercel URL
2. Try user registration
3. Test Google OAuth
4. Browse pets
5. Test volunteer registration

## 🆘 Need Help?

### Common Issues:
- **CORS Error**: Update backend CORS settings for your frontend domain
- **OAuth Not Working**: Update Google Console with new callback URLs
- **Database Connection**: Check MongoDB Atlas connection string

### Quick Fixes:
```bash
# Redeploy backend
cd backend && railway up

# Redeploy frontend
cd frontend && vercel --prod
```

## 🔧 Alternative: One-Click Deploy

Use the deployment scripts:
```bash
# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```

---

**🎊 Congratulations! Your Pet Adoption Platform is now live and ready to help pets find their forever homes!**