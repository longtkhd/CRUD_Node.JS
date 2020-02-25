const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fullName : {
    type: String,
    required : true
  },
  email : {
    type : String,
    required :  true
  },
  phone : {
    type : Number,
    required : true
  },
  password: {
    type: String,
    requierd: true
  }
})

module.exports = mongoose.model('User',User);
