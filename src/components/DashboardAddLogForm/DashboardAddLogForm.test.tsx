import React from 'react';
import renderer from 'react-test-renderer';

import DashboardAddLogForm from './DashboardAddLogForm';

it('renders DashboardAddLogForm unchanged', () => {
  const tree = renderer
    .create(<DashboardAddLogForm mutateLog={jest.fn()} revalidateTdee={jest.fn()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
