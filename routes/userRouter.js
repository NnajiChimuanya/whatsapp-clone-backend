import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import google from "passport-google-oauth20";
import cors from "cors";
import User from "../model/userModel.js";

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
    async (accessToken, refreshToken, profile, done) => {
      let name = profile.displayName;
      let image = profile._json.picture;

      User.findOne({ name }, (err, data) => {
        if (err) throw err;
        if (data === null) {
          try {
            let newUser = new User({ name, image });
            newUser.save((err, data) => {
              console.log(data);
            });

            done(null, profile);
          } catch (error) {
            console.log(error);
          }
          done(null, profile);
        } else {
          console.log(data);
          done(null, profile);
        }
      });
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
