const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// CATCH TYPE ERRORS
process.on('uncaughtException', err => { 
  console.log(err.name, err.message)
  console.log('UNCAUGHT EXCEPTION')
  process.exit(1)
})

dotenv.config()
const app = require('./app')


//CONNECT TO MONGO
mongoose
  .connect(process.env.MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() =>  console.log(`Mongo connected `))




const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => console.log(`server started on port ${PORT} . . . . . ..   ...    ....     ....      .....       ......`));



// CATCH REJECTIONS
process.on('unhandledRejection', err => { 
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION - Shutting Down')
  server.close(() => {
    process.exit(1) 
  })
})