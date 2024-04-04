import Task from "../../DB/models/task.model.js";
import User from "../../DB/models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;

  let deadlineDate = new Date(req.body.deadline);

  await Task.create({ ...req.body, userID });

  console.log(deadlineDate.getDay());

  return res.json({ success: true, message: "Task added successfully" });
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const userID = req.user.id;

  const task = await Task.destroy({ where: { userID, id: taskId } });

  if (task === 0) return next(new Error("Task not found", { cause: 404 }));

  return res.json({ success: true, message: "Task delete successfully" });
});

const updateTask = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;
  const taskId = req.params.id;

  const task = await Task.findByPk(taskId);
  if (!task) return next(new Error("Task not found", { cause: 404 }));

  if (task.userID !== userID)
    return next(new Error("Your are not the owner", { cause: 403 }));

  task.title = req.body.title ? req.body.title : task.title;
  task.description = req.body.description ? req.body.title : task.description;
  task.isComplete = req.body.isComplete ? req.body.title : task.isComplete;
  task.deadline = req.body.deadline ? req.body.deadline : task.deadline;

  await task.save();

  return res.json({ success: true, message: "Task updated successfully" });
});

const getSpecificTask = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;
  const taskId = req.params.id;
  const task = await Task.findOne({
    where: { id: taskId },
    include: [{ model: User, attributes: ["username", "email"] }],
  });

  if (!task) return next(new Error("Task not found"));

  if (task.userID !== userID) return next(new Error("Your are noy the Owner"));

  return res.json({ success: true, result: { task } });
});

const getAllTask = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;
  const tasks = await Task.findAll({
    where: { userID },
    include: [{ model: User, attributes: ["username", "email"] }],
  });

  return res.json({ success: true, results: { tasks } });
});

const completedTask = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;
  const taskid = req.params.id;

  const task = await Task.findByPk(taskid);

  if (!task) return next(new Error("Task not found", { cause: 404 }));

  if (task.userID !== userID)
    return next(new Error("You are not the owner", { cause: 403 }));

  task.isComplete = true;

  await task.save();

  return res.json({ success: true, message: "Completed" });
});

export {
  completedTask,
  createTask,
  deleteTask,
  getAllTask,
  getSpecificTask,
  updateTask,
};
