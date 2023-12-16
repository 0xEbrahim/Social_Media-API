import 'dotenv/config';
import express from 'express';
import authRouter from '../routes/authRoute.js';
import morgan from 'morgan';
import '../config/db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1', authRouter);

export default app;
