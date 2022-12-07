const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema(
 {
  profilePicture: {
    type: String, 
    required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },

);



const ProfilePicture = mongoose.model('ProfilePicture', pictureSchema);

module.exports = ProfilePicture;