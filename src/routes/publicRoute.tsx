import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useAppSelector } from "../store";

interface PublicRouteProps extends Omit<RouteProps, "component"> {
  component: React.FC<RouteComponentProps>;
  restricted: boolean;
}

export function PublicRoute({component: Component ,restricted, ...rest}: PublicRouteProps) {
  const loggedIn = useAppSelector(state => state.user.loggedIn);

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        loggedIn && restricted ? (
          <Redirect to="/app/home" />
        ) : ( 
          <Component {...props}/>
        )
      }
    />
  );
};