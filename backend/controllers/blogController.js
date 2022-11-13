
const asyncHandler = require('express-async-handler');
const Blogger = require('../models/blogPosts');
const User = require('../models/User');



const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blogger.find();
  console.log('getting blogs')
  res.json(blogs);
});



const blogEntry = asyncHandler(async(req, res) => {
  console.log('making a blog post')

  const {firstName, lastName, tag, tag2, header, body} = req.body;

  const newBlog = new Blogger({
    user: req.user._id,
    firstName,
    lastName,
    tag,
    tag2,
    header,
    body,
  });
  const createdBlog = await newBlog.save()
  res.status(201).json(createdBlog)
  console.log('create blog completed')
  
});



const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blogger.findById(req.params.id);

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).json({
      message: "Blog not found "
    })
  }
})



const updateBlog = asyncHandler(async (req,res) => {
  const { tag, tag2, header, body } = req.body;

  const blog = await Blogger.findById(req.params.id);

  console.log(req.user._id.toString())
  console.log(blog)

  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('you cant perform this action')
  }
  if (blog) {
    blog.tag = tag;
    blog.tag2 = tag2;
    blog.header = header; 
    blog.body = body; 

    const updatedBlog = await blog.save(); 
    res.json(updatedBlog)
  } else {
    throw new Error('blog not found')
  }
})

module.exports =  { blogEntry , getBlogs, getBlogById, updateBlog};