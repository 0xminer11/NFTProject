import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";

import { Marketplaceaddress, MarketplaceABI } from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    Marketplaceaddress,
    MarketplaceABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT


const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    console.log("Connection with contract Done");

    return contract;

  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};

// const connectingWithSmartContract = async () => {
//   try {
//     // const web3Modal = new Wenb3Modal();
//     // const connection = await web3Modal.connect();
//     // const provider = new ethers.providers.Web3Provider(connection);
//     // const signer = provider.getSigner();
//     // console.log('signer',signer)

//     // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
//     const provider = createProvider();
// // Prompt user for account connections
//   await provider.send("eth_requestAccounts", []);
//   const signer = provider.getSigner();
//   console.log("Account:", await signer.getAddress());
//     const contract = fetchContract(signer);
//     console.log("Connection with contract Done");

//     return contract;

//   } catch (error) {
//     console.log("Something went wrong while connecting with contract");
//   }
// };

function createProvider() {
    return new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/11c79160811d467fad09bb62ed12d7eb')
  }


  export const MarketplaceContext = React.createContext();

export const MarketplaceProvider = ({ children }) => {
//   const titleData = "Discover, collect, and sell NFTs";

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setError("No Account Found");
        setOpenError(true);
      }
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      setOpenError(true);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      setError("Error while connecting to wallet");
      setOpenError(true);
    }
  };

  const createOrders = async (nftaddress,nftId,nftprice, expiresAt) => {
    try{
      console.log("creating Order")
        if (!nftaddress || !nftId || !nftprice || !expiresAt)
        return setError("Data Is Missing"), setOpenError(true);

        const price = ethers.utils.parseUnits(nftprice, "ether");

        const contract = await connectingWithSmartContract();
        console.log('contract',contract);
        const res = await contract.createOrder(nftaddress,nftId,price,expiresAt);
        await res.wait();
    }
    catch (error) {
        setError("error while creating sale");
        setOpenError(true);
      }
    
  }

  const buyOrders = async (nftaddress,nftId,nftprice) => {
    try{
      console.log("creating Order")
        if (!nftaddress || !nftId || !nftprice)
        return setError("Data Is Missing"), setOpenError(true);
        var _price=nftprice.toLocaleString('fullwide', {useGrouping:false})
        // const _price = parseInt(price)*parseInt('1000000000000000000')
        const contract = await connectingWithSmartContract();
        console.log('contract',_price);
        const res = await contract.executeOrder(nftaddress,nftId,_price);
        await res.wait();
    }
    catch (error) {
        setError("error while creating sale");
        setOpenError(true);
      }
    
  }

  const getOrderdeatils = async(nftaddress,nftId) =>{
    try{
      const contract = await connectingWithSmartContract();
      console.log('contract',contract);
      const res = await contract.orderByAssetId(nftaddress,nftId);
      return res;
    }catch{
      console.log("ERROR: not getting order")
    }
  }

  return (
    <MarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        buyOrders,
        getOrderdeatils,
        // uploadToIPFS,
        // createNFT,
        // fetchNFTs,
        // fetchMyNFTsOrListedNFTs,
        // buyNFT,
        // createSale,
        // currentAccount,
        // titleData,
        createOrders,
        setOpenError,
        openError,
        error,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );

};