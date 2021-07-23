import React, { Component, useEffect, useState,useCallback } from "react";
import "./all.scss";
import {
  DetailsCompAll,
  BorderBlock,
  ImgIco,
  CoinsBlock,
  Button,
  BetBlock,
  GoBack,
  Table,
  coinsArrFlip as coinsArr,
} from "../components/subComponent";
import coinIco from "../assets/coins.svg";
import balanceIco from "../assets/wallet.svg";
import coinsideA from "../assets/Clover.svg";
import Coinflip from '../abis/Coinflip.json'
import Web3 from 'web3';
import { useUser } from '../context/UserContext';
import { useContract } from '../context/ContractContext';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import axios from "axios";

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
      resultArr: [1],
      betArr: [1],
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
      resultArr: [2],
      betArr: [2],
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
      resultArr: [1],
      betArr: [2],
    },
    {
      player: "0x3fder",
      bet: "1.00",
      result: "33",
      jackpot: "778",
      resultArr: [1],
      betArr: [2],
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

const buttonList = ["0.1", "0.25", "0.5", "max"];

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x391fe6a27937e761A7f19832363A0a729123AE06';//0x0308c3A32E89cC7E294D07D4f356ad6b90dDd8E9   0x570C0517a62cA38d075329211B2AD9aa3Bd1eDCC 0x391fe6a27937e761A7f19832363A0a729123AE06
const coinflip = new web3.eth.Contract(Coinflip.abi, contractAddress);
const CoinFlipScreen = () => {

  const [reload, setReload] = useState(false);
  async function loadWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log("Error:", error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      window.alert(
          "ATTENTION! Non-Ethereum browser detected. You should install MetaMask!"
      );
    }
  }

  useEffect(() => {
    loadWeb3();
  }, [reload]);


  const [flipDetails, setFlipDetails] = useState(data.flipDetails);
  const [coins, setCoins] = useState(coinsArr);
  const [id, setId] = useState("0x3fder");
  const [onlyMeSelected, setOnlyMeSelected] = useState(false);
  const [selectedVal, setSelectedVal] = useState(0);
  const [historyView, setHistoryView] = useState(true);
  const [tableData, setTableData] = useState(data.tableDetails);
  const [selectedCoin, setSelectedCoin] = useState(0);


  //fetching user context
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


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [outcomeMessage, setOutcomeMessage] = useState('');




  const loadUserAddress = useCallback(async() => {
    let accounts = await web3.eth.getAccounts()
    let account = accounts[0]
    return account
  }, [])

  const loadContractBalance = useCallback(async() => {
    let balance = await coinflip.methods.contractBalance().call()
    setContractBalance(web3.utils.fromWei(balance))
  }, [setContractBalance])

  const loadUserBalance = useCallback(async(user) => {
      try{
        let userBal = await web3.eth.getBalance(user)
        setUserBalance(Number.parseFloat(web3.utils.fromWei(userBal)).toPrecision(3))
      }
       catch (e) {
         console.error(e);
       }
  }, [setUserBalance])

  const loadWinningsBalance = useCallback(async(userAdd) => {
    let config = {from: userAdd}
    let bal = await coinflip.methods.getWinningsBalance().call(config)
    setWinningsBalance(Number.parseFloat(web3.utils.fromWei(bal)).toPrecision(3));
  }, [setWinningsBalance])

  const loadOwner = useCallback(async() => {
    let theOwner = await coinflip.methods.owner().call()
    setOwner(theOwner)
    return theOwner
  }, [setOwner])


  const loadUserData = useCallback(async() => {
        await loadUserAddress().then(response => {
          setUserAddress(response)
          loadUserBalance(response)
          loadWinningsBalance(response)
        })
      },
      [loadUserAddress,
        setUserAddress,
        loadUserBalance,
        loadWinningsBalance
      ])


  useEffect(() => {
    coinflip.events.allEvents({
    }, function(error, event){ console.log(event); })
        .on('data', function(event){
          console.log(event); // same results as the optional callback above
        })
        .on('changed', function(event){
          // remove event from local database
        })
        .on('error', console.error);
    // if(userAddress === ''){
    loadUserData()
    // }
  }, [loadUserData, userAddress])



  useEffect(() => {
    fetchNetwork()
    loadContractBalance()
    loadOwner().then(response => {
      setOwner(response)
    })
  }, [network, fetchNetwork, loadContractBalance, loadOwner, setOwner])

  useEffect(() => {
    if(userAddress){
      if(userAddress.length !== 0 && owner.length !== 0){
        if(userAddress === owner){
          setIsOwner(true)
        } else {
          setIsOwner(false)
        }
      }
    }
  }, [userAddress, owner, setIsOwner])



  const flip = async(oneZero, bet) => {
    setAwaitingCallbackResponse(false)
    let guess = oneZero
    let betAmt = bet
    let config = {
      value: web3.utils.toWei(betAmt, 'ether'),
      from: userAddress
    }
    coinflip.methods.flip(guess).send(config)
        .on('receipt', function(receipt){
          console.log(receipt);
          setSentQueryId(receipt.events.sentQueryId.returnValues[1]);
          console.log(receipt.events.sentQueryId.returnValues[1])
          setAwaitingCallbackResponse(true);
        })
  }

  const modalMessageReset = () => {
    setModalIsOpen(false)
    setOutcomeMessage('')
  }




  useEffect(() => {

        if(awaitingCallbackResponse){

          coinflip.events.callbackReceived({}, function(error, event){ if(true){ //event.returnValues[0] === sentQueryId
          alert(error);
            alert(event);

            if(event.returnValues[1] === 'Winner'){
              setOutcomeMessage('You Won ' + web3.utils.fromWei(event.returnValues[2]) + ' ETH!')
              loadWinningsBalance(userAddress)
              loadContractBalance()
            } else {
              setOutcomeMessage('You lost ' + web3.utils.fromWei(event.returnValues[2]) + ' ETH...')
              loadWinningsBalance(userAddress)
              loadContractBalance()
            }
          } setAwaitingCallbackResponse(false)
          })
          setSentQueryId('')
        }
      }, [
        userAddress,
        awaitingCallbackResponse,
        sentQueryId,
        contractBalance,
        loadContractBalance,
        loadWinningsBalance,
        setAwaitingCallbackResponse,
        setSentQueryId
      ]
  )


  const withdrawUserWinnings = () => {
    var balance = winningsBalance
    coinflip.methods.withdrawUserWinnings().send(balance, {from: userAddress})
    setAwaitingWithdrawal(true)
  }


  const fundContract = (x) => {
    let fundAmt = x
    let config = {
      value: web3.utils.toWei(fundAmt, 'ether'),
      from: userAddress
    }
    coinflip.methods.fundContract().send(config)
        .once('receipt', function(receipt){
          loadContractBalance()
          loadUserBalance(userAddress)
        })
  }

  const fundWinnings = (x) => {
    let fundAmt = x
    let config = {
      value: web3.utils.toWei(fundAmt, 'ether'),
      from: userAddress
    }
    coinflip.methods.fundWinnings().send(config)
        .once('receipt', function(receipt){
          loadWinningsBalance(userAddress)
          loadUserBalance(userAddress)
        })
  }

  const withdrawAll = () => {
    var balance = contractBalance
    coinflip.methods.withdrawAll().send(balance, {from: userAddress})
        .on('receipt', function(receipt){
          loadContractBalance()
          loadUserBalance(userAddress)
        })
  }

  useEffect(() => {
    if(awaitingWithdrawal){
      coinflip.events.userWithdrawal({
        fromBlock:'latest'
      }, function(error, event){ if(event.returnValues[0] === userAddress){
        setOutcomeMessage(web3.utils.fromWei(event.returnValues[1]) + ' ETH Successfully Withdrawn')
        loadWinningsBalance()
        loadUserBalance(userAddress)
      }
      })
      setAwaitingWithdrawal(false)
    }
  }, [awaitingWithdrawal, winningsBalance, userBalance, userAddress, loadUserBalance, loadWinningsBalance, setAwaitingWithdrawal])


  useEffect(() => {
    if(outcomeMessage !== ''){
      alert(outcomeMessage);
      setModalIsOpen(true)
    }
  }, [outcomeMessage])

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

  const increment = (val) => {
    setSelectedValCheck(+(+selectedVal + +val).toFixed(2));
  };


  useEffect(() => {
  console.log(coins);
  if(coins[0].selected ===true){
    console.log("Heads");
    setSelectedCoin(0);
  }
  else{
    console.log("Tails");
    setSelectedCoin(1);


  }
  }, [coins])



  useEffect(() => {
  axios.get('http://localhost:8081/api/games').then(r=>{
  console.log(r.data);
  })
  })
// setHistoryView(!historyView)
  return (
    <div className="wrapper">
      <GoBack
        onClick={() => fundContract("1") }
        historyView={historyView}
      />
      <div className="coin-flip flex">
        <BorderBlock
          className="a"
          style={{
            marginLeft: historyView ? "0" : "20%",
          }}
        >
          <div className="header flex-x-between">
            <div>
              <img src={coinIco} />
              <span>COIN FLIP</span>
            </div>
            <div>
              <img src={balanceIco} />
              <span>
                {userBalance}{" "}
                <span style={{ fontSize: "80%", opacity: "1" }}>ETH</span>
              </span>
            </div>
          </div>
          <div className="body">
            <CoinsBlock coins={coins} setCoins={setCoins} />

            <div className="description-text1">Choose coin side to bet on</div>

            <div className="button-list flex-x">
              {buttonList.map((i, k) => (
                <Button
                  key={k}
                  value={i}
                  balance={flipDetails.balance}
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

            <div className="bet-block">
              <div></div>
              <div className="bet-buttons flex-x">
                <div className="bet-input flex-x">
                  <div className="flex-x">
                    <span onClick={() => increment(-0.01)}>-</span>
                    <input
                        value={selectedVal}
                        onChange={(e) => {
                          var regexp = /^[0-9]*(\.[0-9]{0,2})?$/;
                          if (regexp.test(e.target.value)) setSelectedValCheck(e.target.value);
                        }}
                    />
                    <span onClick={() => increment(0.01)}>+</span>
                  </div>
                </div>
                <div className="bet-submit flex-x" onClick={() => {flip(selectedCoin.toString(),selectedVal.toString())}}>BET</div>
              </div>
            </div>
            {userBalance ? <></>  :  <><BrowserView>
              <div className="web3-required"><h1>Log in to MetaMask</h1><p>Please log in to MetaMask to proceed</p> </div></BrowserView>
              <MobileView>
              <div className="web3-required"><h1 className="mobile">Log in to Trust</h1><p className="mobile">Please log in to Trust to proceed</p></div>
              </MobileView></> }

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
                page="CoinFlip"
              />
            </div>
          </BorderBlock>
        )}
      </div>
    </div>
  );
};

export default CoinFlipScreen;
