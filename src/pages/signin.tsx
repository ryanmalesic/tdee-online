import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import SigninForm from '../components/SigninForm';

const Signin: React.FC = () => {
  return (
    <BackgroundLayout>
      <div className="container">
        <div className="columns is-centered is-mobile">
          <div className="column is-full-mobile is-half-tablet">
            <div className="box">
              <h1 className="title is-1">Sign In</h1>
              <h3 className="subtitle is-3">Track your progess.</h3>
              <SigninForm />
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Signin;
