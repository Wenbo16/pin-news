import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Base from './Base/Base.tsx'
import App from './App/App';
import LoginPage from './Login/LoginPage.tsx';
import SignUpPage from './SignUp/SignUpPage.tsx';
import Auth from './Auth/Auth.ts';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isUserAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}


const routes = () => (
  <Router>
    <Base />
    <Switch>
      <ProtectedRoute path="/" exact component={App} />
      <Route path="/login/" component={LoginPage} />
      <Route path="/signup/" component={SignUpPage} />
      <Route
        path="/logout"
        render={() => {
          Auth.signoutUser();
          return <Redirect to="/" />;
        }}
      />
    </Switch>
  </Router>
);

export default routes;
