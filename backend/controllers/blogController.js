
const asyncHandler = require('express-async-handler');
const Blogger = require('../models/blogPosts');



const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blogger.find();
  console.log('getting blogs')
  res.json(blogs);
});





const blogEntry = asyncHandler(async(req, res) => {
  console.log('making a blog post')

  const {firstName, lastName, tag, tag2, header, body} = req.body;

  const newBlog = new Blogger({
    firstName,
    lastName,
    tag,
    tag2,
    header,
    body,
  });
  const createdBlog = await newBlog.save()
  res.status(201).json(createdBlog)
  
});

module.exports =  { blogEntry , getBlogs};