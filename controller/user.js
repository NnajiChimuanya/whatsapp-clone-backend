import user from "../model/userModel.js";
import passport from "passport";

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
      console.log(profile);
      done(null, profile);
    }
  )
);

// goole id : 550356332090-10i4vlf4ekc8bi0smgpogb76mnl9768i.apps.googleusercontent.com
//google secret : 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
