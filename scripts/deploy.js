const hre = require("hardhat");




async function main() {




  // const RARITIES = [
  //   { name: 'common', index: 0, value: 100000 },
  //   { name: 'uncommon', index: 1, value: 10000 },
  //   { name: 'rare', index: 2, value: 5000 },
  //   { name: 'epic', index: 3, value: 1000 },
  //   { name: 'legendary', index: 4, value: 100 },
  //   { name: 'mythic', index: 5, value: 10 },
  //   { name: 'unique', index: 6, value: 1 }
  // ]
  
  // [["common",0]["rare","100"]["epic","150"]["legendary","200"]]
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const ERC721Bid = await hre.ethers.getContractFactory("ERC721Bid");
  const Collection = await hre.ethers.getContractFactory("Collection");
  const CollectionFactory = await hre.ethers.getContractFactory("CollectionFactory");
  const rarity = await hre.ethers.getContractFactory("Rarities");
  const CM = await hre.ethers.getContractFactory("CollectionManager");
  const token = await hre.ethers.getContractFactory("CCLToken");


  // const t = await token.deploy();
  // await t.deployed();
  const bid = await ERC721Bid.deploy("0xBFC51B86c5ABdbBE2BA7790dcb462F4a6CECA3C6","0x76FA28F0dffB13392bb7Cc34090FF531Fa12f0B5","10");
  await bid.deployed()
  const marketplace = await Marketplace.deploy("0xBFC51B86c5ABdbBE2BA7790dcb462F4a6CECA3C6","10","0x76FA28F0dffB13392bb7Cc34090FF531Fa12f0B5");
  // const nftMarketplace = await NFTMarketplace.deploy();

  await marketplace.deployed();
  // const r =await rarity.deploy("0x76FA28F0dffB13392bb7Cc34090FF531Fa12f0B5",[['common','0'],['rare','100'],['epic','200'],['legendary','250']]);
  // await r.deployed()
  // const c = await Collection.deploy("CCL","CCL","0x76FA28F0dffB13392bb7Cc34090FF531Fa12f0B5","10","0x76FA28F0dffB13392bb7Cc34090FF531Fa12f0B5")
  // await bid.deployed();
  // const f = await CollectionFactory.deploy()
  // await f.deployed();

  // const cm =await CM.deploy()
  // await cm.deployed()



  console.log(` deployed marketplace contract Address ${marketplace.address}`);
  console.log(` deployed bid contract Address ${bid.address}`);
  // console.log(c);



  // await hre.run('verify:verify', {
  //   address: '0xe438d81944B2C7B44810cD5F17Fc5B1A97A84db9',
  //   constructorArguments: ["0x76FA28F0dffB13392bb7Cc34090FF531Fa12f0B5",[['common','0'],['rare','100'],['epic','200'],['legendary','250']]
  //       ]})
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
