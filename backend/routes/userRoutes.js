const express = require('express')
const router = express.Router()
const { updateUser, getUser, getUsers, deleteUser, getUserPicture, uploadUserPicture}  = require('../controllers/userControllers')
const { signup, login, protect } = require('../controllers/authController')


router.post('/signup', signup)

router.post('/login', login)

router.route('/').get(protect, getUsers)

router
  .route('/:id')
  .get(protect, getUser) 
  .patch(protect, updateUser)
  .delete(deleteUser);

router
  .route('/picture/:id')
  .get(protect, getUserPicture)

  

module.exports = router

