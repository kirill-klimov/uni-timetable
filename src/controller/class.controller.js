import * as factory from '../utils/factory';
import Class from '../model/class.model';

export const getAllClasses = factory.getAll(Class);
export const createClass = factory.createOne(
  Class, 
  'name', 
  'lecturer',
  'room',
  'order',
  'subgroup',
  'group',
  'weekday',
  'week');
export const getClass = factory.getOne(Class);
export const updateClass = factory.updateOne(
  Class,
  'name', 
  'lecturer',
  'room',
  'order',
  'subgroup',
  'group',
  'weekday',
  'week');
export const deleteClass = factory.deleteOne(Class);