 const mongoose = require('mongoose');

 const blogSchema = mongoose.Schema(
  {
    firstName: {
      type: String ,
      required: true,
    }, 
    lastName: {
      type: String ,
      required: true,
    }, 
    tag: {
      type: String,
      required: true,
    },
    tag2: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isDraft: {
      type: Boolean, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
 );



 const Blogger = mongoose.model('Blogger', blogSchema);

 module.exports = Blogger;