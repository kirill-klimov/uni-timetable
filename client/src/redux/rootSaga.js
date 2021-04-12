import { all, call } from 'redux-saga/effects';
import groupSaga from './group/group.saga';
import userSaga from './user/user.saga';

function* rootSaga() {
  yield all([
    call(userSaga),
    call(groupSaga),
  ]);
}

export default rootSaga;