const express = require('express');
const  { registerUser , authUser, updateUserProfile}  = require('../controllers/userControllers');
const { blogEntry } = require('../controllers/blogController');
const router = express.Router();

router.route('/').post(registerUser);
router.post("/login", authUser);
router.post('/blogposts', blogEntry);
router.route('/profile').post(updateUserProfile)
// router.route("/profile").post(protect, updateUserProfile);

module.exports = router


// BRING IN PROTECT WOTJ AUTHMIDDLEWARE