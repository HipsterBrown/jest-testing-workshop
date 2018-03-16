import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const App = ({result, params}) => {
  const {component: Component} = result;
  return <Component {...params} />;
};

App.defaultProps = {
  result: null,
};

App.propTypes = {
  params: PropTypes.shape({}),
  result: PropTypes.shape({
    component: PropTypes.func,
  }),
};

export default connect(state => state.router)(App);
export {App as MockApp};
