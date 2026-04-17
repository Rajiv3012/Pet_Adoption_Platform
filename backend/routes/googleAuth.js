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

router.get("/google/callback", (req, res, next) => {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    return res.status(500).json({ msg: "FRONTEND_URL is not configured" });
  }

  passport.authenticate("google", { session: false }, async (err, profile) => {
    if (err || !profile) {
      const reason = encodeURIComponent(err?.message || "oauth_callback_failed");
      return res.redirect(`${frontendUrl}/login?error=${reason}`);
    }

    try {
      // Check if user exists
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // Create new user from Google data
        user = await User.create({
          name: profile.displayName || profile.emails[0].value.split("@")[0],
          email: profile.emails[0].value,
          password: await bcrypt.hash(Math.random().toString(36), 10),
          googleId: profile.id,
          profilePicture: profile.photos[0]?.value,
        });
      } else if (!user.googleId) {
        // Link Google account to existing user
        user.googleId = profile.id;
        user.profilePicture = profile.photos[0]?.value || user.profilePicture;
        await user.save();
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const userData = encodeURIComponent(
        JSON.stringify({
          id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
        })
      );

      return res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${userData}`);
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      return res.redirect(`${frontendUrl}/login?error=oauth_failed`);
    }
  })(req, res, next);
});

export default router;