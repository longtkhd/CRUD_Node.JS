const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Task = new Schema({
  description: {
    type: String,
    trim:true
  },
  completed: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('Task', Task);

// const Task = mongoose.model('Task',{
//   description: {
//     type: String,
   
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// })

// module.exports = Task;
