import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Userlist from "./containers/Userlist";
import Home from "./containers/Home";

export default function Routes(props) {
  const location = useLocation();
  return (
    props.isAuthenticated
      && location.pathname == '/login' ?
      <Redirect to= "/"/>
      :
      <Switch>
        <Route exact path="/Login" >
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/Userlist">
          <Userlist />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

  );
}