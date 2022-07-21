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
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile);
      data = profile;
    }
  )
);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

userRouter.get(
  "/auth/google/callback",
  cors(),
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data);
  }
);

export default userRouter;
