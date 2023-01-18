const notFound = (req, res, next) => {
  
  const error = new Error(`Not found - ${req.path}`);
  res.status(404);
  console.log({
    File: 'errorMiddleware',
    Message: `${req.path} does not match any route`
  })
  next(error);
};

const errorHandler = (err, req, res, next) => {

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "Not available in production mode" : err.stack,
  });
}

module.exports = { notFound, errorHandler }