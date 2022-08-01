import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const roleCalimType = "https://henry-final-project.vercel.app/roles";

export function withRoleBasedRedirect(Component, options) {
  return function WithRoleBasedRedirect(props) {
    const navigate = useNavigate();
    const { getIdTokenClaims } = useAuth0();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      async function getRoles() {
        const claims = await getIdTokenClaims();
        return claims[roleCalimType] || [];
      }

      async function checkRoles(role) {
        const roles = await getRoles();
        const isAuthorized = roles.includes(role);
        if (!isAuthorized) {
          navigate(`/sin-autorizacion`);
        }
        setIsAuthorized(true);
      }

      checkRoles(options.role);
    }, [getIdTokenClaims, navigate]);

    if (!isAuthorized) {
      return <div></div>;
    }

    return <Component {...props} />;
  };
}
