import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import {DOMAIN, CLIENT_ID, AUDIENCE, REDIRECT_URI} from '../../utils/config'
const Auth0ProviderWithHistory = ({ children }) => {
    const history = useNavigate();

    const onRedirectCallback = (appState) => {
        history(appState?.returnTo || window.location.pathname)
    };

    return (
        <Auth0Provider
        domain={DOMAIN}
        clientId={CLIENT_ID}
        redirectUri={REDIRECT_URI}
        cacheLocation="localstorage"
        onRedirectCallback={onRedirectCallback}
        audience={AUDIENCE}
        >
            {children}
        </Auth0Provider>
    )
}
export default Auth0ProviderWithHistory;