import React from 'react';
import { Link } from 'react-router-dom';
import { Errors } from '../Auth/AuthInterface'

import './SignUpForm.css';

type SignUpFormProps = {
  onSubmit: (e: any) => void;
  onChange: (e: any) => void;
  errors: Errors;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onChange, errors }) => (
  <div className="container">
    <div className="card-panel signup-panel">
      <form className="col s12" action="/" onSubmit={onSubmit}>
        <h4 className="center-align">Sign Up</h4>
        {errors.summary && (
          <div className="row">
            <p className="error-message">{errors.summary}</p>
          </div>
        )}
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" name="email" className="validate" onChange={onChange} />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        {errors.email && (
          <div className="row">
            <p className="error-message">{errors.email}</p>
          </div>
        )}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              name="password"
              className="validate"
              onChange={onChange}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        {errors.password && (
          <div className="row">
            <p className="error-message">{errors.password}</p>
          </div>
        )}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="validate"
              onChange={onChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
        </div>
        <div className="row right-align">
          <input
            type="submit"
            className="waves-effect waves-light btn indigo lighten-1"
            value="Sign Up"
          />
        </div>
        <div className="row">
          <p className="right-align">
            {' '}
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
);

export default SignUpForm;
