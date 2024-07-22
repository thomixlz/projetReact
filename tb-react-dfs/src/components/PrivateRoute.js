import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
