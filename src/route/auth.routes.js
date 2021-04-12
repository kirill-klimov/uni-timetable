import express from 'express';
import * as authController from '../controller/authController';

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;