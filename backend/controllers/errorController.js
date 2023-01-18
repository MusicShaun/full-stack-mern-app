const AppError = require('../util/AppError')


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  
  console.log(err)

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err }

    if (err.message === 'Not authorized, token failed') error = handleInvalidToken(error)
    if (err.name === 'CastError') error = handleCastResponse(error)
    if (err.message.startsWith('StrictMode')) error = handleIncorrectFieldEntry(error)
    // if (err.message.includes('validation failed')) error = handleMissingField(error)
    if (err.toString().includes('delete')) error = handleDeletedItemFail(error)
    if (err.toString().includes('shorter than the minimum')) error = handlePasswordTooShort(error)

    sendErrorProduction(error, res)

  } else {
    sendErrorDevelopment(err, res)
  }
}

const sendErrorProduction = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}
const handleInvalidToken = () => {
  const message = `Invalid token. Must amend before continuing`
  return new AppError(message, 500)
}
const handleCastResponse = (err) => {
  const message =  `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 404)
}
const handleIncorrectFieldEntry = (err) => {
  const message = `You have entered a field incorrectly`
  return new AppError(message, 404)
}
const handleDeletedItemFail = (err) => {
  const message = `Couldn't find item to delete`
  return new AppError(message, 404)
}
const handleMissingField = (err) => {
  const message = `You are missing the ${Object.keys(err.errors)[0]} field`
  return new AppError(message, 500)
}
const handlePasswordTooShort = (err) => {
  const message = `Your password must be at least 8 characters'`
  return new AppError(message, 500)
}

const sendErrorDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}