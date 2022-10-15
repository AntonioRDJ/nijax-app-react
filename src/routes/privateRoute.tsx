import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useAppSelector } from "../store";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.FC<RouteComponentProps>;
}

export function PrivateRoute({component: Component, ...rest}: PrivateRouteProps) {
  const loggedIn = useAppSelector(state => state.user.loggedIn);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props}/>
        ) : ( 
          <Redirect to="/" />
        )
      }
    />
  );
};