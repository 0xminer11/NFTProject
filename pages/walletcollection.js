import React ,{ useEffect, useContext,useState }from "react";
import axios from 'axios';
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import { CollectionCard} from "../components/FollowerTab/FollowerTabCard/collectioncard"
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import {NFTCard} from "../components/componentsindex";
import { Slider, Brand,Loader } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";
//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
// const { fetchNFTs } = useContext(NFTMarketplaceContext);
const _ = require("underscore");




const walletcollection = () => {
  // useEffect(() => {
  //   fetchNFTs().then((items) => {
  //     setNfts(items);
  //     setNftsCopy(items);
  //   });
  // });
  const router = useRouter();
  const [run,setRun] = useState(false);
  const [nfts, setCollections] = useState([])
  const {_nft,_name} = router.query;
  // console.log('el',{el})
  const [nft, setCollection] = useState({
    _Id: "",
    _name: "",
    _creator: "",
    _nft: "",
    _symbol: "",
    _collectionhash:"",
  });

  // const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setCollection(router.query)
  }, [router.isReady]);

  if(router.isReady){
    if(nfts.length ==0){


  const address = nft._nft
const options = {
  method: 'GET',
  url: 'https://deep-index.moralis.io/api/v2/nft/address?',
  params: {address:nft._nft,chain: 'mumbai', format: 'decimal',normalizeMetadata: 'true'},
  headers: {accept: 'application/json','X-API-Key': 'wUpJmDYntJM9q41HNFjRUiJ9OOlbEAepazIjFDVTvJrTeWZjrgQdn72HKRRkAm58'}
};

axios
  .request(options)
  .then(function (response) {
  var sortedData = _.sortBy(response.data.result, "last_token_uri_sync");
    setCollections(response.data.result)
    console.log('nfts',sortedData);
  })
  .catch(function (error) {
    console.error(error);
  });
  // setRun(true);
}
}
  

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      {/* <CollectionProfile /> */}
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts}/>}
    </div>
  );
};

export default walletcollection;
