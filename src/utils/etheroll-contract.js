import etherollAbi from './etheroll-abi';

// TODO require vs import
// const SolidityEvent = require('web3/lib/web3/event.js');

const HOUSE_EDGE = 1 / 100.0;

const Networks = Object.freeze({ mainnet: 1, morden: 2, ropsten: 3 });

const contractAddresses = {
  [Networks.mainnet]: '0xf478c8Bc5448236d52067c96F8f4C8376E62Fa8f',
  [Networks.ropsten]: '0xe12c6dEb59f37011d2D9FdeC77A6f1A8f3B8B1e8',
};

const etherscanUrls = {
  [Networks.mainnet]: 'https://etherscan.io',
  [Networks.ropsten]: 'https://ropsten.etherscan.io',
};ioioiooioioiioioioio


const getPayout = (betSize, winningChances) => (
  100 / winningChances * betSize
);

const cutHouseEdge = payout => (
  payout * (1 - HOUSE_EDGE)
);

const getProfit = (betSize, winningChances) => {
  if (winningChances === 0) {
    return 0;
  }
  const rawPayout = getPayout(betSize, winningChances);
  const netPayout = cutHouseEdge(rawPayout);

  return Math.max(netPayout - betSize, 0);
};


// Merges bet logs (LogBet) with bet results logs (LogResult).
const mergeLogs = (logBetEvents, logResultEvents) => {
  const findLogResultEventBylogBetEvent = logBetEvent => (
    logResultEvents.find(logResultEvent => (
      logResultEvent.returnValues.BetID === logBetEvent.returnValues.BetID
    ))
  );

  return logBetEvents.map(logBetEvent => ({
    logBetEvent,
    logResultEvent: findLogResultEventBylogBetEvent(logBetEvent),
  }));
};

class EtherollContract {
  constructor(web3, address) {
    this.web3 = web3;
    this.address = address;
    this.abi = etherollAbi;
    this.web3Contract = new web3.eth.Contract(etherollAbi, address);
  }

  // callback(error, result)
  getTransactionLogs(callback) {
    this.web3.eth.getBlockNumber((error, blockNumber) => {
      if (error) {
        console.log(error);
      } else {
        const { address } = this;
        const toBlock = blockNumber;
        const fromBlock = toBlock - 100;
        const options = {
          address,
          fromBlock,
          toBlock,
        };
        this.web3Contract.getPastEvents('allEvents', options, callback);
      }
    });
  }

  // callback(error, result)
  getMergedTransactionLogs(callback) {
    this.getTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const logBetEvents = result.filter(evnt => evnt.event === 'LogBet');
        const logResultEvents = result.filter(evnt => evnt.event === 'LogResult');
        const mergedLogs = mergeLogs(logBetEvents, logResultEvents);
        callback(error, mergedLogs);
      }
    });
  }
}


export {
  EtherollContract, etherscanUrls, getProfit, mergeLogs, Networks, contractAddresses,
};
