import React ,{ useEffect, useContext,useState }from "react";
import axios from 'axios';
//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import { CollectionCard} from "../components/FollowerTab/FollowerTabCard/collectioncard"
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import {NFTCardcopy} from "../components/componentsindex";
import { Slider, Brand,Loader } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";
//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
// const { fetchNFTs } = useContext(NFTMarketplaceContext);




const collection = () => {
  // useEffect(() => {
  //   fetchNFTs().then((items) => {
  //     setNfts(items);
  //     setNftsCopy(items);
  //   });
  // });
  const [run,setRun] = useState(false);
  const [nfts, setCollections] = useState([])

  if(run == false){
  const options = {
  method: 'GET',
  url: 'http://localhost:5000/api/collection/getCollection',
  params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'true'},
  headers: {accept: 'application/json'}
};

axios
  .request(options)
  .then(function (response) {
    setCollections(response.data.data)
    console.log('nfts',response.data.data);
  })
  .catch(function (error) {
    console.error(error);
  });
  setRun(true);
}

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      {/* <CollectionProfile /> */}
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCardcopy NFTData={nfts} />}
      {/* <div className={Style.author_box}>
        {nfts.map((el, i) => (
          <CollectionCard i={i} el={el} />
        ))} */}
      {/* </div> */}
 {/* <div className={Style.upload_box_slider_div}>
            {nfts.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active == i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (setActive(i + 1), setCategory(el.category))}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background image"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>Crypto Legend - {el.category} </p>
              </div> */}
            {/* ))} */}
          {/* </div> */}
      {/* <Slider /> */}
      {/* <Brand /> */}
    </div>
  );
};

export default collection;
