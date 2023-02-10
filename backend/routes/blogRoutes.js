const express = require('express');
const { getBlogs, blogEntry, getBlogsByUserId, updateBlog, deleteBlog, getBlogStats } = require('../controllers/blogController');
const { protect } = require('../controllers/authController')
const router = express.Router();


router
  .route('/tour-stats')
  .get(getBlogStats)

router
  .route('/')
  .get(getBlogs)
  .post(protect, blogEntry)

router
  .route("/:id")
  .get(getBlogsByUserId)
  .delete(deleteBlog)
  .put(protect, updateBlog)


module.exports = router;
