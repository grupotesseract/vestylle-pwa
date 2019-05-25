import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from './UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <UserConsumer>
    { ({ isAuth, loadFromLocalStorage }) => {

    if(!isAuth) {
      let auth = loadFromLocalStorage()
      return (
        <Route
          render={
            props =>
              auth 
              ? <Component {...props} /> 
              : <Redirect to="/cadastro" />
          }
          {...rest}
        />
      )
    } else {
      return (
      <Route
        render={
          props =>
            isAuth 
            ? <Component {...props} /> 
            : <Redirect to="/cadastro" />
        }
        {...rest}
      />
      )
    }
    }}
  </UserConsumer>
)

export default ProtectedRoute;