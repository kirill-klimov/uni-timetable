import { combineReducers } from 'redux';
import groupReducer from './group/group.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
});

export default rootReducer;