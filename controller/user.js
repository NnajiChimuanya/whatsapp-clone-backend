import user from "../model/userModel.js";

export const registerUser = (req, res) => {
  res.json({ name: "New user" });
};

export const loginUser = (req, res) => {
  res.json({ name: "login user" });
};
