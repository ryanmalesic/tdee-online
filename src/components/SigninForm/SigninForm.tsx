import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

export interface SigninFormProps {
  error: string;
  loading: boolean;
  onSubmit: (values: SigninFormState) => void;
}

export type SigninFormState = {
  email: string;
  password: string;
};

const initialValues: SigninFormState = {
  email: '',
  password: ''
};

const SigninForm: React.FC<SigninFormProps> = (props) => {
  const { error, loading, onSubmit } = props;

  const validationSchema = Yup.object<SigninFormState>({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const submitButtonClass = `button ${error ? 'is-danger' : 'has-background-primary-dark'} ${
    loading ? 'is-loading' : ''
  }`;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="field">
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

      <div className="field is-grouped">
        <div className="control">
          <button className={submitButtonClass} disabled={formik.isSubmitting} type="submit">
            Sign In
          </button>
        </div>

        <div className="control">
          <Link href="/signup">
            <a className={`button is-link`}>Don&apos;t have an account? Sign Up.</a>
          </Link>
        </div>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </form>
  );
};

export default SigninForm;
