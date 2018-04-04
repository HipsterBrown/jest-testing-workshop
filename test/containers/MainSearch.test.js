import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import MockRouterProvider from 'helpers/MockRouterProvider';
import {MockMainSearch} from 'containers/MainSearch';

describe('<MainSearch />', () => {
  const search = jest.fn();
  const props = {
    query: {},
    search,
  };

  test('text input triggers search action', () => {
    const value = 'test value';
    const wrapper = shallow(<MockMainSearch {...props} />);

    wrapper.find('input').simulate('change', {target: {value}});
    expect(search).toHaveBeenCalledWith(value);
  });

  test('laoding snanpshot', () => {
    const newProps = {
      ...props,
      loading: true,
    };

    expect(
      renderer
        .create(
          <MockRouterProvider>
            <MockMainSearch {...newProps} />
          </MockRouterProvider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  test('empty search snapshot', () => {
    expect(
      renderer
        .create(
          <MockRouterProvider>
            <MockMainSearch {...props} />
          </MockRouterProvider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  test('show search results snapshot', () => {
    const newProps = {
      ...props,
      results: [
        {
          artworkUrl100: 'test-url-100x100.png',
          trackName: 'test one',
          trackId: 13,
        },
        {
          artworkUrl100: 'another-test-url-100x100.png',
          trackName: 'test two',
          trackId: 26,
        },
      ],
    };

    expect(
      renderer
        .create(
          <MockRouterProvider>
            <MockMainSearch {...newProps} />
          </MockRouterProvider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });
});
