import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export interface DashboardAddLogFormProps {
  error: string | null;
  loading: boolean;
  onSubmit: (values: DashboardAddLogFormState) => void;
}

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

const DashboardAddLogForm: React.FC<DashboardAddLogFormProps> = (props) => {
  const { error, loading, onSubmit } = props;

  const validationSchema = Yup.object<DashboardAddLogFormState>({
    date: Yup.string()
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
      .required('Date is required'),
    weight: Yup.number().positive('Weight must be a positive value').required('Weight is required'),
    caloricIntake: Yup.number()
      .integer('Caloric intake must be an integer value')
      .min(0, 'Caloric intake must greater than or equal to 0')
      .required('Caloric intake is required')
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const submitButtonClass = `button ${error ? 'is-danger' : 'has-background-primary-dark'} ${
    loading ? 'is-loading' : ''
  }`;

  return (
    <form onSubmit={formik.handleSubmit}>
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
          <button className={submitButtonClass} disabled={formik.isSubmitting} type="submit">
            Add log
          </button>
        </div>
      </div>

      {error && <p className="help is-danger">{error}</p>}
    </form>
  );
};

export default DashboardAddLogForm;
