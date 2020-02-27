const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
// const brcypt = require('brcypt');
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  fullName : {
    type: String,
    required : true,
    trim : true
  },
  email : {
    type : String,
    unique:true,
    required:true,
    
  },
  phone : {
    type : Number,
    
  },
  password: {
    type: String,
    
    
  }
})


//Hash password
UserSchema.pre('save',async function(next) {
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
})

UserSchema.methods.generateToken = async function () {
  const user = this
  const token = jwt.sign({ id: user._id.toString() }, "abc", { expiresIn: '1day' })
  user.token = token
  await user.save()
  return token
}
UserSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error()
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw new Error()
  }
  return user
}

// UserSchema.statics.findByCredentials = async(email,password) => {
//   const user = await User.findOne({ email });
//   if(!user)
//   {
//     throw new Error ('Unable to login');
    
//   }
//   const isMath = await bcrypt.compare(password, user.password);
//   if (!isMath) {
//     throw new Error('Unable to login');
//   }
//   return user
// }


const User = mongoose.model('User', UserSchema);
module.exports = User;
