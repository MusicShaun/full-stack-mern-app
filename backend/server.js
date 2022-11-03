const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const path = require("path");
const app = express();
dotenv.config();
connectDB();

const allowedOrigins = '*'
// [
  
//   'http://localhost:80',
//   'https://starlit-chebakia-3aae3a.netlify.app/'];
const options = {
  origin: allowedOrigins
}
app.use(cors(options));
app.use(express.json());


app.use('/api/users', userRoutes)
app.use('/api/bloggers', blogRoutes)



// --------------- deployment ------------
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


// --------------- deployment ------------



app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));
