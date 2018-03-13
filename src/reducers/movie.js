import {LOCATION_CHANGED} from 'redux-little-router';
import {
  LOOKUP_MOVIE_STARTING,
  LOOKUP_MOVIE_SUCCESS,
  REQUEST_ERROR,
} from '../actions/actionTypes';

export const initialState = {
  error: null,
  loading: true,
  movie: null,
};

export default function movie(state = initialState, action) {
  switch (action.type) {
    case LOOKUP_MOVIE_STARTING:
      return {
        ...state,
        loading: true,
      };

    case LOOKUP_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        movie: action.payload.data,
      };

    case REQUEST_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case LOCATION_CHANGED:
      return {
        ...state,
        movie: null,
        error: null,
        loading: true,
      };

    default:
      return state;
  }
}
