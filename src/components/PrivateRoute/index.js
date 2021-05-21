import React from "react";
import { Route, Redirect } from "react-router-dom";

import utils from "../../lib/utils";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      utils.isAuthd() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
