import React from 'react';
import renderer from 'react-test-renderer';

import SigninForm from './SigninForm';

it('renders SigninForm unchanged', () => {
  const tree = renderer.create(<SigninForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
