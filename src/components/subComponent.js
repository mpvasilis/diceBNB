import { isTerminatorless } from "@babel/types";
import React, { Component, useState } from "react";
import arrowIco from "../assets/arrow.svg";
import { ReactComponent as Img5 } from "../assets/Coin.svg";
import arrowDown from "../assets/expand_arrow.svg";
import TwoDiceIcon from "../assets/Dice2.svg";
import { ReactComponent as Dragger } from "../assets/Dragger.svg";
import coinsideA from "../assets/Clover.svg";
import DotImg from "../assets/dot.svg";
import AvtarIco from "../assets/avatar.svg";

import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

import "./subComponent.scss";

export const openLink = (link) => {};

export const ImgIco = () => {
  return (
    <div>
      <Img5 />
    </div>
  );
};

export const DiceIco = ({ value }) => {
  const Elements = [];

  for (var i = 0; i < value; i++) {
    Elements.push(<img src={DotImg} />);
  }
  return <div className={"dice dice" + value}>{Elements}</div>;
};

export const TwoDiceIco = ({ value }) => {
  return (
    <div className={"two-dice"}>
      <img src={TwoDiceIcon} /> <span>{value}</span>
    </div>
  );
};

export const coinsArrFlip = [
  { index: 0, element: <ImgIco />, value: 1, selected: false },
  { index: 1, element: <img src={coinsideA} />, value: 2, selected: true },
];

export const coinsArrRollDice = [
  { index: 0, element: <DiceIco value={1} />, value: 1, selected: true },
  { index: 1, element: <DiceIco value={2} />, value: 2, selected: false },
  { index: 2, element: <DiceIco value={3} />, value: 3, selected: false },
  { index: 3, element: <DiceIco value={4} />, value: 4, selected: false },
  { index: 4, element: <DiceIco value={5} />, value: 5, selected: false },
  { index: 5, element: <DiceIco value={6} />, value: 6, selected: false },
];

export const coinsArrRollTwoDice = [
  { index: 0, element: <TwoDiceIco value={1} />, value: 1, selected: true },
  { index: 1, element: <TwoDiceIco value={2} />, value: 2, selected: false },
  { index: 2, element: <TwoDiceIco value={3} />, value: 3, selected: false },
  { index: 3, element: <TwoDiceIco value={4} />, value: 4, selected: false },
  { index: 4, element: <TwoDiceIco value={5} />, value: 5, selected: false },
  { index: 5, element: <TwoDiceIco value={6} />, value: 6, selected: false },
  { index: 6, element: <TwoDiceIco value={7} />, value: 7, selected: false },
  { index: 7, element: <TwoDiceIco value={8} />, value: 8, selected: false },
  { index: 8, element: <TwoDiceIco value={9} />, value: 9, selected: false },
  { index: 9, element: <TwoDiceIco value={10} />, value: 10, selected: false },
  { index: 10, element: <TwoDiceIco value={11} />, value: 11, selected: false },
  { index: 11, element: <TwoDiceIco value={12} />, value: 12, selected: false },
];

export const DetailsComp = ({ item, index }) => {
  const classes = ["a", "b", "c", "d"];
  return (
    <div className={"details-comp " + classes[index]}>
      <div>{item.heading}</div>
      <div>
        <span>{item.value}</span> {item.param}
      </div>
      <div>{item.des}</div>
    </div>
  );
};

export const DetailsCompAll = ({ items, style }) => {
  return (
    <div className="details-comp-all" style={style} data-aos="fade-in">
      {items.map((i, k) => (
        <>
          <DetailsComp index={k} key={k} item={i} />
          {k == 1 && (
            <div className="only-mob-view flex-x">
              <span>
                {items[0].value} {items[0].param}
              </span>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export const GoBack = ({ onClick, historyView }) => {
  return (
    <div className={"history"} style={{ marginTop: historyView ? "" : "40px" }}>
      <span onClick={onClick}>
        <img
          src={arrowIco}
          style={{ transform: historyView ? "rotate(180deg)" : "" }}
        />
        <span>history</span>
      </span>
    </div>
  );
};

const rowData = {
  address: "0x475d06485090172f8374fb4edf45735f9d394993",
  bet: "1.000ETH",
  betOn: 6,
  betTrx: "0x06bdc2d6740cc63bf8540d13543b888ac99f69809c075sdj",
};

const CoinIcon = ({ data, page, type }) => {
  let arr = [];
  if (type == "a" && page == "RollTwoDice") return data.join();
  switch (page) {
    case "CoinFlip":
      arr = coinsArrFlip;
      break;
    case "RollDice":
      arr = coinsArrRollDice;
      break;
    case "RollTwoDice":
      arr = coinsArrRollDice;
      break;

    default:
      arr = [];
      break;
  }

  return data.map((x, y) => arr.filter((i, k) => x == i.value)[0].element);
};

export const Table = ({ headers, data, setOpened, page }) => {
  return (
    <div className="table-class">
      <div className="header">
        {headers.map((i, k) => (
          <div key={k}>{i.header}</div>
        ))}
      </div>
      <div className="body">
        {data.map((i, k) => (
          <>
            <div
              className="item"
              key={k}
              style={{ color: i.opened ? "#ff6d17b0" : "inherit" }}
              onClick={() => setOpened(k, { ...i, opened: !i.opened })}
            >
              <div>
                <img
                  src={`https://avatars.dicebear.com/api/identicon/${i.player}.svg`}
                  className="avtar-ico"
                />
                {i.player}
              </div>
              <div className="flex">
                {i.bet}
                <div className="bet-arr">
                  {i.betArr && (
                    <CoinIcon data={i.betArr} page={page} type={"a"} />
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="result-arr">
                  {i.resultArr && (
                    <CoinIcon data={i.resultArr} page={page} type={"b"} />
                  )}
                </div>
                {i.result}
              </div>
              <div className="last-column">{i.jackpot}</div>

              <img
                src={arrowDown}
                style={{
                  transform: i.opened ? "rotate(0deg)" : "rotate(-90deg)",
                }}
              />
            </div>
            {i.opened && (
              <div
                className="details"
                onClick={() => setOpened(k, { ...i, opened: !i.opened })}
              >
                {Object.keys(rowData).map((m, n) => (
                  <div className="block flex">
                    <div>{m}</div>
                    <div>{rowData[m]}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export const BorderBlock = ({ children, className, style }) => {
  return (
    <div
      className={"border-block " + className}
      style={style}
      // data-aos="fade-in"
    >
      {children}
    </div>
  );
};

const SliderWithTooltip = createSliderWithTooltip(Slider);

export const SliderComp = ({ value, setDraggerVal }) => (
  <div className="slider-comp">
    <SliderWithTooltip
      value={[value]}
      onChange={(val) => setDraggerVal(val)}
      trackStyle={{
        backgroundImage: "linear-gradient(to right, #ff6002, #c22de1)",
        height: "44px",
        borderRadius: "10px",
      }}
      railStyle={{
        height: "44px",
        background: "#25123D",
        border: "2px solid #9B33CD",
        borderRadius: "10px",
      }}
      handleStyle={{ height: "24px", width: "24px" }}
    />
    <div className="slider-dots">
      <span>0%</span>
      <span>50%</span>
      <span>100%</span>
    </div>
  </div>
);

export const Button = ({ value, onClick, balance }) => {
  return (
    <div
      className="value-button"
      onClick={() => {
        if (value == "max") onClick(balance);
        else onClick(value);
      }}
    >
      {value}
    </div>
  );
};

export const BetBlock = ({ value, onClick }) => {
  const increment = (val) => {
    onClick(+(+value + +val).toFixed(2));
  };
  return (
    <div className="bet-block">
      <div></div>
      <div className="bet-buttons flex-x">
        <div className="bet-input flex-x">
          <div className="flex-x">
            <span onClick={() => increment(-0.01)}>-</span>
            <input
              value={value}
              onChange={(e) => {
                var regexp = /^[0-9]*(\.[0-9]{0,2})?$/;
                if (regexp.test(e.target.value)) onClick(e.target.value);
              }}
            />
            <span onClick={() => increment(0.01)}>+</span>
          </div>
        </div>
        <div className="bet-submit flex-x">BET</div>
      </div>
    </div>
  );
};

export const CoinsBlock = ({ coins, className, setCoins }) => {
  const setSelectedCoins = (index) => {
    let dummy = coins;
    const selected = coins.filter((i, k) => i.selected);

    if (selected.length == 1 && selected[0].index == index) return;
    dummy = dummy.map((i, k) => {
      return index == k ? { ...i, selected: !i.selected } : i;
    });

    if (dummy.filter((i, k) => i.selected).length == coins.length) {
      if (index == 0)
        dummy = dummy.map((i, k) => {
          return k == dummy.length - 1 ? { ...i, selected: false } : i;
        });
      else
        dummy = dummy.map((i, k) => {
          return k == 0 ? { ...i, selected: false } : i;
        });
    }

    setCoins(dummy);
  };

  return (
    <div className={"coins-block " + className}>
      {coins.map((i, k) => (
        <div
          className={i.selected ? "selected" : "disabled"}
          key={k}
          onClick={() => {
            setSelectedCoins(k);
          }}
        >
          {i.element}
        </div>
      ))}
    </div>
  );
};
