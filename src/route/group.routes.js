import express from 'express';
import * as groupController from '../controller/group.controller';
import * as authController from '../controller/authController';

const groupRouter = express.Router();

groupRouter
  .route('/')
  .get(groupController.getAllGroups)
  .post(
    authController.protectRoute, 
    authController.restrictTo('editor'), 
    groupController.createGroup)

groupRouter
  .route('/search')
  .get(groupController.searchGroups)

groupRouter
  .route('/:id')
  .get(groupController.getGroup)
  .patch(
    authController.protectRoute, 
    authController.restrictTo('editor'), 
    groupController.updateGroup)
  .delete(
    authController.protectRoute, 
    authController.restrictTo('editor'), 
    groupController.deleteGroup)

groupRouter
  .route('/:groupId/classes')
  .get(groupController.getGroupClasses)

export default groupRouter;