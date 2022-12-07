const express = require('express');
const { getPictures, createPicture, deletePicture, updatePicture } = require('../controllers/pictureController');
const { protect } = require('../middlewares/authMiddleWare');

const router = express.Router();


router
  .route("/")
  .get(getPictures)
  .post(protect, createPicture);

router
  .route("/:id")
  .delete(deletePicture)
  .patch(updatePicture); 


module.exports = router;