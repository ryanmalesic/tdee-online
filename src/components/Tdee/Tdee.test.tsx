import React from 'react';
import renderer from 'react-test-renderer';

import Tdee from './Tdee';

it('renders Tdee unchanged', () => {
  const tree = renderer.create(<Tdee tdee={1234} />).toJSON();
  expect(tree).toMatchSnapshot();
});
