const ash = require('express-async-handler');
const User = require('../models/UserModel');
const AppError = require('../util/AppError')
const factory = require('./handlerFactory')

exports.getUsers = ash(async (req, res, next) => {
  if (process.env.NODE_ENV == 'development'){
    const users = await User.find()
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {users}
    })
  } else {
    return next(new AppError('You dont have permission to access this page', 401))
  }
})

exports.getUser = factory.getOne(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)
exports.uploadUserPicture = factory.updateOne(User)

exports.getUserPicture = ash(async (req, res, next) => {
  const doc = await User.findById(req.params.id)
  if (!doc) return next(new AppError('No document found with that ID', 404))

  res.status(200).json({
    status: 'success',
    data: doc.profilePicture
  })
})


