const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email ']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 8,
    select: false
  },
  profilePicture: {
    type: String,
    default: 'https://res.cloudinary.com/dyneqi48f/image/upload/v1670373250/a0laitzdonbitwdugfjk.jpg'
  },
  passwordChangedAt: Date,
},
{ strict: "throw" },
{
  timestamps: true,
  }
)



 

 //ENCRYPT PASSWORD
userSchema.pre('save', async function (next)  {
  if (!this.isModified('password')) return next() 

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})


 // CHECK PASSWORD
 userSchema.methods.correctPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}


//CHECK IF PASSWORD HAS CHANGED
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
    return JWTTimeStamp < changedTimeStamp
  }
  return false
}



const User = mongoose.model('User', userSchema);
 module.exports = User;