const express = require('express');
const { getBlogs, blogEntry, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleWare');
const router = express.Router();


router
  .route('/')
  .get(getBlogs)
  .post(protect, blogEntry); // put protect back in when finished with making stydfrsdf

router
  .route("/:id")
  .get(getBlogById)
  .delete(deleteBlog)
  .patch(updateBlog); // does this one need protect as well?


module.exports = router;