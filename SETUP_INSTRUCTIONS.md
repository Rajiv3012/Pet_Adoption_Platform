# Pet Haven - Setup Instructions

## Environment Setup

### 1. Backend Configuration
1. Copy `backend/.env.example` to `backend/.env`
2. Update the following variables with your actual values:
   - `JWT_SECRET`: Generate a secure random string
   - `GOOGLE_CLIENT_ID`: Get from Google Cloud Console
   - `GOOGLE_CLIENT_SECRET`: Get from Google Cloud Console
   - `RAZORPAY_KEY_ID`: Get from Razorpay Dashboard (for production)
   - `RAZORPAY_KEY_SECRET`: Get from Razorpay Dashboard (for production)

### 2. Frontend Configuration
1. Copy `frontend/.env.example` to `frontend/.env`
2. Update `VITE_API_URL` if your backend runs on a different port

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

### 4. Database Setup
- MongoDB should be running on `mongodb://127.0.0.1:27017/pet_adoption`
- The application will create the database automatically

### 5. Installation & Running
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run backend (from backend directory)
npm start

# Run frontend (from frontend directory)
npm run dev
```

## Features
- Pet adoption platform
- User authentication (manual + Google OAuth)
- Volunteer registration with interactive map
- Donation system with Razorpay integration (demo mode)
- Admin panel for pet management
- Responsive design with Tailwind CSS