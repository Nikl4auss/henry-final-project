import { withAuthenticationRequired } from "@auth0/auth0-react";
import { withRoleBasedRedirect } from "./WithRoleBasedRedirect";

import { Loader } from "./loader";

export const ProtectedRoute = ({ component, role, ...args }) => {
  let url = window.location.pathname;

  if (role) {
    console.log("you are here");
    const Component = withAuthenticationRequired(
      withRoleBasedRedirect(component, { role }),
      {
        onRedirecting: () => <Loader />,
      }
    );

    return <Component {...args} />;
  } else {
    const Component = withAuthenticationRequired(component, {
      returnTo: url,
      onRedirecting: () => <Loader />,
    });

    return <Component {...args} />;
  }
};
