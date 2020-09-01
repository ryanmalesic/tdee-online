import Link from 'next/link';
import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import Navbar from '../components/Navbar';
import { Sex } from '../types';

type FormState = {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
  sex: Sex;
};

const initialFormState: FormState = {
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: '',
  sex: Sex.Male
};

const SignUp: React.FC = () => {
  const [formState, setFormState] = React.useState<FormState>(initialFormState);

  const isValidFormState = (): boolean => {
    const { firstName, email, password, confirmPassword, birthdate, sex } = formState;

    return (
      !!firstName &&
      !!email &&
      !!password &&
      !!confirmPassword &&
      !!birthdate &&
      !!sex &&
      password === confirmPassword
    );
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleOnSignUpClick = () => {
    if (isValidFormState()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...noConfirmPassword } = formState;
      fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify(noConfirmPassword),
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
                <h1 className="title is-1">Sign Up</h1>
                <h3 className="subtitle is-3">Start your journey.</h3>

                <div className="field is-grouped">
                  <div className="control">
                    <label className="label" htmlFor="firstName">
                      First Name
                    </label>
                    <div className="control">
                      <input
                        autoComplete="given-name"
                        className="input"
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formState.firstName}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>

                  <div className="control is-expanded">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <div className="control">
                      <input
                        autoComplete="username"
                        className="input"
                        id="email"
                        name="email"
                        type="text"
                        value={formState.email}
                        onChange={handleOnChange}
                      />
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
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleOnChange}
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
                      name="confirmPassword"
                      type="password"
                      value={formState.confirmPassword}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control is-expanded">
                    <label className="label" htmlFor="birthdate">
                      Birthdate
                    </label>
                    <div className="control">
                      <input
                        autoComplete="bday"
                        className="input"
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value={formState.birthdate}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>

                  <div className="control">
                    <label className="label" htmlFor="sex">
                      Sex
                    </label>
                    <div className="control">
                      <div className="select">
                        <select
                          autoComplete="sex"
                          id="sex"
                          name="sex"
                          value={formState.sex}
                          onBlur={handleOnChange}
                          onChange={handleOnChange}>
                          <option value={Sex.Male}>Male</option>
                          <option value={Sex.Female}>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="button has-background-primary-dark"
                      onClick={handleOnSignUpClick}>
                      Sign Up
                    </button>
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
