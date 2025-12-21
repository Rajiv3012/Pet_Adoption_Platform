# Pet Haven - Pet Adoption Platform 🐾

A comprehensive pet adoption platform built with React, Node.js, and MongoDB. Features include pet browsing, user authentication, volunteer registration, and donation system.

## 🚀 Features

- **Pet Management**: Browse, search, and adopt pets
- **User Authentication**: Manual registration and Google OAuth integration
- **Volunteer System**: Interactive map-based volunteer registration
- **Donation Platform**: Integrated payment system (demo mode)
- **Admin Panel**: Manage pets, users, and adoption requests
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Leaflet for interactive maps
- Axios for API calls

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Passport.js for Google OAuth
- Multer for file uploads

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- Google Cloud Console account (for OAuth)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pet-adoption-platform.git
   cd pet-adoption-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env if needed
   npm run dev
   ```

4. **Environment Configuration**
   - See `SETUP_INSTRUCTIONS.md` for detailed configuration steps
   - Configure Google OAuth credentials
   - Set up MongoDB connection

## 🌐 Usage

1. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000

2. **Default Admin Access**
   - Email: admin@pethaven.com
   - Password: admin123

## 📁 Project Structure

```
pet-adoption-platform/
├── backend/
│   ├── config/          # Database and passport configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── services/        # Business logic services
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       └── utils/       # Utility functions
└── docs/               # Documentation files
```

## 🔧 Configuration

### Google OAuth Setup
1. Create project in Google Cloud Console
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:5000/api/auth/google/callback`

### Payment Integration
- Currently configured in demo mode
- Simulates payment flow without actual transactions
- For production, configure with real Razorpay credentials

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons from Lucide React
- Maps powered by Leaflet and OpenStreetMap
- UI components styled with Tailwind CSS