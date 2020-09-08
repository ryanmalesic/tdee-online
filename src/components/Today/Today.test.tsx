import React from 'react';
import renderer from 'react-test-renderer';

import Today from './Today';

it('renders Today unchanged', () => {
  const tree = renderer
    .create(<Today log={{ date: '01-01-1980', weight: 170, caloricIntake: 3500 }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
