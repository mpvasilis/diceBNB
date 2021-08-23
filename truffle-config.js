require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const MNEMONIC = process.env.MNEMONIC;

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
        ropsten: {
            provider: function() {
              return new HDWalletProvider(MNEMONIC, process.env.NETWORK_URL)
            },
            network_id: 3,
            gas: 8000000
          }
    },
    contracts_directory: "./src/contracts/",
    contracts_build_directory: "./src/abis/",
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};
