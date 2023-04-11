import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import { errorHandler } from './middlewares/error-middleware';
import { PLATFORM_NAME } from './utils/globals';
import logger from 'morgan';
import path from 'path';

import { sequelize } from './config/db';
// @ts-ignore
global.PLATFORM_NAME = PLATFORM_NAME;
const app = express();

app.use(cookieParser());
const whitelist = ["http://localhost:3000","http://localhost:3001", /\.pointsyncc\.com$/];
app.use(cookieParser());
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
} as CorsOptions;
if(process.env.NODE_ENV==='production'){
  corsOptions.credentials=true;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ASSOCIATIONS
import './utils/associations';
app.use('/media', express.static(path.join(__dirname, 'media')));
//Error Handler
app.use(errorHandler);

// Routes
import authRoutes from './routes/auth';
import jobRoutes from './routes/job';
app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/job', jobRoutes);

const port = process.env.PORT;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);
try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port);
    console.log('listening to port ', port);
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default app;
