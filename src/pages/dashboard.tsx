import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import DashboardAddLogForm from '../components/DashboardAddLogForm';
import Tdee from '../components/Tdee';
import Today from '../components/Today';
import { useLogToday, useTdee, useUser } from '../utils/hooks';

const Dashboard: React.FC = () => {
  const { data: user } = useUser({ redirectIfFound: false, redirectTo: '/signin' });
  const { data: log, mutate: mutateLog } = useLogToday(user);
  const { data: tdee, revalidate: revalidateTdee } = useTdee(user);

  return !user ? (
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
            <Tdee tdee={tdee?.tdee} />
          </div>
        </div>
        <div className="columns is-centered is-mobile">
          <div className="column is-full-mobile is-half-tablet">
            <Today log={log} />
          </div>
        </div>
        <div className="columns is-centered is-mobile">
          <div className="column is-full-mobile is-half-tablet">
            <DashboardAddLogForm mutateLog={mutateLog} revalidateTdee={revalidateTdee} />
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Dashboard;
