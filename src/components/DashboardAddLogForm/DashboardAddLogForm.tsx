import { useFormik } from 'formik';
import React from 'react';

import { LogSchema } from '../../schema';

export interface DashboardAddLogFormState {
  date: string;
  weight: number;
  caloricIntake: number;
}

const initialValues: DashboardAddLogFormState = {
  date: new Date().toISOString().slice(0, 10),
  weight: 0,
  caloricIntake: 0
};

const DashboardAddLogForm: React.FC = () => {
  const [error, setError] = React.useState<string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: DashboardAddLogFormState) => {
    setLoading(true);
    const response = await fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setLoading(false);

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    }
  };

  const formik = useFormik({ initialValues, validationSchema: LogSchema, onSubmit });

  const submitButtonClass = `button ${error ? 'is-danger' : 'has-background-primary-dark'} ${
    loading ? 'is-loading' : ''
  }`;

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="date">
              Date
            </label>
            <div className="control">
              {/* eslint-disable-next-line jsx-a11y/autocomplete-valid */}
              <input
                className="input"
                id="date"
                name="date"
                placeholder="yyyy-mm-dd"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.date && formik.touched.date && (
              <p className="help is-danger">{formik.errors.date}</p>
            )}
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label" htmlFor="weight">
              Weight
            </label>
            <div className="control">
              <input
                className="input"
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.weight && formik.touched.weight && (
              <p className="help is-danger">{formik.errors.weight}</p>
            )}
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label" htmlFor="caloricIntake">
              Caloric Intake
            </label>
            <div className="control">
              <input
                className="input"
                id="caloricIntake"
                name="caloricIntake"
                type="number"
                value={formik.values.caloricIntake}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.caloricIntake && formik.touched.caloricIntake && (
              <p className="help is-danger">{formik.errors.caloricIntake}</p>
            )}
          </div>
        </div>
      </div>

      <div className="field ">
        <div className="control">
          <button
            className={submitButtonClass}
            disabled={formik.isSubmitting || !formik.isValid}
            type="submit">
            Add log
          </button>
        </div>
      </div>

      {error && <p className="help is-danger">{error}</p>}
    </form>
  );
};

export default DashboardAddLogForm;
