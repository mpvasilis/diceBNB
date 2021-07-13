import React, { Component, useEffect, useRef, useState } from "react";
import "./home.scss";
import "aos/dist/aos.css";
import AnimatedNumber from "animated-number-react";
import iconA from "../assets/coins.svg";
import iconB from "../assets/dice.svg";
import iconC from "../assets/Group 29.svg";
import iconD from "../assets/Group 30.svg";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";

const state = {
  wagers: { value: "268.72", detail: "742 bets" },
  recent: { value: "0.40", detail: "won by 0x345" },
  topwinners: [
    { id: "0x34554", value: "27.89" },
    { id: "0x34554", value: "27.89" },
    { id: "0x34554", value: "27.89" },
  ],
};
const RightBlock = ({ item, index }) => {
  const history = useHistory();
  return (
    <div
      className="right-block flex-y"
      onClick={() => history.push(`/${item.link}`)}
      style={{ marginTop: index % 2 == 0 ? "50px" : "0px" }}
    >
      <div className="flex-x">
        <img src={item.icon} />
      </div>
      <div>{item.heading}</div>
      <div>{item.description}</div>
    </div>
  );
};
const Home = () => {
  const formatValue = (value) => value.toFixed(2);

  const rightBlocks = [
    {
      icon: iconA,
      heading: "Coin Flip",
      description: "Headscr tails? Fifty - Fifty Winning bet pay upto 1.98x",
      link: "CoinFlip",
    },
    {
      icon: iconB,
      heading: "Roll a dice",
      description: "Bet on numbers 1 to 6 Winning Bet Pay upto 5.94X",
      link: "RollDice",
    },
    {
      icon: iconC,
      heading: "Two Dice",
      description: "Bet on sum 2 to 12 Winning Bet Pay upto 35.64X",
      link: "RollTwoDice",
    },
    {
      icon: iconD,
      heading: "Etheroll",
      description: "Any win chance 1% to 97% Winning Bet Pay upto 1.98X",
      link: "Etheroll",
    },
  ];
  return (
    <div className="home flex-x-between">
      <div className="left flex-y">
        <div>
          <span>Fair games</span>
          <span> that pay Ether</span>
        </div>
        <div>
          Provably bets backed by simple open-sourced contract
          <br />
          No sign-ups or deposits, just 1% edge jackpot
        </div>
        <div className="right flex-wrap only-mob-top">
          {rightBlocks.map((i, k) => (
            <RightBlock item={i} index={k} key={k} />
          ))}
        </div>
        <div className="left-blocks">
          <div className="left-block a">
            <div>24h wagers</div>
            <div>
              <span>
                <AnimatedNumber
                  value={state.wagers.value}
                  formatValue={formatValue}
                  duration={3000}
                />
              </span>
              <span> ETH</span>
            </div>
            <div>{state.wagers.detail}</div>
          </div>
          <div className="left-block b">
            <div>24h wagers</div>
            <div>
              <span>
                <AnimatedNumber
                  value={state.recent.value}
                  formatValue={formatValue}
                  duration={3000}
                />
              </span>
              <span> ETH</span>
            </div>
            <div>{state.recent.detail}</div>
          </div>
          <div className="left-block c">
            <div>24h top winners</div>
            {state.topwinners.map((i, k) => (
              <div key={k} className="items">
                <span>{i.id}</span>
                <span>
                  <AnimatedNumber
                    value={i.value}
                    formatValue={formatValue}
                    duration={3000}
                  />
                </span>
                <span>ETH</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right flex-wrap only-mob-bottom">
        {rightBlocks.map((i, k) => (
          <RightBlock item={i} index={k} key={k} />
        ))}
      </div>
    </div>
  );
};

export default Home;
