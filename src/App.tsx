/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import "./App.css";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (options: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (callback: (response: any) => void, options: any) => void;
      getLoginStatus: (callback: (response: any) => void) => void;
      logout: (callback: (response: any) => void) => void;
    };
  }
}

function App() {
  const appId = import.meta.env.VITE_CLIENT_ID;
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const responseType = import.meta.env.VITE_RESPONSE_TYPE;
  const scope = import.meta.env.VITE_APP_SCOPE;

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: appVersion,
      });
    };

    (function (d: Document, s: string, id: string) {
      let js = d.createElement(s) as HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, [appId, appVersion]);

  const login = () => {
    (window.FB as any).login(
      (response: any) => {
        if (response.authResponse) {
          // Success callback
          console.log("Logged in successfully!", response);
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: scope,
        redirect_uri: redirectUri,
        response_type: responseType,
        auth_type: "rerequest",
        display: "popup", // "display" must be one of "popup", "dialog", "iframe", "touch"
        return_scopes: true,
        auth_revoke: true,
        enable_profile_selector: true,
      }
    );
  };

  const status = () => {
    (window.FB as any).getLoginStatus(function (response: any) {
      statusChangeCallback(response);
    });
  };

  const logout = () => {
    (window.FB as any).logout(function (response: any) {
      statusChangeCallback(response);
    });
  };

  const statusChangeCallback = (response: any) => {
    console.log(response);
  };

  return (
    <div style={{ display: "flex", columnGap: "0.5rem" }}>
      <button type="button" onClick={login}>
        Login
      </button>
      <button type="button" onClick={status}>
        Status
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default App;
