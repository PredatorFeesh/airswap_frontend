import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {LandingPage} from "./Pages/LandingPage";
import {ProfilePage} from "./Pages/ProfilePage";
import {ListingsPage} from "./Pages/ListingsPage";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/listings">
        <ListingsPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
