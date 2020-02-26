const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fullName : {
    type: String,
    required : true
  },
  email : {
    type : String,
   
  },
  // phone : {
  //   type : Number,
    
  // },
  password: {
    type: String,
    
  }
})

module.exports = mongoose.model('User',User);
