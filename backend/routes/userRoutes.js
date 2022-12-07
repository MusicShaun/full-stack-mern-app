const express = require('express');
const  { registerUser , authUser, updateUserProfile}  = require('../controllers/userControllers');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleWare');

router
  .route('/')
  .post(registerUser);

router
  .route("/login")
  .post(authUser);

router
  .route('/profile')
  .post(protect, updateUserProfile)

module.exports = router

//* there isnt a user id route 
