const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../util/generateToken');




const authUser = asyncHandler(async (req, res) => {
  console.log('authUser function started')

  const { email , password  } = req.body;
  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))){
    console.log('authUser is matching password')
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('userController - Invalid email or password!')
  }
});





const registerUser = asyncHandler(async (req, res)  => {
    //check email is not registered 
    console.log(req.body)
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user ) {
          //throw error for email exists already
          return res.status(400).json({ email: "A user has already registered this email"})
        } else {
          //otherwise create new user 
          const newUser = new User({
            _id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            token: generateToken(req.body._id)
          });
          newUser.save()
          return res.status(200).json({ msg: newUser})
          }
      });
  });






module.exports =  {registerUser, authUser} 