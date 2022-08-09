import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import google from "passport-google-oauth20";
import cors from "cors";
import user from "../model/userModel";

const userRouter = express.Router();

const GoogleStrategy = google.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "550356332090-10i4vlf4ekc8bi0smgpogb76mnl9768i.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      let name = profile.displayName;
      let email = profile._json.picture;

      //console.log(profile);
      done(null, profile);
    }
  )
);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

userRouter.get("/login", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

export default userRouter;
