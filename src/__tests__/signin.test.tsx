import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from '../pages/signin';

it('renders signin unchanged', () => {
  const tree = renderer.create(<SignIn />).toJSON();
  expect(tree).toMatchSnapshot();
});
