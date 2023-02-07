const { promisify } = require('util')
const User = require('../models/UserModel')
const ash = require('express-async-handler');
const jwt = require('jsonwebtoken')
const AppError = require('../util/AppError')


const signToken = (id) => {
  return jwt.sign(
    { id: id },
    process.env.JWT_SECRET,
    { //expiresIn omitted because herokku is a piece of shit 
  })
}

exports.signup = ash(async (req, res) => {
  const { firstName, lastName, email, password, passwordChangedAt } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      passwordChangedAt,
    })
  const token = signToken(newUser._id)
    res.status(200).json({
      status: 'success',
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      id: newUser._id,
      email: newUser.email,
      token
    })

})


exports.login = ash(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return next(new AppError('Please provide email and password', 400))

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }
  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id,
    email: user.email,
    token,
    profilePicture: user.profilePicture
  })
})



exports.protect = ash(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }  
  if (!token) return next(new AppError('You need to login', 401))

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  const currentUser = await User.findById(decoded.id)

  if (!currentUser) return next(new AppError('The user belonging to this token no longer exists', 401))

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('password has changed', 401))
  } 
    
  req.user = currentUser
  next()
})
