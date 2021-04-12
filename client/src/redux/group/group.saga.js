import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import { fetchClassesError, fetchClassesSuccess, searchGroupError, searchGroupSuccess } from './group.actions';
import { GroupActionTypes } from './group.types';

function* searchGroup({ payload }) {
  try {
    const { data: {groups} } = yield axios.get(`/api/groups/search`, {
      params: { q: payload.trim() }
    });
    yield put(searchGroupSuccess(groups));
  } catch (e) {
    yield put(searchGroupError({
      action: GroupActionTypes.SEARCH_GROUP_ERROR,
      message: e.response.data.message
    }));
  }
}

function* fetchClasses({ payload }) {
  try {
    const { data: { classes } } = yield axios.get(`/api/groups/${payload}/classes`);
    yield put(fetchClassesSuccess(classes));
  } catch(e) {
    yield put(fetchClassesError({
      action: GroupActionTypes.FETCH_CLASSES_ERROR,
      message: e.response.data.message
    }));
  }
}

function* searchGroupStart() { yield takeLatest(GroupActionTypes.SEARCH_GROUP_START, searchGroup); }
function* fetchClassesStart() { yield takeLatest(GroupActionTypes.FETCH_CLASSES_START, fetchClasses); }

function* groupSaga() {
  yield all([
    call(searchGroupStart),
    call(fetchClassesStart),
  ]);
}

export default groupSaga;