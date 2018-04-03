import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
/* eslint-ignore */
const MockRouterProvider = ({children, router}) => (
  <Provider store={mockStore({router})}>{children}</Provider>
);

MockRouterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  router: PropTypes.shape({}),
};

MockRouterProvider.defaultProps = {
  router: {},
};

export default MockRouterProvider;
