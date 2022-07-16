import React from "react";

import { Route, Switch } from "react-router-dom";

import Agents from "../pages/Agents/Agents";
import AddAgents from "../pages/Agents/AddAgents";
import UpdateAgents from "../pages/Agents/UpdateAgents";
import Technician from "../pages/Technician/Technician";
import AddTechnician from "../pages/Technician/AddTechnician";
import UpdateTechnician from "../pages/Technician/UpdateTechnician";
import Orders from "../pages/Orders/Orders";
import UpdateOrder from "../pages/Orders/UpdateOrder";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Agents} />
      <PrivateRoute path="/agents" component={Agents} />
      <PrivateRoute path="/addagents" component={AddAgents} />
      <PrivateRoute path="/updateagents" component={UpdateAgents} />
      <PrivateRoute path="/technician" component={Technician} />
      <PrivateRoute path="/addtechnician" component={AddTechnician} />
      <PrivateRoute path="/updatetechnician" component={UpdateTechnician} />
      <PrivateRoute path="/orders" component={Orders} />
      <PrivateRoute path="/updateorder" component={UpdateOrder} />
      <Route path={"/login"} component={Login} />
      <Route path={"/signup"} component={Signup} />
      <Route path={"/forgot-password"} component={ForgotPassword} />
    </Switch>
  );
};

export default Routes;
