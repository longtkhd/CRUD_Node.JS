const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require ('./config/database');
// const Task = require('./models/task.model.js');
// const User = require('./models/user.model');
const router = require('./Routers/api/user.router')
const taskrouter = require('./Routers/api/task.router')
app.use(router)
app.use(taskrouter)

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port,() => {
  console.log('sever is running on port ' + port);
})