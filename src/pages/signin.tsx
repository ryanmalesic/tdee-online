import Router from 'next/router';
import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import Navbar from '../components/Navbar';
import SigninForm, { SigninFormState } from '../components/SigninForm';

const Signin: React.FC = () => {
  const [error, setError] = React.useState<string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: SigninFormState) => {
    setLoading(true);
    const response = await fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setLoading(false);

    const json = await response.json();

    if (response.ok) {
      await Router.push('/dashboard');
    } else {
      setError(json.message);
    }
  };

  return (
    <>
      <Navbar />
      <BackgroundLayout>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half box">
              <div className="section">
                <h1 className="title is-1">Sign In</h1>
                <h3 className="subtitle is-3">Track your progress.</h3>
                <SigninForm error={error} loading={loading} onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </div>
      </BackgroundLayout>
    </>
  );
};

export default Signin;
