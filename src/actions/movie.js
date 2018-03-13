import api from '../api';
import {LOOKUP_MOVIE_STARTING, LOOKUP_MOVIE_SUCCESS} from './actionTypes';
import {requestError} from './search';

export function lookupMovieStarting() {
  return {type: LOOKUP_MOVIE_STARTING};
}

export function lookupMovieSuccess(data) {
  return {
    type: LOOKUP_MOVIE_SUCCESS,
    payload: {data},
  };
}

export function lookupMovie(id) {
  return dispatch => {
    dispatch(lookupMovieStarting());

    return api
      .get(`lookup?id=${id}`)
      .then(({results}) => dispatch(lookupMovieSuccess(results[0])))
      .catch(error => dispatch(requestError(error)));
  };
}
