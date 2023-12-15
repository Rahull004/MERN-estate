import express from 'express'
import dotenv from 'dotenv'
import connectdb from './config/dbConnection.js';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
dotenv.config();

// mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
//      console.log("Connected to mongodb")
// }).catch((err) => {
//      console.log(err)
// })
connectdb();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

// app.use((err, req, res, next) => {
//      const statusCode = err.statusCode || 500;
//      const message = err.message || 'Internal Server Error';

//      return res.status(statusCode).json({
//           success: false,
//           statusCode,
//           message
//      });
// })
app.use(errorHandler);


app.listen(3000, () => {
     console.log("Server is running on port 3000!");
})