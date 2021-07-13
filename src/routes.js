import React, { Component, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.scss";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import CoinFlip from "./components/coinFlip";
import Etheroll from "./components/Etheroll";
import Faq from "./components/faq";

import Home from "./components/home";
import RollDice from "./components/rollDice";
import RollTwoDice from "./components/rollTwoDice";

const PageNotFound = () => {
  return <h1>Page Not Found</h1>;
};

const Routes = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("ds");
  }, [location]);

  return (
    <div className="main-body">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/Home" />} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/CoinFlip" component={CoinFlip} />
        <Route exact path="/RollDice" component={RollDice} />
        <Route exact path="/RollTwoDice" component={RollTwoDice} />
        <Route exact path="/Etheroll" component={Etheroll} />
        <Route exact path="/FAQ" component={Faq} />

        <Route exact path="*" render={() => <Redirect to="/404" />} />
        <Route path="/404" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
