import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

import { Sex } from '../../types';

export interface SignupFormProps {
  error: string;
  loading: boolean;
  onSubmit: (values: SignupFormState) => void;
}

export type SignupFormState = {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
  sex: Sex;
};

const initialValues: SignupFormState = {
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: '',
  sex: Sex.Male
};

const SignupForm: React.FC<SignupFormProps> = (props: SignupFormProps) => {
  const { error, loading, onSubmit } = props;

  const validationSchema = Yup.object<SignupFormState>({
    firstName: Yup.string().required('First name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    birthdate: Yup.string()
      .test('date-valid', 'Date must be in the format yyyy-mm-dd', (value) => {
        if (!value) {
          return false;
        }

        const regEx = /^\d{4}-\d{2}-\d{2}$/;

        if (!value.match(regEx)) {
          return false;
        }

        const date = new Date(value);
        const dateTime = date.getTime();

        if (!dateTime && dateTime !== 0) {
          return false;
        }

        return value === date.toISOString().slice(0, 10);
      })
      .required('Birthdate is required'),
    sex: Yup.string().oneOf([Sex.Male, Sex.Female]).required('Sex is required')
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const submitButtonClass = `button ${error ? 'is-danger' : 'has-background-primary-dark'} ${
    loading ? 'is-loading' : ''
  }`;

  return (
    <form onSubmit={formik.handleSubmit}>
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
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.firstName && formik.touched.firstName && (
            <p className="help is-danger">{formik.errors.firstName}</p>
          )}
        </div>

        <div className="control is-expanded">
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

      <div className="field is-grouped">
        <div className="control">
          <button className={submitButtonClass} disabled={formik.isSubmitting} type="submit">
            Sign Up
          </button>
        </div>

        <div className="control">
          <Link href="/signin">
            <a className={`button is-link`}>Already a member? Sign In.</a>
          </Link>
        </div>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </form>
  );
};

export default SignupForm;
