import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {LandingPage} from "./Pages/LandingPage";
import {ProfilePage} from "./Pages/ProfilePage";
import {ListingsPage} from "./Pages/ListingsPage";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {Logout} from "./Pages/Logout";
import {ViewRequests} from './Pages/ViewRequests';
import {ViewRequested} from './Pages/ViewRequested';

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
      <Route exact path="/profile/:id" component={ProfilePage} /> {/*Note -1 for self*/}
      <Route exact path="/listings">
        <ListingsPage />
      </Route>
      <Route exact path="/view_requests">
        <ViewRequests />
      </Route>
      <Route exact path="/view_requested">
        <ViewRequested />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
