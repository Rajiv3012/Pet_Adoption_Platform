import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.get(
  "/google",
  (req, res, next) => {
    const authOptions = { 
      scope: ["profile", "email"],
      accessType: 'offline',
      prompt: req.query.prompt || 'select_account'
    };
    
    passport.authenticate("google", authOptions)(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const profile = req.user;
      
      // Check if user exists
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // Create new user from Google data
        user = await User.create({
          name: profile.displayName || profile.emails[0].value.split('@')[0],
          email: profile.emails[0].value,
          password: await bcrypt.hash(Math.random().toString(36), 10), // Random password for Google users
          googleId: profile.id,
          profilePicture: profile.photos[0]?.value
        });
      } else if (!user.googleId) {
        // Link Google account to existing user
        user.googleId = profile.id;
        user.profilePicture = profile.photos[0]?.value || user.profilePicture;
        await user.save();
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Redirect to frontend with token and user data
      const userData = encodeURIComponent(JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }));

      res.redirect(`http://localhost:5174/auth/callback?token=${token}&user=${userData}`);
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      res.redirect("http://localhost:5174/login?error=oauth_failed");
    }
  }
);

export default router;