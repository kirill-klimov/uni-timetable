import { UserActionTypes } from "./user.types";

export const logInStart = (credentials) => ({
  type: UserActionTypes.LOG_IN_START,
  payload: credentials
})

export const signUpStart = (credentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: credentials
})

export const authSuccess = (user) => ({
  type: UserActionTypes.AUTH_SUCCESS,
  payload: user
})

export const authError = (error) => ({
  type: UserActionTypes.AUTH_ERROR,
  payload: error
})

export const logOut = () => ({
  type: UserActionTypes.LOG_OUT
})

export const addGroupStart = (groupId) => ({
  type: UserActionTypes.ADD_GROUP_START,
  payload: groupId
})

export const removeGroupStart = (groupId) => ({
  type: UserActionTypes.REMOVE_GROUP_START,
  payload: groupId
})

export const groupUpdateSuccess = (user) => ({
  type: UserActionTypes.GROUPS_UPDATE_SUCCESS,
  payload: user
})

export const groupUpdateError = (error) => ({
  type: UserActionTypes.GROUPS_UPDATE_ERROR,
  payload: error
})