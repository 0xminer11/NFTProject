import React ,{ useEffect, useContext,useState }from "react";
import axios from 'axios';
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import { CollectionCard } from "../components/FollowerTab/FollowerTabCard/collectioncard";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { NFTCardcopy } from "../components/componentsindex";
import { Slider, Brand, Loader } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";
//SMART CONTRACT IMPORT
// import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
// const { fetchNFTs } = useContext(NFTMarketplaceContext);
import { CCLTokenContext } from "../Context/CCLToken";

const mycollection = () => {
  // useEffect(() => {
  //   fetchNFTs().then((items) => {
  //     setNfts(items);
  //     setNftsCopy(items);
  //   });
  // });
  const { currentAccount } = useContext(CCLTokenContext);
  const [run, setRun] = useState(false);
  const [nfts, setCollections] = useState([]);

  useEffect(() => {
    async function getdata() {

      console.log("currentAccount",currentAccount)
      const data = await fetch(
        `http://localhost:5000/api/collection/getCollection?collectioncreator=${currentAccount}`
      );
      const response = await data.json();
      console.log("data from backend", response);
      setCollections(response.data)
    }

    getdata();

    // if (run == false) {
    //   const options = {
    //     method: "GET",
    //     url: "http://localhost:5000/api/collection/getCollection",
    //     params: {
    //       collectioncreator: currentAccount,
    //       // chain: "mumbai",
    //       // format: "decimal",
    //       // normalizeMetadata: "true",
    //     },
    //     headers: { accept: "application/json" },
    //   };

    //   axios
    //     .request(options)
    //     .then(function (response) {
    //       setCollections(response.data.data);
    //       console.log("collections", response.data.data);
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //     });
    //   setRun(true);
    // }
  }, [currentAccount]);

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

export default mycollection;
