const asyncHandler = require('express-async-handler');
const ProfilePicture = require('../models/pictureModel');



exports.getPictures = asyncHandler(async (req, res) => {
  try {
    const pictures = await ProfilePicture.find();
    res.status(200).json({
      status: 'getPIctures success',
      data: {
        pictures
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'getPictures failure',
      message: err
    });
    console.log({ From: 'picturecontroller', Message: err.message })
  }
})



exports.createPicture = asyncHandler(async (req, res) => {

  try {
    const newPicture = await ProfilePicture.create({
      profilePicture: req.body.profilePicture,
      user: req.user.id
    });
    res
      .status(201)
      .json({
        status: 'createPIctures success',
        profilePicture: newPicture,
  
    })
  } catch (err) {
    res.status(404).json({
      status: 'createPIctures failure',
      message: err
    });
    console.log({ From: 'picturecontroller', Message: err.message })
  }
})




exports.deletePicture = asyncHandler(async (req, res) => {
  
  try {
    const newPicture = await ProfilePicture.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({
        status: 'delete success',
        data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'delete failure',
      message: err
    });
    console.log({ From: 'picturecontroller', Message: err.message })
  }
})





exports.updatePicture = asyncHandler(async (req, res) => {
  try {
    const newPicture = await ProfilePicture.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res
      .status(201)
      .json({
        status: 'updatepicture success',
        data: {
          profilePicture: newPicture
        }
    })
  } catch (err) {
    res.status(404).json({
      status: 'updatepicture failure',
      message: err
    });
    console.log({ From: 'picturecontroller', Message: err.message })
  }
})