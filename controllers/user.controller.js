const User = require('../models/user.model');
const validator = require('validator')
const bcrypt = require('bcrypt');


exports.AddUser = async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);

  try {
    await user.save();
    res.status(201).send(user);

  } catch (e) {
    res.status(400).send(e);

  }
}

exports.GetUser =  async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);

  }
}

exports.GetUserId =  async (req, res) => {
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
}

exports.UpdateUser =  async (req, res) => {

  // const isUpdate = updates.every((update) => allowUpdate.includes(update));
  // const id = req.params.id;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    const updates = ['fullName', 'email', 'phone', 'password'];
    updates.forEach((name) => {
      user[name] = req.body[name] || user[name];
    })
    await user.save();
    // user.fullName = req.body.fullName;
    // const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json({ user })

  } catch (e) {
    res.send(e);

  }
}

exports.DeleteUser =  async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
}

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.login(email, password)

    const token = await user.generateToken()
    return res.status(200).json({ token, user })
  } catch (e) {
    res.status(400).send()
  }
}
