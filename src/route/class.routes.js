import express from 'express';
import * as classController from '../controller/class.controller';
import * as authController from '../controller/authController';

const classRouter = express.Router();

classRouter.use(
  authController.protectRoute,
  authController.restrictTo('editor')
);

classRouter
  .route('/')
  .get(classController.getAllClasses)
  .post(classController.createClass)

classRouter
  .route('/:id')
  .get(classController.getClass)
  .patch(classController.updateClass)
  .delete(classController.deleteClass)
  

export default classRouter;