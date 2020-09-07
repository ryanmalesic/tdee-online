import React from 'react';
import renderer from 'react-test-renderer';

import DashboardAddLogForm from './DashboardAddLogForm';

it('renders DashboardAddLogForm unchanged', () => {
  const tree = renderer.create(<DashboardAddLogForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
