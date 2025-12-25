#!/bin/bash

echo "🚀 Pet Haven Deployment Script"
echo "================================"

# Check if user wants to deploy frontend, backend, or both
echo "What would you like to deploy?"
echo "1) Frontend only (Vercel)"
echo "2) Backend only (Railway)"
echo "3) Both (Recommended)"
echo "4) Build frontend for manual deployment"

read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo "🎨 Deploying Frontend to Vercel..."
    cd frontend
    npm run build
    vercel --prod
    ;;
  2)
    echo "⚙️ Deploying Backend to Railway..."
    cd backend
    railway up
    ;;
  3)
    echo "🎨 Building Frontend..."
    cd frontend
    npm run build
    echo "✅ Frontend built successfully!"
    
    echo "🚀 Deploying Frontend to Vercel..."
    vercel --prod
    
    echo "⚙️ Deploying Backend to Railway..."
    cd ../backend
    railway up
    
    echo "✅ Deployment complete!"
    ;;
  4)
    echo "🎨 Building Frontend for manual deployment..."
    cd frontend
    npm run build
    echo "✅ Frontend built! Upload the 'dist' folder to your hosting provider."
    ;;
  *)
    echo "❌ Invalid choice. Please run the script again."
    ;;
esac

echo ""
echo "📋 Post-deployment checklist:"
echo "1. Update environment variables on hosting platforms"
echo "2. Test all functionality"
echo "3. Update Google OAuth callback URLs"
echo "4. Check CORS settings"
echo ""
echo "🎉 Happy deploying!"