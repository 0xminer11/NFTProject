require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
const privatekey ="0xfc09d1213c0379cdf2bc8cfca89f73063c4ec0af737b404194e1d918c1fd428d"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    // hardhat: {
    //   url: 'http://127.0.01:8545/',
    //   accounts: [process.env.privatekey],
    //   // url: process.env.STAGING_ALCHEMY_KEY,
    //   // accounts: [process.env.PRIVATE_KEY],
    // },
    // polygon_mumbai: {
    //   url: process.env.STAGING_ALCHEMY_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
}
