import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...otherArgs }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...otherArgs}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
