import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../../../DB/models/token.model.js";
import User from "../../../DB/models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createAccount = asyncHandler(async (req, res, next) => {
  const userExists = await User.findOne({ where: { email: req.body.email } });

  if (userExists) return next(new Error("Email is already exists"));

  User.create({ ...req.body });

  return res.json({ success: true, message: "User created successfully!" });
});

const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!(user && bcryptjs.compareSync(req.body.password, user.password)))
    return next(new Error("Email / password incorrect", { cause: 404 }));

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_TOKEN
  );

  await Token.create({
    token: token,
    userAgent: req.headers["user-agent"],
    userId: user.id,
  });

  return res.json({ success: true, token });
});

const editAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user) return next(new Error("User not found"));

  user.username = req.body.username ? req.body.username : user.username;
  user.email = req.body.email ? req.body.email : user.email;
  user.password = req.body.password ? req.body.password : user.password;
  user.gender = req.body.gender ? req.body.usernamgendere : user.gender;
  await Token.update({ isValid: false }, { where: { userId: req.user.id } });
  await user.save();
  return res.json({ success: true, message: "User updated successfully" });
});

const deleteAccount = asyncHandler(async (req, res, next) => {
  const user = await User.destroy({ where: { id: req.user.id } });

  if (user === 0) return next(new Error("User not found"));

  return res.json({ success: true, message: "user deleted successfully" });
});
export { createAccount, deleteAccount, editAccount, login };
