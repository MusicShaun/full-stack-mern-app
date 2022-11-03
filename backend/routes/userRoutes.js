const express = require('express');
const  { registerUser , authUser}  = require('../controllers/userControllers');
const { blogEntry } = require('../controllers/blogController');
const router = express.Router();

router.route('/').post(registerUser);
router.post("/login", authUser);
router.post('/blogposts', blogEntry);

module.exports = router


