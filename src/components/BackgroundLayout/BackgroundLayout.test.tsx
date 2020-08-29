import React from 'react';
import renderer from 'react-test-renderer';

import BackgroundLayout from './BackgroundLayout';

it('renders BackgroundLayout unchanged', () => {
  const tree = renderer.create(<BackgroundLayout />).toJSON();
  expect(tree).toMatchSnapshot();
});
