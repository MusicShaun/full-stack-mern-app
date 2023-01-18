class AppError extends Error {
  constructor(message, statusCode) {
    super(message)


    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? "Fail" : "Error"
    
    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports = AppError 

// The error object is this 
// class FancyError extends Error {
//   constructor(args){
//       super(args);
//       this.name = "FancyError"
//   }
// }

// console.log(new Error('A standard error'))
// // { [Error: A standard error] }

// console.log(new FancyError('An augmented error'))
// // { [Your fancy error: An augmented error] name: 'FancyError' }