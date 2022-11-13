const express = require('express');
const { getBlogs, blogEntry, getBlogById, updateBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleWare');
const router = express.Router();


router.route("/").get(getBlogs);
router.route("/create").post(protect, blogEntry);
router.route("/:id").get(getBlogById).put(protect, updateBlog);
//   .get()
//   .put()
//   .delete()


module.exports = router;