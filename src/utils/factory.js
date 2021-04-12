import { asyncCatcher } from "../utils/asyncCatcher";
import { filterObject } from './utils';

export const getAll = (Model) => {
  return asyncCatcher(async (req, res, next) => {
    const docs = await Model.find();
  
    res.json({
      data: docs
    });
  })
}

export const getOne = (Model) => {
  return asyncCatcher(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    // check if doc is found

    res.json({
      data: doc
    });
  });
}

export const createOne = (Model, ...allowedFields) => {
  return asyncCatcher(async (req, res, next) => {
    const doc = filterObject(req.body, allowedFields);
    const newDoc = await Model.create(doc);

    res.json({
      data: newDoc
    })
  })
}

export const updateOne = (Model, ...allowedFields) => {
  return asyncCatcher(async (req, res, next) => {
    const doc = filterObject(req.body, allowedFields);
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, doc, {
      new: true,
      runValidators: true
    });

    res.json({
      data: updatedDoc
    })
  })
}

export const deleteOne = (Model) => {
  return asyncCatcher(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    res.json({
      data: doc
    });
  });
}

