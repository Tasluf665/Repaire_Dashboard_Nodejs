import React from "react";

import "./layout.css";

import Sidebar from "../sidebar/Sidebar";
import Routes from "../Routes";
import Topnav from "../TopNav/Topnav";
import AccountPopover from "../TopNav/AccountProvider";
import { AuthProvider } from "../../context/AuthContext";

import { BrowserRouter, Route } from "react-router-dom";

const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout`}>
            {props.location.pathname !== "/login" &&
            props.location.pathname !== "/signup" &&
            props.location.pathname !== "/forgot-password" ? (
              <AuthProvider>
                <Sidebar {...props} />
                <div className="layout__content">
                  <div className="topnav" style={{ display: "block" }}>
                    <div
                      style={{
                        float: "right",
                      }}
                    >
                      <AccountPopover />
                    </div>
                  </div>
                  <div className="layout__content-main">
                    <Routes />
                  </div>
                </div>
              </AuthProvider>
            ) : (
              <AuthProvider>
                <Routes />
              </AuthProvider>
            )}
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
