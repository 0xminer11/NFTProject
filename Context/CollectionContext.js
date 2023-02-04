import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { Collectionaddress, CollectionABI } from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider,category) =>
  new ethers.Contract(
    category,
    CollectionABI,
    signerOrProvider
  );

  

//---CONNECTING WITH SMART CONTRACT
const projectId = "2Eye3nJyIMvHFU85VL7264HmYO1"
const projectSecretKey ="9d922e05c71e2fa4357205fcd85d8f75"
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "https://ipfs.io";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});



const connectingWithSmartContract = async (category) => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log('featching contract with collection',category)
    const contract = fetchContract(signer,category);
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


  export const CollectionContext = React.createContext();

export const CollectionProvider = ({ children }) => {
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

  const safemint = async (to,uri,category) => {
    try{
      console.log("Minting Order")
        if (!to || !uri)
        return setError("Data Is Missing"), setOpenError(true);

        // const price = ethers.utils.parseUnits(nftprice, "ether");

        const contract = await connectingWithSmartContract(category);
        console.log('contract',contract);
        const res = await contract.safeMint(to,uri);
        await res.wait();
    }
    catch (error) {
        setError("error while minting nft");
        setOpenError(true);
      }
    
  }


  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description,router) => {
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);

    const data = JSON.stringify({ name, description, image });

    try {
      const added = await client.add(data);

      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log('tokenURL',url)
        console.log('currentAccount', currentAccount);
      await safemint(currentAccount,url,price);
      router.push("/searchPage");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };



  const setApprove = async ( operator , value,collectonaddress ) =>{
    try{
      const contract = await connectingWithSmartContract(collectonaddress);
      const tx = await contract.setApprovalForAll(operator,value);
      await tx.wait()
    }
    catch(error){
      console.log("Error While getApproved From Collection");
    }
  }

  const getOwner = async (tokenId,collectonaddress) =>{
    try{
      const contract = await connectingWithSmartContract(collectonaddress);
      const tx = await contract.ownerOf(tokenId);
      return tx;
    }    catch(error){
      console.log("Error While getting Owner");
    }
  }
  const checkApprove = async (owner, operator,collectonaddress) =>{
    try {
      const contract = await connectingWithSmartContract(collectonaddress);
      const tx = await contract.isApprovedForAll(owner,operator)
      return tx;
    }catch {
      console.log("Error While checking Approve");
    }
  }

  return (
    <CollectionContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        createNFT,
        uploadToIPFS,
        safemint,
        setOpenError,
        setApprove,
        checkApprove,
        getOwner,
        openError,
        error,
        currentAccount,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );

};