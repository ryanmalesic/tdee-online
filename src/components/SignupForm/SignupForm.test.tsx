import React from 'react';
import renderer from 'react-test-renderer';

import SignupForm from './SignupForm';

it('renders SignupForm unchanged', () => {
  const tree = renderer
    .create(<SignupForm error={null} loading={false} onSubmit={jest.fn()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
