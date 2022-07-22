import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Agents from "../pages/Agents/Agents";
import AddAgents from "../pages/Agents/AddAgents";
import UpdateAgents from "../pages/Agents/UpdateAgents";
import Technician from "../pages/Technician/Technician";
import AddTechnician from "../pages/Technician/AddTechnician";
import UpdateTechnician from "../pages/Technician/UpdateTechnician";
// import Orders from "../pages/Orders/Orders";
// import UpdateOrder from "../pages/Orders/UpdateOrder";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import PrivateRoute from "./PrivateRoute";

import { useAuth } from "../context/AuthContext";

const Routes = () => {
  const { currentUser } = useAuth();
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Agents} />
      <PrivateRoute path="/agents" component={Agents} />
      <PrivateRoute path="/addagents" component={AddAgents} />
      <PrivateRoute path="/updateagents" component={UpdateAgents} />
      <PrivateRoute path="/technician" component={Technician} />
      <PrivateRoute path="/addtechnician" component={AddTechnician} />
      <PrivateRoute path="/updatetechnician" component={UpdateTechnician} />
      {/*<PrivateRoute path="/orders" component={Orders} />
      <PrivateRoute path="/updateorder" component={UpdateOrder} /> */}
      <Route path={"/login"}>
        {currentUser ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path={"/signup"}>
        {currentUser ? <Redirect to="/" /> : <Signup />}
      </Route>
      <Route path={"/forgot-password"}>
        {currentUser ? <Redirect to="/" /> : <ForgotPassword />}
      </Route>
    </Switch>
  );
};

export default Routes;
