import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import SignupForm from '../components/SignupForm';

const SignUp: React.FC = () => {
  return (
    <BackgroundLayout>
      <div className="container">
        <div className="columns is-centered is-mobile">
          <div className="column is-full-mobile is-half-tablet">
            <div className="box">
              <h1 className="title is-1">Sign Up</h1>
              <h3 className="subtitle is-3">Start your journey.</h3>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default SignUp;
