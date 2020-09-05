import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import DashboardAddLogForm from '../components/DashboardAddLogForm';
import { useUser } from '../utils/hooks';

const Dashboard: React.FC = () => {
  const { data } = useUser({ redirectIfFound: false, redirectTo: '/signin' });

  const error = React.useState<string>(null)[0];
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    setLoading(false);
  };

  return !data ? (
    <BackgroundLayout>
      <div className="container has-text-centered">
        <h1 className="title is-1">Loading...</h1>
      </div>
    </BackgroundLayout>
  ) : (
    <BackgroundLayout>
      <div className="container">
        <div className="columns is-centered is-mobile">
          <div className="column is-full-mobile is-half-tablet">
            <div className="box">
              <h1 className="title is-1">Add a log</h1>
              <DashboardAddLogForm error={error} loading={loading} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Dashboard;