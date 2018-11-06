import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token){
       return false;
    }
    return true;
  }
  
  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login'}} />
        )
    )} />
  );

  export default AuthRoute;