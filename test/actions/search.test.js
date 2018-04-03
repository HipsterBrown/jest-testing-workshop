import api from 'api';
import {
  SEARCH_STARTING,
  SEARCH_SUCCESS,
  REQUEST_ERROR,
} from 'actions/actionTypes';
import {
  searchStarting,
  searchSuccess,
  requestError,
  search,
} from 'actions/search';

describe('search actions', () => {
  const data = {test: 'value'};
  const dispatch = jest.fn();
  const error = 'test error';

  // sync actions
  test('SEARCH_STARTING', () => {
    const expectedAction = {
      type: SEARCH_STARTING,
    };

    expect(searchStarting()).toEqual(expectedAction);
  });

  test('SEARCH_SUCCESS', () => {
    const expectedAction = {
      type: SEARCH_SUCCESS,
      payload: {data},
    };

    expect(searchSuccess(data)).toEqual(expectedAction);
  });

  test('REQUEST_ERROR', () => {
    const expectedAction = {
      type: REQUEST_ERROR,
      payload: {error},
    };

    expect(requestError(error)).toEqual(expectedAction);
  });

  // async actions
  describe('#search', () => {
    test('success with default empty term', () => {
      // mock method response
      api.get = jest.fn(() => Promise.resolve(data));

      // return the Promise so any test error are caught by Jest
      return search()(dispatch).then(() => {
        // check the mocked dispatch function
        expect(dispatch).toHaveBeenCalledWith(searchStarting());
        expect(dispatch).toHaveBeenCalledWith(searchSuccess(data));
      });
    });

    test('success with the term argument', () => {
      // mock method response
      api.get = jest.fn(() => Promise.resolve(data));

      return search('test')(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(searchStarting());
        expect(dispatch).toHaveBeenCalledWith(searchSuccess(data));
        expect(api.get).toHaveBeenCalledWith(
          `search?term=${encodeURIComponent('test')}&limit=20&media=movie`,
        );
      });
    });

    test('error response is handled', () => {
      // mock method response
      api.get = jest.fn(() => Promise.reject(error));

      return search('test')(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(searchStarting());
        expect(dispatch).toHaveBeenCalledWith(requestError(error));
      });
    });
  });
});
