const express = require("express");
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const globalErrorHandler = require('./controllers/errorController')
const app = express();
const path = require("path");
const morgan = require('morgan');


// CONFIGURING 
const allowedOrigins = '*';
const options = { origin: allowedOrigins }
app.use(cors(options));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) //* morgan displays each request in the console
}


// DEPLOYMENT 
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })

} else {
  app.get('/', (req, res) => {
    res.send("API is running.")
  })
}


// ROUTES 
app.use('/api/users', userRoutes)
app.use('/api/bloggers', blogRoutes)




// MIDDLEWARES 
app.use(globalErrorHandler)
app.use(notFound)
app.use(errorHandler)




// FINAL GLOBAL CATCHES 
app.all('*', (req, res, next) => { 
  next(new AppError(`Where the hell are you taking me? Wtf is ${req.originalUrl}`, 404)) 
})


module.exports = app