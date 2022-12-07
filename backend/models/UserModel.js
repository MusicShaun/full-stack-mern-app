 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs')

 const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String ,
      required: true,
      unique: true,
    }, 
    lastName: {
      type: String ,
      required: true,
      unique: true,
    }, 
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
 );

 //ENCRYOPT PASS WORD
 userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

 userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 })



 const User = mongoose.model('User', userSchema);

 module.exports = User;