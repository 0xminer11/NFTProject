import React, { useState, useEffect, useContext } from 'react'
import Wenb3Modal from 'web3modal'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import axios from 'axios'
import { create as ipfsHttpClient } from 'ipfs-http-client'

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const projectId = "2Eye3nJyIMvHFU85VL7264HmYO1"
const projectSecretKey ="9d922e05c71e2fa4357205fcd85d8f75"
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  'base64'
)}`

console.log('auth',auth)

const subdomain = 'https://obortech.infura-ipfs.io'

const client = ipfsHttpClient({
  host: 'infura-ipfs.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

//INTERNAL  IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants'

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => {
  const contract = new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  )
    return contract;
}
//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = fetchContract(signer)
    return contract
  } catch (error) {
    console.log('Something went wrong while connecting with contract')
  }
}

export const NFTMarketplaceContext = React.createContext()

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = 'Discover, collect, and sell NFTs'

  //------USESTAT
  const [error, setError] = useState('')
  const [openError, setOpenError] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const router = useRouter()

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError('Install MetaMask')

      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        setError('No Account Found')
        setOpenError(true)
      }
    } catch (error) {
      setError('Something wrong while connecting to wallet')
      setOpenError(true)
    }
  }

  useEffect(() => {
    checkIfWalletConnected()
  }, [])

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError('Install MetaMask')

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      setCurrentAccount(accounts[0])
      // window.location.reload();
    } catch (error) {
      setError('Error while connecting to wallet')
      setOpenError(true)
    }
  }

  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file })
      const url = `${subdomain}/ipfs/${added.path}`
      return url
    } catch (error) {
      setError('Error Uploading to IPFS')
      setOpenError(true)
    }
  }

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return setError('Data Is Missing'), setOpenError(true)

    const data = JSON.stringify({ name, description, image })

    try {
      const added = await client.add(data)

      const url = `https://infura-ipfs.io/ipfs/${added.path}`

      console.log('url',url)

      await createSale(url, price, false, Math.floor(Math.random() * 1000000))
      router.push('/searchPage')
    } catch (error) {
      setError('Error while creating NFT')
      setOpenError(true)
    }
  }

  //--- createSale FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, isReselling, id)
      const price = ethers.utils.parseUnits(formInputPrice, 'ether')

      const contract = await connectingWithSmartContract()

      const listingPrice = await contract.getListingPrice()
      console.log('listing Page',listingPrice);
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          })

      await transaction.wait()
    } catch (error) {
      setError('error while creating sale')
      setOpenError(true)
    }
  }

  //--FETCHNFTS FUNCTION

  const fetchNFTs = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        console.log('signer',signer)
        const contract = fetchContract(signer)
        console.log('contract',contract);

        const data = await contract.fetchMarketItems()
      console.log('data',data)
        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId)

              const {
                data: { image, name, description },
              } = await axios.get(tokenURI)
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                'ether'
              )

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              }
            }
          )
        )

        // console.log(items);
        return items
      
    } catch (error) {
      setError('Error while fetching ERCNFTS')
      setOpenError(true)
    }
  }

  useEffect(() => {
    if (currentAccount) {
      fetchNFTs()
    }
  }, [])

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract()

        const data =
          type == 'fetchItemsListed'
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs()

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId)
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI)
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                'ether'
              )

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              }
            }
          )
        )
        return items
      }
    } catch (error) {
      setError('Error while fetching listed NFTs')
      setOpenError(true)
    }
  }

  useEffect(() => {
    fetchMyNFTsOrListedNFTs()
  }, [])

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract()
      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      })

      await transaction.wait()
      router.push('/author')
    } catch (error) {
      setError('Error While buying NFT')
      setOpenError(true)
    }
  }

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  )
}
