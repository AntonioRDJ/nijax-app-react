import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useAppSelector } from "../store";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.FC<RouteComponentProps>;
  onlyProvider?: boolean;
}

export function PrivateRoute({component: Component, onlyProvider, ...rest}: PrivateRouteProps) {
  const isProvider = useAppSelector(state => state.user.isProvider);

  const canView = !onlyProvider || (onlyProvider && isProvider);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        canView ? (
          <Component {...props}/>
        ) : ( 
          <Redirect to="/app/home" />
        )
      }
    />
  );
};