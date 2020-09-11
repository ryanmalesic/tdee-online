import React from 'react';

export interface TdeeProps {
  tdee: number;
}

const Tdee: React.FC<TdeeProps> = (props) => {
  const { tdee } = props;

  return (
    <div className="box">
      <h2 className="title is-2">Your TDEE</h2>
      <h4 className="subtitle is-4">Calculated with your recent logs</h4>
      <div className="container has-text-centered">
        <p className="subtitle is-3">
          {tdee ? (
            <strong className="has-text-primary">{tdee} kCals / Day</strong>
          ) : (
            'Not enough logs to calculate TDEE'
          )}
        </p>
      </div>
    </div>
  );
};

export default Tdee;
