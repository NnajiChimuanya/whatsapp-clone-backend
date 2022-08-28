import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;

// {
//   clientID:
//     "550356332090-10i4vlf4ekc8bi0smgpogb76mnl9768i.apps.googleusercontent.com",
//   clientSecret: "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",
//   callbackURL: "http://localhost:3001/auth/google/callback",
// },
