const Coinflip = artifacts.require("./Coinflip.sol");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Coinflip,{value: web3.utils.toWei(".01", "ether"), from: accounts[0]});
};
