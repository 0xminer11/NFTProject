require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.7.3',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.4.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.6.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.6.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {},
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/11c79160811d467fad09bb62ed12d7eb",
      accounts:['20cf671d8ddadda5bfc5e8ebb35a14ba22d8f2185ceecd35f8a21e6fdec811e1'],
    },
    // ccl: {
    //   provider:()=>new HDWalletProvider('0f53e6062a248971ad811c2e66ac403eb0317be59b782035c133cdbfd29993b1' ,'http://localhost:10002.'),
    //   accounts:['0f53e6062a248971ad811c2e66ac403eb0317be59b782035c133cdbfd29993b1'],
    //   chainId:
    // },
    
  },
  etherscan: {
    apiKey: {
      polygonMumbai:"VG6WHCTUA59FJT2JIKQJ5RS6QNU2JYT23K"
    }
  }
};
