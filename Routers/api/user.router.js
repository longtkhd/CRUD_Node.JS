const express = require('express');
const User = require('../../models/user.model');
const router = express.Router();

router.post('/user', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);

  } catch (e) {
    res.status(400).send(e);

  }
})

router.get('/user', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);

  }
})
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }


})
//update
router.patch('/user/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdate = ['fullName', 'email', 'phone', 'password'];
  const isUpdate = updates.every((update) => allowUpdate.includes(update));

  if (!isUpdate) {
    return res.status(400).send({ error: "invalid Update" });
  }
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);

  } catch (e) {
    res.send(e);

  }
})

//delete
router.post('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
})




module.exports = router;