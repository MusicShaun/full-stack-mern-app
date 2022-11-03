const express = require('express');
const { getBlogs } = require('../controllers/blogController');
const router = express.Router();

router.route("/").get(getBlogs);
// router.route("/create").post();
// router.route("/:id")
//   .get()
//   .put()
//   .delete()


module.exports = router;