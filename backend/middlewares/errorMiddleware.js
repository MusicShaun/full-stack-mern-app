const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.pathName}`);
  res.status(404);
  console.log({
    File: 'errorMiddleware',
    Message: 'error handling tripped. The url must be broken'
  })
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

module.exports = { notFound, errorHandler }