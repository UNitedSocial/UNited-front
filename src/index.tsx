import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const domain = "dev-nj72nakbgyv4edeo.us.auth0.com";
const clientID = "rWTnXxPVrBR2IMBDLXhmx7BByyOn98k0";
const audience = "UNited-API";

root.render(
  <React.StrictMode>
      <Auth0Provider
            domain={domain}
            clientId={clientID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: audience
            }}
      >
          <App />
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
