const MTXToken = artifacts.require("./MTXToken.sol");
const MTXTokenSale = artifacts.require("./MTXTokenSale.sol");

module.exports = async function (deployer) {
	await deployer.deploy(MTXToken, 1000000);
	const mtxtoken = await MTXToken.deployed();

	const tokenPrice = 1000000000000000; //0.01Ether
	await deployer.deploy(MTXTokenSale, mtxtoken.address, tokenPrice);
	const mtxtokesale = await MTXTokenSale.deployed();

	await mtxtoken.transfer(mtxtokesale.address, "750000");
};
