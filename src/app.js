import express from 'express';
import morgan from 'morgan';
// import cors from 'cors';
import path from 'path';
import groupRouter from './route/group.routes';
import classRouter from './route/class.routes';
import userRouter from './route/user.routes';
import authRouter from './route/auth.routes'
import globalErrorHandler from './utils/errorHandler';

const app = express();

// middleware
app.use(express.json());
app.use(morgan('tiny'));
// app.use(cors());

// routes
app.use('/api/groups', groupRouter);
app.use('/api/classes', classRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// dev 
// app.use(express.static(path.join(__dirname, '../client/build')));
// prod
app.use(express.static(path.join(__dirname, '/client/build')));

// dev
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
// prod
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.html')));

app.use(globalErrorHandler);

export default app;