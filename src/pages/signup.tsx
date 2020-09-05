import _ from 'lodash';
import Router from 'next/router';
import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import SignupForm, { SignupFormState } from '../components/SignupForm';

const SignUp: React.FC = () => {
  const [error, setError] = React.useState<string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: SignupFormState) => {
    setLoading(true);
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(_.omit(values, ['confirmPassword'])),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setLoading(false);

    const json = await response.json();

    if (response.ok) {
      await Router.push('/signin');
    } else {
      setError(json.message);
    }
  };

  return (
    <BackgroundLayout>
      <div className="container">
        <div className="columns is-centered is-mobile">
          <div className="column is-full-mobile is-half-tablet">
            <div className="box">
              <h1 className="title is-1">Sign Up</h1>
              <h3 className="subtitle is-3">Start your journey.</h3>
              <SignupForm error={error} loading={loading} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default SignUp;
