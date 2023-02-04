import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter ,NFTCard} from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

import axios from 'axios';

// function getnfts(){
//   const options = {
//     method: 'GET',
//     url: 'https://deep-index.moralis.io/api/v2/nft/0x251a18b7804A143E82a779DCf02ca54eC5291E01',
//     params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'false'},
//     headers: {accept: 'application/json', 'X-API-Key': 'wUpJmDYntJM9q41HNFjRUiJ9OOlbEAepazIjFDVTvJrTeWZjrgQdn72HKRRkAm58'}
//   };
//   axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//     return response.data ;
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
// }





//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    try {
      fetchNFTs().then((items) => {
        setNfts(items);
        setNftsCopy(items);
      });
    } catch (error) {
      setError("Please reload the browser", error);
    }
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      {/* <Slider /> */}
      {/* <Brand /> */}
      {/* <Filter /> */}
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
    </div>
  );
};

export default searchPage;
