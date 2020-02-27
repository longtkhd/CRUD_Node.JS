var express = require('express')

var router = express.Router()
// router.use('/user', require('./api/user.router'));
const userRoute = require('./api/user.router');
const taskRouter = require('./api/task.router');
router.use('/user', userRoute);
router.use('/task',taskRouter)


module.exports = router;