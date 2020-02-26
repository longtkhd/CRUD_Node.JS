const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require ('./config/database');
const Task = require('./models/task.model.js');
const User = require('./models/user.model');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const router = require('./Routers/api.router');
app.use(router);
app.get('/',(req,res) => {
  res.send('hello');
})

// app.post('/task',(req,res)=> {
//   const task = new Task(req.body);
//   task.save().then(() => {
//     res.status(201).send(task);

//   }).catch((err) => {
//     res.status(400).send(err);
//   })

// })

app.post('/task', async (req,res) => {
  const task = new Task(req.body);
  // console.log(req.body);
  try{
    await task.save();
    res.status(201).send(task); 
  }catch(e){
    res.status(400).send(e);

  }
})
app.get('/task', async (req,res) => {
    try{
      const tasks = await Task.find({});
      res.status(200).send(tasks);

    }catch(e){
      res.status(500).send(e);
    }
})

app.post('/user', async (req,res)  => {
  const user = new User(req.body);
  
  try{
    await user.save();
    res.status(201).send(user);

  }catch(e){
    res.status(400).send(e);

  }
})

app.get('/user', async (req,res) => {
  try{
    const users = await User.find({});
    res.status(200).send(users);
  }catch(e){
    res.status(500).send(e);

  }
})
app.get('/user/:id', async (req,res) => {
  const id = req.params.id;
  try{
    
    const user = await User.findById(id);
    if(!user){
      return  res.status(404).send();
    }
              res.send(user);
  }catch(e){
              res.status(500).send(e);
  }


})
//update
app.patch('/user/:id', async (req,res) => {
  const updates = Object.keys(req.body);
  const allowUpdate = ['fullName','email','phone','password'];
  const isUpdate = updates.every((update) => allowUpdate.includes(update));

  if(!isUpdate){
    return res.status(400).send({error : "invalid Update"});
  }
  const id = req.params.id;
  try{
    const user = await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    if(!user)
    {
      return res.status(404).send();
    }
    res.send(user);
    
  }catch(e){
    res.send(e);

  }
})

//delete
app.post('/user/:id', async (req,res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      res.status(404).send();
    }
      res.send(user);
  }catch(e){
      res.status(500).send(e);
  }
})



app.listen(port,() => {
  console.log('sever is running on port ' + port);
})