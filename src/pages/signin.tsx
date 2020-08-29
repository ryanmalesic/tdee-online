import Link from 'next/link';
import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import Navbar from '../components/Navbar';

const Signin: React.FC = () => {
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

                <div className="field">
                  <div className="control is-expanded">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <div className="control">
                      <input autoComplete="username" className="input" id="email" type="text" />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="control">
                    <input
                      autoComplete="current-password"
                      className="input"
                      id="password"
                      type="password"
                    />
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button has-background-primary-dark">Sign In</button>
                  </div>

                  <div className="control">
                    <Link href="/signup">
                      <a className={`button is-link`}>Don&apos;t have an account? Sign Up.</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundLayout>
    </>
  );
};

export default Signin;
