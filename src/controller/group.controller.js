import Group from '../model/group.model';
import Class from '../model/class.model';
import { asyncCatcher } from '../utils/asyncCatcher';
import * as factory from '../utils/factory';
import { escapeRegex } from '../utils/utils';

export const getAllGroups = factory.getAll(Group);
export const getGroup = factory.getOne(Group);
export const createGroup = factory.createOne(Group, 'name');
export const updateGroup = factory.updateOne(Group, 'name');
export const deleteGroup = factory.deleteOne(Group);

export const getGroupClasses = asyncCatcher(async (req, res, next) => {
  const classes = await Class.find({ group: req.params.groupId });

  res.json({ classes });
});

export const searchGroups = asyncCatcher(async (req, res, next) => {
  const name = escapeRegex(req.query.q.trim());
  const exp = `(${name.toUpperCase()}|${name.toLowerCase()})`;
  const groups = await Group.find({ name: {
    $regex: new RegExp(exp)
  } });

  res.json({ groups });
});