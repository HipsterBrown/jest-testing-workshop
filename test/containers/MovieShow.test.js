import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import MockRouterProvider from 'helpers/MockRouterProvider';
import {MockMovieShow} from 'containers/MovieShow';

describe('<MovieShow />', () => {
  const lookupMovie = jest.fn();
  const props = {
    id: 'testId',
    lookupMovie,
  };

  test('calls lookupMovie on componentDidMount', () => {
    // mount calls the React lifecycle methods as it renders the component
    mount(
      <MockRouterProvider>
        <MockMovieShow {...props} />
      </MockRouterProvider>,
    );
    expect(lookupMovie).toHaveBeenCalledWith(props.id);
  });

  test('shows loading state', () => {
    const newProps = {
      ...props,
      loading: true,
    };

    expect(
      renderer
        .create(
          <MockRouterProvider>
            <MockMovieShow {...newProps} />
          </MockRouterProvider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  test('shows movie data', () => {
    const newProps = {
      ...props,
      movie: {
        artworkUrl100: 'test-url-100x100.png',
        contentAdvisoryRating: 'G',
        country: 'USA',
        longDescription: 'test description',
        previewUrl: 'test-preview.mp4',
        primaryGenreName: 'Test',
        releaseDate: '2000-01-01',
        trackName: 'test one',
      },
    };

    expect(
      renderer
        .create(
          <MockRouterProvider>
            <MockMovieShow {...newProps} />
          </MockRouterProvider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });
});
