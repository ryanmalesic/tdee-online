import Link from 'next/link';
import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import Navbar from '../components/Navbar';

const SignUp: React.FC = () => {
  return (
    <>
      <Navbar />
      <BackgroundLayout>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half box">
              <div className="section">
                <h1 className="title is-1">Sign Up</h1>
                <h3 className="subtitle is-3">Start your journey.</h3>

                <div className="field is-grouped">
                  <div className="control">
                    <label className="label" htmlFor="name">
                      First Name
                    </label>
                    <div className="control">
                      <input autoComplete="given-name" className="input" id="name" type="text" />
                    </div>
                  </div>

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
                      autoComplete="new-password"
                      className="input"
                      id="password"
                      type="password"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="control">
                    <input
                      autoComplete="new-password"
                      className="input"
                      id="confirmPassword"
                      type="password"
                    />
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control is-expanded">
                    <label className="label" htmlFor="birthday">
                      Birthday
                    </label>
                    <div className="control">
                      <input autoComplete="bday" className="input" id="birthday" type="date" />
                    </div>
                  </div>

                  <div className="control">
                    <label className="label" htmlFor="sex">
                      Sex
                    </label>
                    <div className="control">
                      <div className="select">
                        <select autoComplete="sex" id="sex">
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button has-background-primary-dark">Sign Up</button>
                  </div>

                  <div className="control">
                    <Link href="/signin">
                      <a className={`button is-link`}>Already a member? Sign In.</a>
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

export default SignUp;
