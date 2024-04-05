import Joi from "joi";

const signUp = Joi.object({
  username: Joi.string().max(20).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(5).max(20).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  gender: Joi.string().valid("male", "female"),
}).required();

const login = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(5).max(20).required(),
}).required();

const editAccount = Joi.object({
  username: Joi.string().max(20),
  email: Joi.string().email().max(100),
  password: Joi.string().min(5).max(20),
  gender: Joi.string().valid("male", "female"),
}).required();

export { editAccount, login, signUp };
