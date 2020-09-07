import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { UserSchema } from '../../schema';
import { Sex } from '../../types';

export interface SignupFormState {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
  sex: Sex;
}

const initialValues: SignupFormState = {
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: '',
  sex: Sex.Male
};

const SignupForm: React.FC = () => {
  const router = useRouter();

  const [error, setError] = React.useState<string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: SignupFormState) => {
    setLoading(true);
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setLoading(false);

    const json = await response.json();

    if (response.ok) {
      await router.push('/signin');
    } else {
      setError(json.message);
    }
  };

  const formik = useFormik({ initialValues, validationSchema: UserSchema, onSubmit });

  const submitButtonClass = `button ${error ? 'is-danger' : 'has-background-primary-dark'} ${
    loading ? 'is-loading' : ''
  }`;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="columns">
        <div className="column">
          <div className="field">
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
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.firstName && formik.touched.firstName && (
              <p className="help is-danger">{formik.errors.firstName}</p>
            )}
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control">
              {/* eslint-disable-next-line jsx-a11y/autocomplete-valid */}
              <input
                autoComplete="username"
                className="input"
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="help is-danger">{formik.errors.email}</p>
            )}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <p className="help is-danger">{formik.errors.password}</p>
        )}
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
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <p className="help is-danger">{formik.errors.confirmPassword}</p>
        )}
      </div>

      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="birthdate">
              Birthdate
            </label>
            <div className="control">
              <input
                autoComplete="bday"
                className="input"
                id="birthdate"
                name="birthdate"
                placeholder="yyyy-mm-dd"
                type="date"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.birthdate && formik.touched.birthdate && (
              <p className="help is-danger">{formik.errors.birthdate}</p>
            )}
          </div>
        </div>

        <div className="column is-narrow">
          <div className="field">
            <label className="label" htmlFor="sex">
              Sex
            </label>
            <div className="control">
              <div className="select">
                <select
                  autoComplete="sex"
                  id="sex"
                  name="sex"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                  <option value={Sex.Male}>Male</option>
                  <option value={Sex.Female}>Female</option>
                </select>
              </div>
            </div>
            {formik.errors.sex && formik.touched.sex && (
              <p className="help is-danger">{formik.errors.sex}</p>
            )}
          </div>
        </div>
      </div>

      <div className="field">
        <div className="columns is-variable is-0-mobile is-3-tablet">
          <div className="column is-narrow">
            <div className="control">
              <button className={submitButtonClass} disabled={formik.isSubmitting} type="submit">
                Sign Up
              </button>
            </div>
          </div>
          <div className="column">
            <Link href="/signin">
              <a className={`button is-link`}>Already a member? Sign In.</a>
            </Link>
          </div>
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </form>
  );
};

export default SignupForm;
