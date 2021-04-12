import express from 'express';
import * as userController from '../controller/user.controller';
import * as authController from '../controller/authController';

const userRouter = express.Router();

userRouter.use(authController.protectRoute);

userRouter
  .route('/me/groups/:groupId')
  .post(
    userController.appendGroup,
    userController.sendUpdatedUser)
  .delete(
    userController.removeGroup,
    userController.sendUpdatedUser)

userRouter.use(authController.restrictTo('admin'))

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

export default userRouter;
