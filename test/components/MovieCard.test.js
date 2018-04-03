import React from 'react';
import renderer from 'react-test-renderer';
import MockRouterProvider from 'helpers/MockRouterProvider';
import MovieCard from 'components/MovieCard';

describe('<MovieCard />', () => {
  test('displays card without link prop', () => {
    const props = {
      poster: '/test.png',
      title: 'Test',
    };

    expect(
      renderer.create(<MovieCard {...props} />).toJSON(),
    ).toMatchSnapshot();
  });

  test('displays card with link prop', () => {
    const props = {
      link: 'test-link.com',
      poster: '/test.png',
      title: 'Test',
    };

    expect(
      renderer
        .create(
          <MockRouterProvider>
            <MovieCard {...props} />
          </MockRouterProvider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });
});
