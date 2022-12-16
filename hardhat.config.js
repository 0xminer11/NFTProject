require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/11c79160811d467fad09bb62ed12d7eb",
      accounts:['20cf671d8ddadda5bfc5e8ebb35a14ba22d8f2185ceecd35f8a21e6fdec811e1'],
    },
    
  },
  etherscan: {
    apiKey: {
      polygonMumbai:"Y5DSV929WZX19BNPPEBKTMV97REG8I96UE"
    }
  }
};
