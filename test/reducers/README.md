# Reducers

Reducers are pure functions and can be tested without any context to Redux internals.

`src/project-name/reducers/myFeature.js`
```es6
import {
  FEATURE_LOADING,
  FEATURE_SUCCESSFUL,
  FEATURE_REQUEST_ERROR,
} from 'project-name/actions/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function myFeature(state = initialState, action) {
  switch (action.type) {
    case FEATURE_LOADING:
      return { ...state, loading: true };

    case FEATURE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        data: action.data
      };

    case FEATURE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
```

`test/project-name/reducers/myFeature.test.js`
```es6
import {
  FEATURE_LOADING,
  FEATURE_SUCCESSFUL,
  FEATURE_REQUEST_ERROR,
} from 'project-name/actions/actionTypes';
import myFeature from 'project-name/reducers/myFeature';

describe('myFeature reducer', () => {
  test('default initial state', () => {
    expect(myFeature(undefined, {})).toEqual({
      loading: false,
      data: null,
      error: null,
    });
  });

  test('FEATURE_LOADING', () => {
    const action = { type: FEATURE_LOADING };
    const state = { loading: false };

    expect(myFeature(state, action)).toMatchObject({
      loading: true,
    });
  });

  test('FEATURE_SUCCESSFUL', () => {
    const data = { test: 'value' };
    const action = {
      type: FEATURE_SUCCESSFUL,
      data,
    };
    const state = {
      loading: true,
      data: null,
    };

    expect(myFeature(state, action)).toEqual({
      loading: false,
      data,
    });
  });

  test('FEATURE_REQUEST_ERROR', () => {
    const error = new Error('testing');
    const action = {
      type: FEATURE_REQUEST_ERROR,
      error,
    };
    const state = {
      loading: true,
      error: null,
    };

    expect(myFeature(state, action)).toEqual({
      loading: false,
      error,
    });
  });
});
```

The reducers test checks every case of the switch statement and asserts the values that should be changed in the `state` object returned by a specific case. A specific `state` object is passed into the reducer for some test statements to verify that the initial state value is changed by the case handling the action type. For example, if the default `initialState` inside the reducer has `loading: false` and the test case expects `loading` to be set as `false`, there is no way to know that the case statement changed that value or if it's the initial state unless the initial state is overriden by the test state.


