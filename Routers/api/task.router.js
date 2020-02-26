const express = require('express');
const router = express.Router();
const Task = require('../../models/task.model');
router.post('/task', async (req, res) => {
  const task = new Task(req.body);
  console.log(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);

  }
})
router.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);

  } catch (e) {
    res.status(500).send(e);
  }
})


module.exports = router;