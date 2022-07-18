import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = 'dev-a6gv3ggc.us.auth0.com';
    const clientId = 'lYYnCzrqH2clZw5C6FiRsJA6jAPInZmG';
    const history = useNavigate();

    const onRedirectCallback = (appState) => {
        history(appState?.returnTo || window.location.pathname)
    };

    return (
        <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri='http://localhost:3000/home'
        cacheLocation="localstorage"
        onRedictCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}
export default Auth0ProviderWithHistory;