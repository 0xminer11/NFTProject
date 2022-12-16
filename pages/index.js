import React, { useState, useEffect, useContext } from 'react'

//INTERNAL IMPORT
import Style from '../styles/index.module.css'
import {
  HeroSection,
  Service,
  Title,
  Category,
  Filter,
  NFTCard,
 
} from '../components/componentsindex'
import { getTopCreators } from '../TopCreators/TopCreators'

//IMPORTING CONTRCT DATA
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext'

const Home = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  )
  useEffect(() => {
    checkIfWalletConnected()
  }, [])

  const { fetchNFTs } = useContext(NFTMarketplaceContext)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])

  useEffect(() => {
    if (currentAccount) {
      fetchNFTs().then((items) => {
        setNfts(items)
        setNftsCopy(items)
      })
    }
  }, [])

  //CREATOR LIST
  // const creators = getTopCreators(nfts)
  // console.log(creators)

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      {/* <BigNFTSilder /> */}
      {/* <Title
        heading='Audio Collection'
        paragraph='Discover the most outstanding NFTs in all topics of life.'
      /> */}
      {/* <AudioLive /> */}
      {/* {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )} */}

      {/* <Slider /> */}
      {/* <Collection /> */}
      <Title
        heading='Featured NFTs'
        paragraph='Discover the most outstanding NFTs in all topics of life.'
      />
      <Filter />
      {<NFTCard NFTData={nfts} />}

      
      <Category />
      {/* <Subscribe /> */}
      {/* <Brand /> */}
      {/* <Video /> */}
    </div>
  )
}

export default Home
