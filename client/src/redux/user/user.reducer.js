import { UserActionTypes } from "./user.types";

const init = {
  loading: false,
  error: null,
  token: ''
}

const userReducer = (state=init, action) => {
  switch(action.type) {
    case UserActionTypes.LOG_IN_START:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
    case UserActionTypes.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UserActionTypes.LOG_OUT:
      return init;
    case UserActionTypes.GROUPS_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case UserActionTypes.GROUPS_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;