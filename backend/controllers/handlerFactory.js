const ash = require('express-async-handler')
const AppError = require('../util/AppError')


exports.updateOne = (Model) => 
  ash(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      // runValidators: true
    })
    if (!data) return next(new AppError('No document found with that ID', 404))

    res.status(200).json({
      status: 'success',
      data 
    })
  })

exports.getOne = (Model) =>
  ash(async (req, res, next) => {
    const data = await Model.findById(req.params.id)
    if (!data) return next(new AppError('No document found with that ID', 404))

    res.status(200).json({
      status: 'success',
      data 
    })
  })



exports.deleteOne = (Model) =>
  ash(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id)
    if (!data) return next(new AppError('No document found with that ID', 404))

    res.status(204).json({
      status: 'deleted successfully',
      data: null
    })
    })


exports.getAll = (Model) =>
ash(async (req, res, next) => {
  const data = await Model.find()
  if (!data) return next(new AppError('No document found with that ID', 404))

  res.status(200).json({
    status: 'success',
    results: data.length,
     data 
  })
})



