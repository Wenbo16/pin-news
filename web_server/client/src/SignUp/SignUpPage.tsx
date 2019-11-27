import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Errors } from '../Auth/AuthInterface'
import SignUpForm from './SignUpForm';

interface User {
  [index: string]: string
  email: string,
  password: string,
  confirmPassword: string
}

interface SignUpFormState {
  user: User,
  errors: Errors
}

class SignUpPage extends React.Component<RouteComponentProps, SignUpFormState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      errors: {summary: null, email: null, password: null},
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  processForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { user }: {user: User} = this.state;
    const { email, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      return;
    }

    // Post signup data and handle response.
    // Post registeration data
    fetch('http://localhost:8080/auth/signup', {
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
          errors: {summary: null, email: null, password: null},
        });
        const { history } = this.props;
        // TODO: sign up return token
        history.push('/login');
      } else {
        response.json().then(json => {
          const errors: Errors = json.errors ? json.errors : {};
          errors.summary = json.message;
          this.setState({ errors });
        });
      }
    });
  };

  changeUser = (event: React.FormEvent<HTMLFormElement>) => {
    const { name: field, value}: {name: string, value: string} = event.target as HTMLInputElement;
    const { user, errors }: {user: User , errors: Errors}= this.state;
    user[field] = value;

    this.setState({
      user
    });

    if (user.password !== user.confirmPassword) {
      errors.password = "Password and Confirm Password don't match.";
      this.setState({ errors });
    } else {
      errors.password = '';
      this.setState({ errors });
    }
  };

  render() {
    const { errors } = this.state;

    return <SignUpForm onSubmit={this.processForm} onChange={this.changeUser} errors={errors} />;
  }
}

export default SignUpPage;
