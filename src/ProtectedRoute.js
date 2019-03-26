import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from './UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <UserConsumer>
    {({ isAuth }) => (
      <Route
        render={
          props =>
            isAuth 
            ? <Component {...props} /> 
            : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </UserConsumer>
)

export default ProtectedRoute;