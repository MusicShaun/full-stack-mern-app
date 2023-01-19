const ash = require('express-async-handler');
require('express-async-errors')
const Blogger = require('../models/blogPostsModel');
const factory = require('../controllers/handlerFactory')




exports.blogEntry = ash(async (req, res) => {
  const data = await Blogger.create({
    user: req.user.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tag: req.body.tag,
    tag2: req.body.tag2,
    header: req.body.header,
    body: req.body.body,
    isDraft: req.body.isDraft
  });

  res.status(201).json({
      status: 'blogentry success',
      data
    })
});

exports.getBlogs = factory.getAll(Blogger)
exports.updateBlog = factory.updateOne(Blogger)
exports.deleteBlog = factory.deleteOne(Blogger)


exports.getBlogsByUserId = ash(async (req, res, next) => {
    const data = await Blogger.find({ "user": req.params.id })
  if (!data) return next(new AppError('No document found with that ID', 404))

  res.status(200).json({
      status: 'success',
      data
    })
  })



exports.getBlogStats = ash(async (req, res) => {
  const stats = await Blogger.aggregate([
    {
      $group: {
        _id: { $month: '$createdAt' },
        numberOfNewAccounts: { $sum: 1},
        averageBodyLength: { '$avg': { $strLenCP: '$body' } },
        averageHeaderLength: { '$avg': { $strLenCP: '$header' } },
      },
    },

  ])
  res.status(200).json({
    status: 'Stats reached',
    results: stats.length,
    data: { stats } 
  })
})