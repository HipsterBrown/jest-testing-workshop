import {push} from 'redux-little-router';
import api from '../api';
import {SEARCH_STARTING, SEARCH_SUCCESS, REQUEST_ERROR} from './actionTypes';

export function searchStarting() {
  return {type: SEARCH_STARTING};
}

export function searchSuccess(data) {
  return {
    type: SEARCH_SUCCESS,
    payload: {data},
  };
}

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    payload: {error},
  };
}

export function search(term = '') {
  return dispatch => {
    dispatch(
      push({
        query: {
          term,
        },
      }),
    );
    dispatch(searchStarting());

    return api
      .get(`search?term=${encodeURIComponent(term)}&limit=20&media=movie`)
      .then(data => dispatch(searchSuccess(data)))
      .catch(error => dispatch(requestError(error)));
  };
}
