import {
  SEARCH_STARTING,
  SEARCH_SUCCESS,
  REQUEST_ERROR,
} from '../actions/actionTypes';

export const initialState = {
  error: null, 
  loading: false,
  resultCount: 0,
  results: [],
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_STARTING:
      return { ...state, loading: true };

    case SEARCH_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
      };

    case REQUEST_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
