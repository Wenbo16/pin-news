import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Auth from '../Auth/Auth';
import { Errors } from '../Auth/AuthInterface'
import LoginForm from './LoginForm';


interface User {
  [index: string]: string
  email: string,
  password: string
}

interface FormState {
  user: User,
  errors: Errors
}

class LoginPage extends React.Component<RouteComponentProps, FormState> {
  // To Change
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      errors: {summary: null, email: null, password: null},
      user: {
        email: '',
        password: ''
      }
    };
  }

  processForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { user }: {user: User} = this.state;
    const { email, password }: {email: string, password: string}  = user;

    // Post login data and handle response.
    fetch(`http://${process.env.REACT_APP_WEB_SERVER_HOST}:${process.env.REACT_APP_WEB_SERVER_PORT}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          errors: {summary: null, email: null, password: null}
        });
        response.json().then(json => {
          Auth.authenticateUser(json.token, email);
          const { history } = this.props;
          history.push('/');
        });
      } else {
        console.log('Login failed');
        response.json().then(json => {
          const errors = json.errors ? json.errors : {};
          errors.summary = json.message;
          this.setState({ errors });
        });
      }
    });
  };

  changeUser = (event: React.FormEvent<HTMLFormElement>): void => {
    const { name: field, value}: {name: string, value: string} = event.target as HTMLInputElement;
    const { user } : {user: User} = this.state;
    user[field] = value;

    this.setState({
      user
    });
  };

  render() {
    const { errors }: {errors: Errors}= this.state;
    return <LoginForm onSubmit={this.processForm} onChange={this.changeUser} errors={errors} />;
  }
}

export default LoginPage;
