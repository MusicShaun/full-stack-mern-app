const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// CATCH TYPE ERRORS
process.on('uncaughtException', err => { 
  console.log(err.name, err.message)
  console.log('UNCAUGHT EXCEPTION')
  process.exit(1)
})


const app = require('./app')
dotenv.config()

//CONNECT TO MONGO
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`Mongo connected : ${conn.connection.host}`)
  } catch (error){
    console.log(error.message);
    process.exit();
  }
}
connectDB()


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