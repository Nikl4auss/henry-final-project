import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Loader } from "./loader";

export const ProtectedRoute = ({ component }) => {
  let url = 'http://localhost:3000/nuevoproducto'

  const Component = withAuthenticationRequired(component, {
    returnTo: 'http://localhost:3000/nuevoproducto',
    onRedirecting: () => <Loader />,
  });

  return <Component />;
};