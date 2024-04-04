import Joi from "joi";

const create = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(5).max(100),
  deadline: Joi.date().greater("now"),
}).required();

const id = Joi.object({
  id: Joi.string().required(),
}).required();

const updateTask = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(3).max(20),
  description: Joi.string().min(5).max(100),
  deadline: Joi.date().greater("now"),
}).required();

export { create, id, updateTask };
