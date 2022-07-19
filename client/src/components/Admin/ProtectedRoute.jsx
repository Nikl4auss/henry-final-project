import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Loader } from "./loader";

export const ProtectedRoute = ({ component }) => {
  let url = window.location.pathname

  const Component = withAuthenticationRequired(component, {
    returnTo: url,
    onRedirecting: () => <Loader />,
  });

  return <Component />;
};