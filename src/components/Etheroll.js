import React, { Component, useEffect, useState, useCallback } from "react";
import "./all.scss";
import {
  DetailsCompAll,
  BorderBlock,
  DiceIco,
  CoinsBlock,
  Button,
  BetBlock,
  SliderComp,
  GoBack,
  Table,
} from "./subComponent";
import coinIco from "../assets/Group 30.svg";
import balanceIco from "../assets/wallet.svg";
import coinsideA from "../assets/Clover.svg";
import { UserProvider } from '../context/UserContext'
import { ContractProvider } from '../context/ContractContext'
import Coinflip from '../abis/Coinflip.json'
import Web3 from 'web3'
import { useUser } from '../context/UserContext'
import { useContract } from '../context/ContractContext'
const headers = [
  { header: "player", param: "player" },
  { header: "bet", param: "bet" },
  { header: "result", param: "result" },
  { header: "jackpot", param: "jackpot" },
];

const data = {
  flipDetails: { coinside: 1, value: "", betValue: "", balance: "100" },
  coinDeatils: [
    {
      heading: "Winning chance",
      value: "50.00",
      des: "You will win 0.196 ETH",
      param: "%",
    },
    {
      heading: "Winning bet pays",
      value: "1.96",
      des: "1% fee, 0.001 ETH to jackpot",
      param: "x",
    },
    {
      heading: "Jackpot contains",
      value: "0.597",
      des: "Lucky number is 888!",
      param: "ETH",
    },
  ],
  tableDetails: [
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x3f3der",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "03x4fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x4f3der",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x4fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x4fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x4fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x4fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
    },
  ],
};

const coinsArr = [
  { index: 0, element: <DiceIco value={1} />, value: 1, selected: true },
  { index: 1, element: <DiceIco value={2} />, value: 1, selected: false },
  { index: 1, element: <DiceIco value={3} />, value: 1, selected: false },
  { index: 1, element: <DiceIco value={4} />, value: 1, selected: false },
  { index: 1, element: <DiceIco value={5} />, value: 1, selected: false },
  { index: 1, element: <DiceIco value={6} />, value: 1, selected: false },
];

const buttonList = ["0.1", "0.25", "0.5", "max"];

const Etheroll = () => {
  const [flipDetails, setFlipDetails] = useState(data.flipDetails);
  const [draggerVal, setDraggerVal] = useState(33);
  const [id, setId] = useState("0x3fder");
  const [onlyMeSelected, setOnlyMeSelected] = useState(false);
  const [selectedVal, setSelectedVal] = useState(0);
  const [historyView, setHistoryView] = useState(true);
  const [tableData, setTableData] = useState(data.tableDetails);


  const web3 = new Web3(Web3.givenProvider)
  const contractAddress = '0x0308c3A32E89cC7E294D07D4f356ad6b90dDd8E9'
  const coinflip = new web3.eth.Contract(Coinflip.abi, contractAddress)

  const {
    userAddress,
    setUserAddress,
    userBalance,
    setUserBalance,
    winningsBalance,
    setWinningsBalance,
  } = useUser();


  //fetching contract context
  const  {
    contractBalance,
    setContractBalance,
    owner,
    setOwner,
    setIsOwner,
    network,
    setNetwork,
    sentQueryId,
    setSentQueryId,
    awaitingCallbackResponse,
    setAwaitingCallbackResponse,
    awaitingWithdrawal,
    setAwaitingWithdrawal,
  } = useContract();

  const fetchNetwork = useCallback(async() => {
    let num = await web3.currentProvider.chainId;
    if(num === '0x1'){
      setNetwork('Mainnet')
    } else if(num === '0x3'){
      setNetwork('Ropsten')
    } else if(num === '0x4'){
      setNetwork('Rinkeby')
    } else if(num === '0x5'){
      setNetwork('Goerli')
    } else if(num === '0x42'){
      setNetwork('Kovan')
    } else {
      setNetwork('N/A')
    }
  }, [setNetwork])

  const setSelectedValCheck = (val) => {
    console.log(val);
    if (+val >= 0) {
      console.log("sd");
    }
    setSelectedVal(val);
  };

  const setOpened = (k, i) => {
    let dummy = tableData;
    dummy[k] = i;
    console.log(dummy);
    setTableData([...dummy]);
  };

  useEffect(() => {
    if (onlyMeSelected) {
      setTableData([...data.tableDetails.filter((i, k) => i.player == id)]);
    } else setTableData([...data.tableDetails]);
  }, [onlyMeSelected]);

  return (

    <div className="wrapper">
      <GoBack
        onClick={() => setHistoryView(!historyView)}
        historyView={historyView}
      />
      <div className="Etheroll flex">
        <BorderBlock
          className="a"
          style={{
            marginLeft: historyView ? "0" : "20%",
          }}
        >
          <div className="header flex-x-between">
            <div>
              <img src={coinIco} />
              <span>ETHEROLL</span>
            </div>
            <div>
              <img src={balanceIco} />
              <span>
                {flipDetails.balance}{" "}
                <span style={{ fontSize: "80%", opacity: "1" }}>ETH</span>
              </span>
            </div>
          </div>
          <div className="body">
            {/* <CoinsBlock coins={coins} setCoins={setCoins} /> */}
            <SliderComp
              value={draggerVal}
              setDraggerVal={(val) => setDraggerVal(val)}
            />

            <div className="description-text1">Choose coin side to bet on</div>

            <div className="button-list flex-x">
              {buttonList.map((i, k) => (
                <Button
                  key={k}
                  balance={flipDetails.balance}
                  value={i}
                  onClick={(val) => setSelectedValCheck(+val)}
                ></Button>
              ))}
            </div>
            <div
              className="description-text"
              style={{
                textAlign: "left",
                margin: "0 10px",
                position: "relative",
                bottom: "-10px",
              }}
            >
              Your bet
            </div>
            <BetBlock
              value={selectedVal}
              onClick={(val) => setSelectedValCheck(val)}
            />
          </div>
        </BorderBlock>
        <DetailsCompAll
          items={data.coinDeatils}
          style={{
            // marginLeft: historyView ? "0" : "8%",
            margin: historyView ? "auto" : "auto 8%",
          }}
        />
        {historyView && (
          <BorderBlock className="b">
            <div className="header flex-x-between">
              <div>Game History</div>
              <div
                onClick={() => setOnlyMeSelected(!onlyMeSelected)}
                className={onlyMeSelected ? "only-me active" : "only-me"}
              >
                Only me
              </div>
            </div>
            <div className="body">
              <Table
                headers={headers}
                data={tableData}
                setOpened={setOpened}
                page="Etheroll"
              />
            </div>
          </BorderBlock>
        )}
      </div>
    </div>

  );
};

export default Etheroll;
