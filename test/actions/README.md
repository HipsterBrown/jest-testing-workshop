# Testing Action Creators

Testing the various pieces of Redux state management, i.e. [action creators](https://redux.js.org/docs/recipes/WritingTests.html#action-creators) and [reducers](https://redux.js.org/docs/recipes/WritingTests.html#reducers), is a relatively pleasant experience because they are mostly pure functions with verifiable outputs. We will not be testing that Redux internals work, just that the function in this repo operate as expected.

The simplest expectations can be set for action creators that just return actions, which are plain objects.


`src/project-name/actions/myFeature.js`
```es6
import { FEATURE_LOADING } from './actionTypes';

export function featureLoading() {
  return { type: FEATURE_LOADING };
}
```

`test/project-name/actions/myFeature.test.js`
```es6
import { FEATURE_LOADING } from 'project-name/actions/actionTypes';
import { featureLoading } from 'project-name/actions/myFeature';

describe('myFeature actions', () => {
  test('FEATURE_LOADING', () => {
    expect(featureLoading()).toEqual({ type: FEATURE_LOADING });
  });
});
```

The test may appear redundant because there is no real logic in the action creator function, `featureLoading`, however the test acts as a defense against unexpected regressions in the future, similar to the snapshots described earlier.

Asynchronous action creators require a bit more to setup and assert because they do not immediately return simple values and will probably have branching logic.

`src/project-name/actions/myFeature.js`
```es6
import {
  FEATURE_LOADING,
  FEATURE_SUCCESSFUL,
  FEATURE_REQUEST_ERROR,
} from './actionTypes';
import api from 'project-name/api';

export function featureLoading() {
  return { type: FEATURE_LOADING };
}

export function featureSuccessful(data) {
  return {
    type: FEATURE_SUCCESSFUL,
    data,
  };
}

export function featureRequestError(error) {
  return {
    type: FEATURE_REQUEST_ERROR,
    error,
  };
}

export function getFeatureData() {
  return dispatch => {
    dispatch(featureLoading());

    return api.getData()
      .then(data => dispatch(featureSuccessful(data)))
      .catch(error => dispatch(featureRequestError(error)));
  };
}
```

`test/project-name/actions/myFeature.test.js`
```es6
import {
  FEATURE_LOADING,
  FEATURE_SUCCESSFUL,
  FEATURE_REQUEST_ERROR,
} from 'project-name/actions/actionTypes';
import {
  featureLoading,
  featureSuccessful,
  featureRequestError,
  getFeatureData,
} from 'project-name/actions/myFeature';
import api from 'project-name/api';

describe('myFeature actions', () => {
  test('FEATURE_LOADING', () => {
    expect(featureLoading()).toEqual({ type: FEATURE_LOADING });
  });

  test('FEATURE_SUCCESSFUL', () => {
    const data = { test: 'value' };
    expect(featureSuccessful(data)).toEqual({
      type: FEATURE_SUCCESSFUL,
      data,
    });
  });

  test('FEATURE_REQUEST_ERROR', () => {
    const error = new Error('testing');
    expect(featureRequestError(error)).toEqual({
      type: FEATURE_REQUEST_ERROR,
      error,
    });
  });

  describe('async function', () => {
    const dispatch = jest.fn();

    describe('getFeatureData', () => {
      test('success', () => {
        const data = { test: 'value' };
        api.getData = jest.fn(() => Promise.resolve(data));

        return getFeatureData()(dispatch)
          .then(() => {
            expect(dispatch).toHaveBeenCalledWith(featureLoading());
            expect(dispatch).toHaveBeenCalledWith(featureSuccessful(data));
          });
      });

      test('error', () => {
        const error = new Error('test');
        api.getData = jest.fn(() => Promise.reject(error));

        return getFeatureData()(dispatch)
          .then(() => {
            expect(dispatch).toHaveBeenCalledWith(featureLoading());
            expect(dispatch).toHaveBeenCalledWith(featureRequestError(error));
          });
      });
    });
  });
});
```

The first few tests are similar to the earlier example, then the async actions are scoped to their own `describe` block to create some specific setup code. Each async action get its own `describe` block as well to scope the `success` and `error` test statements in the Jest test runner output. The best practice of abstracting the server requests to its own module, `api`, allows for consolidating the requests in one place and avoids stubbing server responses without setting up any mock servers, i.e. [`axios-mock-adapter`](https://www.npmjs.com/package/axios-mock-adapter). The `api` module for the project is imported in the test file with the `getData` method being replaced, or stubbed, by a mock Jest function that returns a resolved or rejected Promise before calling the `getFeatureData` function. Once the Promise returned by calling the tested function resolves, which should always occur because the `dispatch` call is returned in the `.then` and `.catch` cases, expectations can be called on the mock `dispatch` function. The tested function should only `.catch` if one of the expectations fails.

The expectations for the resolved async function should test that the mock `dispatch` function is called with the simple action creators rather than asserting on the return value from those action creators, which is handled by the prior unit tests:

```es6
// Bad
expect(dispatch).toHaveBeenCalledWith({ type: FEATURE_LOADING });

// Good
expect(dispatch).toHaveBeenCalledWith(featureLoading());
```


