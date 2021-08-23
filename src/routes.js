import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Edit_client from "./Edit_client";
import DisplayAll from "./components/DisplayAll";

function routes(props) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/users/:id" component={Edit_client} />
          <Route exact path="/" component={DisplayAll} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default routes;
