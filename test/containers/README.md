# Enzyme

[Enzyme](http://airbnb.io/enzyme/) is used to search through the rendered output of a Component using an API similar to jQuery. This tool is used primarily for [simulating DOM events](https://facebook.github.io/jest/docs/en/tutorial-react.html#dom-testing) before testing the snapshot or a specific state of the render.


`src/components/Counter/Counter.jsx`
```es6
import React from 'react';

export default const Counter = ({ count, increment }) => {
  return (
    <div>
      <div>
        {count} clicks
      </div>
      <button onClick={() => { increment(); }}>
        Increment
      </button>
    </div>
  );
}
```

`test/components/Counter/Counter.test.js`
```es6
import React from 'react';
import { shallow } from 'enzyme';
import Counter from 'components/Counter/Counter';

describe('<Counter />', () => {
  test('increment prop function called with button click', () => {
    const increment = jest.fn();
    const props = {
      count: 0,
      increment,
    };
    const wrapper = shallow(<Counter {...props} />);

    wrapper.find('button').simulate('click');
    expect(increment).toHaveBeenCalled();
  });
});
```

In the test, the setup is very similar to the snapshot testing except the [`shallow`](http://airbnb.io/enzyme/docs/api/shallow.html) function is imported from the `enzyme` module. Shallow rendering is useful to constrain testing a Component as a unit, and to ensure that the tests do not indirectly assert behavior of child components. The `wrapper` returned by calling `shallow` with the tested Component provides the API for searching and interacting with the virtual DOM. The single test statment is focused on the outcome of what happens when the Component's `button` is clicked. This is key to unit testing because it is the external interface being tested instead of the internal values used to render that interface.

When testing components that interact with DOM APIs or are wrapped by higher order components, using [`mount`](http://airbnb.io/enzyme/docs/api/mount.html) will render the tested component, including all child components, mount it to the DOM, and call the [lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) when appropriate.

`src/project-name/containers/Feature.jsx`
```es6
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getFeatureData,
} from 'project-name/actions/myFeature';

class Feature extends React.Component {
  componentDidMount() {
    this.props.getFeatureData();
  }

  render() {
    const { data, loading, error } = this.props;

    if (loading) {
      return (<p>Loading...</p>);
    }

    if (data) {
      return (<p>{data}</p>);
    }

    if (error) {
      return (<p>There was an error: {error}</p>);
    }
  }
}

function mapStateToProps({ feature }) {
  const { data, loading, error } = feature;
  return { data, loading, error };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFeatureData,
    },
    dispatch,
  );
}

export { Feature as MockFeature };
export default connect(mapStateToProps, mapDispatchToProps)(ManageEsignatureForm);
```

`test/project-name/containers/Feature.test.js`
```es6
import React from 'react';
import { mount } from 'enzyme';
import { MockFeature } from 'project-name/containers/Feature';

describe('<Feature />', () => {
  test('getFeatureData called on mount', () => {
    const getFeatureData = jest.fn();
    const props = {
      loading: true,
      data: null,
      error: null,
    };

    mount(<MockFeature {...props});
    expect(getFeatureData).toHaveBeenCalled();
  });
});
```

When testing a component that will be exported as a Redux-connected, there is also a named export of the unconnected version prefixed by "Mock". The "Mock" version is used in the tests to keep the assertions focused on the component logic instead of how it interacts with Redux. The component is rendered with `mount` utility from `enzyme` so the lifecycle hooks are called, then the `getFeatureData` prop function can be tested after `componentDidMount` should have been called.

