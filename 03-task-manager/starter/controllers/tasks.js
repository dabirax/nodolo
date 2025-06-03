const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/customErrors");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // const error = new Error("Not Found");
    // error.status = 404;
    // return next(error);

    // return res.status(404).json({ msg: `There is no task with Id: ${taskID}` });

    return next(createCustomError(`There is no task with Id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    // return res.status(404).json({
    //   msg: `There is no task with ID: ${taskID} available editting`,
    // });

    return next(createCustomError(`There is no task with Id: ${taskID}`, 404));

  }

  res.status(200).json({ task });
});

const deleteTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    // res.status(404).json({ msg: `There is no task with ID: ${taskID}` });

    return next(createCustomError(`There is no task with Id: ${taskID}`, 404));

  }

  //to show the current list of items in the "table", document actually
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTasks,
};
