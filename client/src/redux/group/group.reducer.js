import {GroupActionTypes} from './group.types';

const init = {
  loading: false,
  error: null,
  searchResult: null,
  currentGroup: null,
  classes: null,
  classesLoading: false,
}

const groupReducer = (state=init, action) => {
  switch(action.type) {
    case GroupActionTypes.SEARCH_GROUP_START: 
      return {
        ...state,
        loading: true
      }
    case GroupActionTypes.SEARCH_GROUP_SUCCESS:
      return {
        ...state,
        searchResult: action.payload,
        error: null,
        loading: false
      }
    case GroupActionTypes.SEARCH_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case GroupActionTypes.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload
      }
    case GroupActionTypes.FETCH_CLASSES_START: 
      return {
        ...state,
        classesLoading: true
      }
    case GroupActionTypes.FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload,
        error: null,
        classesLoading: false,
      }
    case GroupActionTypes.FETCH_CLASSES_ERROR:
      return {
        ...state,
        error: action.payload,
        classesLoading: false,
      }
    default:
      return state;
  }
}

export default groupReducer;