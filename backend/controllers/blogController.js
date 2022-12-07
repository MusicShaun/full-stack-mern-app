const asyncHandler = require('express-async-handler');
const { db } = require('../models/blogPostsModel');
const Blogger = require('../models/blogPostsModel');




exports.getBlogs = asyncHandler(async (req, res) => {

  try {
    const blogs = await Blogger.find();
    res.status(200).json({
      status: 'getBlogs success',
      length: blogs.length,
        blogs
    })
  } catch (err) {
    res.status(404).json({
      status: 'getAllTours failure',
      message: err
    });
    console.log({ From: 'blogController', Message: err.message })
  }
});




exports.blogEntry = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blogger.create({
      user: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tag: req.body.tag,
      tag2: req.body.tag2,
      header: req.body.header,
      body: req.body.body,
      isDraft: req.body.isDraft
    });
    res
      .status(201)
      .json({
        status: 'blogentry success',
        data: {
          blogEntry: newBlog
        }
      })
  } catch (err) {
    res.status(404).json({
      status: 'blogentry failed',
      message: err
    });
    console.log({ From: 'blogController', Message: err.message })
  }
});






exports.getBlogById = asyncHandler(async (req, res) => {
  console.log('getblogbyid')
  try {
    const blog = await Blogger.find({"user": req.params.id});
    res 
      .status(201)
      .json({
        status: 'getblog by id success',
        blog: blog
      })
  } catch (err) {
    res.status(404).json({
      status: 'getblogbyid failed',
      message: err
    });
    console.log({ From: 'blogController', Message: err.message })
  }
})






exports.updateBlog = asyncHandler(async (req, res) => {
  console.log(req.params.id, req.body)
  try {
    const blog = await Blogger.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res
      .status(201)
      .json({
        status: 'update success',
        blog
      })
  } catch (err) {
    res.status(404).json({
      status: 'updateblog failed',
      message: err
    });
    console.log({ From: 'blogController', Message: err.message })
  }
})




exports.deleteBlog = asyncHandler(async (req, res) => {
  
  try {
    const note = await Blogger.findByIdAndDelete(req.params.id);
    res
    .status(201)
    .json({
      status: 'delete success',
      data: null
    })
  } catch (err) {
  res.status(404).json({
    status: 'delete failure',
    message: err
  });
  console.log({ From: 'picturecontroller', Message: err.message })
  }
})

