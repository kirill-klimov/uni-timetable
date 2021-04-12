import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { authError, authSuccess, groupUpdateError, groupUpdateSuccess } from './user.actions';
import { UserActionTypes } from './user.types';
import axios from 'axios';

function* logIn({ payload }) {
  try {
    const { data: { user, token } } = yield axios.post(`/api/auth/login`, payload);
    yield put(authSuccess({
      ...user,
      token
    }))
  } catch (e) {
    yield put(authError({
      action: UserActionTypes.LOG_IN_START,
      message: e.response.data.message
    }));
  }
}

function* signUp({ payload }) {
  try {
    const { data: { user, token } } = yield axios.post(`/api/auth/signup`, payload);
    yield put(authSuccess({
      ...user,
      token
    }))
  } catch (e) {
    yield put(authError({
      action: UserActionTypes.SIGN_UP_START,
      message: e.response.data.message
    }));
  }
}

function* logOut() {
  try {
    yield axios.post(`/api/auth/logout`, {});
  } catch(e) {}
}

function* addGroup({ payload }) {
  try {
    const token = yield select(state => state.user.token);
    const { data: { user } } = yield axios.post(`/api/users/me/groups/${payload}`, {}, {
      headers: { authorization: `Bearer ${token}` }
    });
    yield put(groupUpdateSuccess(user));
  } catch(e) {
    yield put(groupUpdateError({
      action: UserActionTypes.GROUPS_UPDATE_ERROR,
      message: e.response.data.message
    }));
  }
}

function* removeGroup({ payload }) {
  try {
    const token = yield select(state => state.user.token);
    const { data: { user } } = yield axios.delete(`/api/users/me/groups/${payload}`, {
      headers: { authorization: `Bearer ${token}` }
    });
    yield put(groupUpdateSuccess(user));
  } catch(e) {
    yield put(groupUpdateError({
      action: UserActionTypes.GROUPS_UPDATE_ERROR,
      message: e.response.data.message
    }));
  }
}

function* logInStart() { yield takeLatest(UserActionTypes.LOG_IN_START, logIn) }
function* signUpStart() { yield takeLatest(UserActionTypes.SIGN_UP_START, signUp) }
function* logOutStart() { yield takeLatest(UserActionTypes.LOG_OUT, logOut) }
function* addGroupStart() { yield takeLatest(UserActionTypes.ADD_GROUP_START, addGroup) }
function* removeGroupStart() { yield takeLatest(UserActionTypes.REMOVE_GROUP_START, removeGroup) }


function* userSaga() {
  yield all([
    call(logInStart),
    call(signUpStart),
    call(logOutStart),
    call(addGroupStart),
    call(removeGroupStart),
  ]);
}

export default userSaga;