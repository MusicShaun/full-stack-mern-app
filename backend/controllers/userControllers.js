const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../util/generateToken');






exports.registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });
    console.log('registerUser reached')
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log('user is now registered')
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});





exports.authUser = asyncHandler(async (req, res) => {

  const { email , password  } = req.body;
  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))){
    console.log('authUser is matching password')
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
      profilePicture: user.profilePicture
    })
  } else {
    res.status(401)
    throw new Error('userController - Invalid email or password!')
  }
});




  

exports.updateUserProfile = asyncHandler(async (req, res) => {
    console.log('inside controller server')
    const user = await User.findById(req.user._id);
    const {password} = req.body;

    if (user && (await user.matchPassword(password))) {
      user.firstName = req.body.firstName ||  user.firstName;
      user.lastName = req.body.lastName ||  user.lastName;
      user.email = req.body.email ||  user.email;
      user.profilePicture = req.body.profilePicture || user.profilePicture;

      if (req.body.password) {
        user.password = req.body.password
      }
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture, 
        token: generateToken(updatedUser._id)
      })
      console.log('successful profile update')
    } else if (user && req.body.password === '') {
          user.profilePicture = req.body.profilePicture;
          const updatedUser = await user.save();

          res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture, 
            token: generateToken(updatedUser._id)
          })
          console.log(updatedUser)
          console.log('photo successfully updated')
    } else {
      res.status(404)
      throw new Error("User not found. Attempt failed")
    }
    
  })


