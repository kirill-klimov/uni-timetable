import User from '../model/user.model';
import AppError from '../utils/AppError';
import { asyncCatcher } from '../utils/asyncCatcher';
import * as factory from '../utils/factory';

export const getAllUsers = factory.getAll(User);
export const getUser = factory.getOne(User);
export const createUser = factory.createOne(User, 'name', 'password');
export const updateUser = factory.updateOne(User, 'name', 'password');
export const deleteUser = factory.deleteOne(User);

export const appendGroup = asyncCatcher(async (req, res, next) => {
  if (!req.user.savedGroups.includes(req.params.groupId))
    req.user.savedGroups = [...req.user.savedGroups, req.params.groupId];

  next();
});

export const removeGroup = asyncCatcher(async (req, res, next) => {
  req.user.savedGroups = req.user.savedGroups.filter(group => group._id.toString() !== req.params.groupId);

  next();
});

export const sendUpdatedUser = asyncCatcher(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.user, { new: true });

  return res.json({
    user: updatedUser
  });
});