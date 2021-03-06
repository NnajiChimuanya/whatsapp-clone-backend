import express from "express";

import passport from "passport";
import google from "passport-google-oauth20";
import cors from "cors";

const userRouter = express.Router();

const GoogleStrategy = google.Strategy;

let data;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "550356332090-10i4vlf4ekc8bi0smgpogb76mnl9768i.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        "https://wapp-clone-backend.herokuapp.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile);
      data = profile;
    }
  )
);

userRouter.get("/auth/success", (req, res) => {
  res.json({
    name: "Name",
  });
});

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "https://w-clone.vercel.app/",
  }),
  (req, res) => {
    res.json({ name: "Okayyyy" });
  }
);

userRouter.get("/login", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

export default userRouter;
