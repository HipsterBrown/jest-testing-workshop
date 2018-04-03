import React from 'react';
import renderer from 'react-test-renderer';
import MockRouterProvider from 'helpers/MockRouterProvider';
import NavBar from 'components/NavBar';

describe('<NavBar />', () => {
  test('displays all links', () => {
    expect(
      renderer
        .create(
          <MockRouterProvider>
            <NavBar />
          </MockRouterProvider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });
});
