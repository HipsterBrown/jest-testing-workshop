import React from 'react';
import renderer from 'react-test-renderer';
import Loading from 'components/Loading';

describe('<Loading />', () => {
  test('displays loading svg with default props', () => {
    expect(renderer.create(<Loading />).toJSON()).toMatchSnapshot();
  });

  test('display loading svg with custom props', () => {
    const props = {
      fill: '#bada55',
      height: 200,
      width: 200,
    };
    expect(renderer.create(<Loading {...props} />).toJSON()).toMatchSnapshot();
  });
});
