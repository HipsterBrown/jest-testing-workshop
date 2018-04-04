import {LOCATION_CHANGED} from 'redux-little-router';
import {
  LOOKUP_MOVIE_STARTING,
  LOOKUP_MOVIE_SUCCESS,
  REQUEST_ERROR,
} from 'actions/actionTypes';
import movieReducer from 'reducers/movie';

describe('movie reducer', () => {
  test('default state', () => {
    expect(movieReducer(undefined, {})).toEqual({
      error: null,
      loading: true,
      movie: null,
    });
  });

  test('LOOKUP_MOVIE_STARTING', () => {
    const action = {
      type: LOOKUP_MOVIE_STARTING,
    };
    const state = {
      loading: false,
    };

    expect(movieReducer(state, action)).toEqual({
      loading: true,
    });
  });

  test('LOOKUP_MOVIE_SUCCESS', () => {
    const data = {test: 'value'};
    const action = {
      type: LOOKUP_MOVIE_SUCCESS,
      payload: {data},
    };
    const state = {
      loading: true,
      movie: null,
    };

    expect(movieReducer(state, action)).toEqual({
      loading: false,
      movie: data,
    });
  });

  test('REQUEST_ERROR', () => {
    const error = 'test error';
    const action = {
      type: REQUEST_ERROR,
      payload: {error},
    };
    const state = {
      loading: true,
      error: null,
    };

    expect(movieReducer(state, action)).toEqual({
      error,
      loading: false,
    });
  });

  test('LOCATION_CHANGED', () => {
    const action = {
      type: LOCATION_CHANGED,
    };
    const state = {
      error: 'test error',
      loading: false,
      movie: {test: 'value'},
    };

    expect(movieReducer(state, action)).toEqual({
      error: null,
      loading: true,
      movie: null,
    });
  });
});
