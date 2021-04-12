import {GroupActionTypes} from './group.types';

export const searchGroupStart = (query) => ({
  type: GroupActionTypes.SEARCH_GROUP_START,
  payload: query
})

export const searchGroupSuccess = (groups) => ({
  type: GroupActionTypes.SEARCH_GROUP_SUCCESS,
  payload: groups
})

export const searchGroupError = (error) => ({
  type: GroupActionTypes.SEARCH_GROUP_ERROR,
  payload: error
})

export const setCurrentGroup = (groupId) => ({
  type: GroupActionTypes.SET_CURRENT_GROUP,
  payload: groupId
})

export const fetchClassesStart = (groupId) => ({
  type: GroupActionTypes.FETCH_CLASSES_START,
  payload: groupId
})

export const fetchClassesSuccess = (classes) => ({
  type: GroupActionTypes.FETCH_CLASSES_SUCCESS,
  payload: classes
})

export const fetchClassesError = (error) => ({
  type: GroupActionTypes.FETCH_CLASSES_ERROR,
  payload: error
})