import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";

//INTERNAL  IMPORT
import { CCLTokenaddress, CCLTokenABI } from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    CCLTokenaddress,
    CCLTokenABI,
    signerOrProvider
  );

  //---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
    try {
      const web3Modal = new Wenb3Modal();
      const connection = await web3Modal.connect();
      // const provider =createProvider();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      console.log("Connection with contract Done successfully ");

      return contract;
  
    } catch (error) {
      console.log("Something went wrong while connecting with contract");
    }
  };
  
  function createProvider() {
    return new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/11c79160811d467fad09bb62ed12d7eb')
  }

  export const CCLTokenContext = React.createContext();

  export const CCLTokenProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs";
  
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

    async function gettokens() {
      const contract = await connectingWithSmartContract();
      const tokens = await contract.GetTokens({value:"1000000000000000000"});
      await tokens.wait()
      // return {tokens};
    }

    async function setAllowance(address,value) {
      try{
        console.log('Allowing')
        const contract = await connectingWithSmartContract();
        var price =value.toLocaleString('fullwide', {useGrouping:false})
        var _price = (parseInt(price)*parseInt('1000000000000000000')).toLocaleString('fullwide', {useGrouping:false})
        console.log('allowingDone contract with price',price)
        const tokens = await contract.approve(address,price);
        await tokens.wait()
        console.log('allowingDone')
      }
      catch (error) {
        setError("Error while approving Tokens");
        setOpenError(true);
      }

      // return {tokens};
    }
    async function getAllowance(owner,spender){
      try{
        const contract = await connectingWithSmartContract();
        const tokens = await contract.allowance(owner,spender);
        return {tokens};
      }
      catch (error){
        setError("Error while approving Tokens");
        setOpenError(true);
      }

      
    }




    const fetchTokens = async (address) => {
        try{
    // const provider = createProvider()
      const contract = await connectingWithSmartContract();
      const tokens = await contract.balanceOf(address)
      console.log('tokens of account',parseInt(tokens));
      return tokens;
    }
      catch (error) {
        setError("Error while fetching Tokens");
        setOpenError(true);
      }
    };
     useEffect(() => {
        fetchTokens();
      }, []);



      const allowTokens = async () => {
        try{
    // const provider = createProvider()
      const contract = await connectingWithSmartContract();
      const tokens = await contract.approve(address,value);
      // console.log('tokens of account',parseInt(tokens));
      // return tokens;
    }
      catch (error) {
        setError("Error while approving Tokens");
        setOpenError(true);
      }
    };
      // const getTokens = async () =>{
      //   try{

      //   }
      // }

    return (
        <CCLTokenContext.Provider
          value={{
            checkIfWalletConnected,
            connectWallet,
            fetchTokens,
            gettokens,
            error,
            openError,
            allowTokens,
            setAllowance,
            getAllowance,
            currentAccount,
          }}
        >
          {children}
        </CCLTokenContext.Provider>
      );
}