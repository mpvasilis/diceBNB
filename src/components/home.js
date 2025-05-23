import React, {useEffect, useState} from "react";
import "./home.scss";
import "aos/dist/aos.css";
import AnimatedNumber from "animated-number-react";
import iconA from "../assets/coins.svg";
import iconB from "../assets/dice.svg";
import iconC from "../assets/Group 29.svg";
import iconD from "../assets/Group 30.svg";
import {useHistory} from "react-router";
import axios from "axios";


const RightBlock = ({item, index}) => {
  const history = useHistory();
  return (
      <div
          className="right-block flex-y"
          onClick={() => history.push(`/${item.link}`)}
          style={{marginTop: index % 2 == 0 ? "50px" : "0px"}}
      >
        <div className="flex-x">
          <img src={item.icon}/>
        </div>
        <div>{item.heading}</div>
        <div>{item.description}</div>
      </div>
  );
};
const Home = () => {
  const [state, setState] = useState({
    wagers: {value: "268.72", detail: "742 bets"},
    recent: {value: "0.40", detail: "won by 0x345"},
    topwinners: [
      {id: "0x34554", value: "27.89"},
      {id: "0x34554", value: "27.89"},
      {id: "0x34554", value: "27.89"},
    ]
  });
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axios.get('https://intense-harbor-90383.herokuapp.com/api/stats').then(r => {
      state.wagers.value = r.data.wagers_24h;
      state.wagers.detail = r.data.wagers_24h_bets + " bets";
      state.recent.value = r.data.wagers_24h_jackpot;
      if (Object.keys(r.data.top_winners) !== null && Object.keys(r.data.top_winners).length > 0) {
        state.topwinners[0].id = Object.keys(r.data.top_winners)[0].substr(0, 6);
        state.topwinners[0].value = Object.values(r.data.top_winners)[0];
      }

      if (Object.keys(r.data.top_winners) !== null && Object.keys(r.data.top_winners).length > 1) {
        state.topwinners[1].id = Object.keys(r.data.top_winners)[1].substr(0, 6);
        state.topwinners[1].value = Object.values(r.data.top_winners)[1];
      }

      if (Object.keys(r.data.top_winners) !== null && Object.keys(r.data.top_winners).length > 2) {
        state.topwinners[2].id = Object.keys(r.data.top_winners)[2].substr(0, 6);
        state.topwinners[2].value = Object.values(r.data.top_winners)[2];
      }
      console.log(r.data);
      console.log(Object.keys(r.data.top_winners));
      console.log(Object.values(r.data.top_winners));
      setState(state);
      setStatus(true);

    })

  }, [])
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
            <br/>
            No sign-ups or deposits, just 1% edge jackpot
          </div>
          <div className="right flex-wrap only-mob-top">
            {rightBlocks.map((i, k) => (
                <RightBlock item={i} index={k} key={k}/>
            ))}
          </div>
          {status === true ? <div className="left-blocks">
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
              <div>Jackpot</div>
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
          </div>: <></>}
        </div>
        <div className="right flex-wrap only-mob-bottom">
          {rightBlocks.map((i, k) => (
              <RightBlock item={i} index={k} key={k}/>
          ))}
        </div>
      </div>
  );
};

export default Home;
