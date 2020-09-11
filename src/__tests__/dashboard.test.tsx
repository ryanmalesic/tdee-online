import React from 'react';
import renderer from 'react-test-renderer';

import Dashboard from '../pages/dashboard';

it('renders dashboard unchanged', () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
