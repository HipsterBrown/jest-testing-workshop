import api from 'api';
import {LOOKUP_MOVIE_STARTING, LOOKUP_MOVIE_SUCCESS} from 'actions/actionTypes';
import {requestError} from 'actions/search';
import {
  lookupMovieStarting,
  lookupMovieSuccess,
  lookupMovie,
} from 'actions/movie';

describe('movie actions', () => {
  const data = {results: ['value']};
  const dispatch = jest.fn();
  const error = 'test error';
  const id = 'testId';

  // sync actions
  test('LOOKUP_MOVIE_STARTING', () => {
    const expectedAction = {
      type: LOOKUP_MOVIE_STARTING,
    };

    expect(lookupMovieStarting()).toEqual(expectedAction);
  });

  test('LOOKUP_MOVIE_SUCCESS', () => {
    const expectedAction = {
      type: LOOKUP_MOVIE_SUCCESS,
      payload: {data},
    };

    expect(lookupMovieSuccess(data)).toEqual(expectedAction);
  });

  // async actions
  describe('#lookupMovie', () => {
    test('success with id argument', () => {
      // mock method response
      api.get = jest.fn(() => Promise.resolve(data));

      // return the Promise so any test error are caught by Jest
      return lookupMovie(id)(dispatch).then(() => {
        // check the mocked dispatch function
        expect(dispatch).toHaveBeenCalledWith(lookupMovieStarting());
        expect(dispatch).toHaveBeenCalledWith(
          lookupMovieSuccess(data.results[0]),
        );
        expect(api.get).toHaveBeenCalledWith(`lookup?id=${id}`);
      });
    });

    test('error response handled', () => {
      api.get = jest.fn(() => Promise.reject(error));

      return lookupMovie(id)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(lookupMovieStarting());
        expect(dispatch).toHaveBeenCalledWith(requestError(error));
      });
    });
  });
});
