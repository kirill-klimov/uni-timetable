import jwt from 'jsonwebtoken';
import { asyncCatcher } from '../utils/asyncCatcher';
import { filterObject } from '../utils/utils';
import User from '../model/user.model';
import AppError from '../utils/AppError';

const generateToken = (id) => jwt.sign({ id }, process.env.TOKEN_SECRET, {
  expiresIn: '90d'
});

export const protectRoute = asyncCatcher(async (req, res, next) => {  
  let token = '';
  const authHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie;

  if (authHeader && authHeader.startsWith('Bearer'))
    token = authHeader.split(' ')[1];
  else if (cookieHeader && cookieHeader.startsWith('token'))
    token = cookieHeader.split('=')[1];
  else
    return next(new AppError('Unauthorized', 401));
  
  const { id, iat, exp } = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findById(id);
  req.user = user;
  req.user.savedGroups = Array.from(req.user.savedGroups);
  next();
})

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      next(new AppError('Доступ запрещен', 403));
    } else {
      next();
    }
  }
}

const createAndSendToken = (user, res) => {
  user = {
    _id: user._id,
    name: user.name,
    savedGroups: user.savedGroups,
    role: user.role
  }

  const token = generateToken(user._id);

  const options = { 
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }

  res.cookie('token', token, options);

  return res.json({
    token,
    user
  });
}

export const signup = asyncCatcher(async (req, res, next) => {
  const user = await User.create(filterObject(req.body, ['name', 'password']));

  createAndSendToken(user, res);
})

export const login = asyncCatcher(async (req, res, next) => {
  const user = await User.findOne({ name: req.body.name }).select('+password').populate({
    path: "groups"
  });

  if (!user)
    return next(new AppError('Пользователь не существует', 404));

  const passwordComparison = await user.comparePasswordsAsync(req.body.password.trim());
  if (!passwordComparison)
    return next(new AppError('Неверный пароль', 403));
  
  createAndSendToken(user, res);
});

export const logout = (req, res, next) => {
  res.cookie('token', '', { httpOnly: true });
  res.status(200).send();
}