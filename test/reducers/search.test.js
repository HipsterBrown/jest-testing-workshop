import {LOCATION_CHANGED} from 'redux-little-router';
import {
  SEARCH_STARTING,
  SEARCH_SUCCESS,
  REQUEST_ERROR,
} from 'actions/actionTypes';
import searchReducer from 'reducers/search';

describe('search reducer', () => {
  test('default state', () => {
    expect(searchReducer(undefined, {})).toEqual({
      error: null,
      loading: false,
      resultCount: 0,
      results: [],
    });
  });

  test('SEARCH_STARTING', () => {
    const action = {type: SEARCH_STARTING};
    const state = {loading: false};

    expect(searchReducer(state, action)).toEqual({loading: true});
  });

  test('SEARCH_SUCCESS', () => {
    const data = {
      resultCount: 2,
      results: [{test: 'data'}, {test: 'more data'}],
    };
    const action = {
      type: SEARCH_SUCCESS,
      payload: {
        data,
      },
    };
    const state = {
      loading: true,
      resultCount: 0,
      results: [],
    };

    expect(searchReducer(state, action)).toEqual({
      ...data,
      loading: false,
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

    expect(searchReducer(state, action)).toEqual({
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
      results: [{}, {}, {}],
      resultCount: 3,
    };

    expect(searchReducer(state, action)).toEqual({
      error: null,
      results: [],
      resultCount: 0,
    });
  });
});
