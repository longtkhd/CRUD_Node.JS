const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const UserController = require('../../controllers/user.controller')

router.post('/add', UserController.AddUser);
router.get('/get', UserController.GetUser);
router.get('/get/:id', UserController.GetUserId);
router.patch('/update/:id',UserController.UpdateUser);
router.post('/delete/:id', UserController.DeleteUser);


// router.post('/login',async (req,res) => {
//   try{
//     const user = await User.findByCredentials(req.body.email,req.body.password);
//     res.send(user);
    

//   }catch(e){
//     res.status(400).send();
//   }
// })

module.exports = router;