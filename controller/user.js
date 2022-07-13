import user from "../model/userModel";

const registerUser = (req, res) => {
  res.json({ name: "New user" });
};

const loginUser = (req, res) => {
  res.json({ name: "login user" });
};

module.export = { registerUser, loginUser };
