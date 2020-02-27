const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const UserController = require('../../controllers/user.controller')
const admauth = require('../../common/auth');
const auth = admauth.auth;

router.post('/add',auth, UserController.AddUser);
router.get('/get', UserController.GetUser);
router.get('/get/:id', UserController.GetUserId);
router.patch('/update/:id',UserController.UpdateUser);
router.post('/delete/:id',auth, UserController.DeleteUser);
router.post('/login',UserController.Login);




module.exports = router;