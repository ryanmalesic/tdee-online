import React from 'react';

import { Log } from '../../types';

export interface TodayProps {
  log: Log;
}

const Today: React.FC<TodayProps> = (props) => {
  const { log } = props;

  return (
    <div className="box">
      <h1 className="title is-2">Today</h1>
      <h3 className="subtitle is-4">Your log for today</h3>

      <div className="container has-text-centered">
        <div className="level">
          {log === undefined ? (
            <div className="level-item has-text-centered">
              <p className="subtitle is-3">No log for today</p>
            </div>
          ) : (
            <>
              <div className="level-item has-text-centered">
                <p className="subtitle is-3">
                  <strong className="has-text-primary">{log.weight}</strong> lbs
                </p>
              </div>

              <div className="level-item has-text-centered">
                <p className="subtitle is-3">
                  <strong className="has-text-primary">{log.caloricIntake}</strong> kCals
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Today;
