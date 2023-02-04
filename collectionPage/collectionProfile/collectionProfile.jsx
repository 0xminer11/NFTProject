import React ,{ useEffect, useContext,useState }from "react";
import Image from "next/image";
import axios from 'axios';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./collectionProfile.module.css";
import images from "../../img";

const collectionProfile = () => {


  const [collection,setCollection] = useState([])


// const options = {
//   method: 'GET',
//   url: 'https://deep-index.moralis.io/api/v2/nft/0x1232f87b504939d5f557dB0320B13532a4b203c0',
//   params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'true'},
//   headers: {accept: 'application/json', 'X-API-Key': 'wUpJmDYntJM9q41HNFjRUiJ9OOlbEAepazIjFDVTvJrTeWZjrgQdn72HKRRkAm58'}
// };

// axios
//   .request(options)
//   .then(function (response) {
//     setCollection(response.data.result)
//     console.log('nfts',response.data.result);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
  const cardArray = [1, 2, 3, 4];
  // const collectionTab = ({ dataTab, icon }) => {
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={images.nft_image_1}
            alt="nft image"
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          />

          <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
          </div>
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>Metaverse Token</h1>
          <p>
            Karafuru is home to 5,555 generative arts where colors reign
            supreme. Leave the drab reality and enter the world of Karafuru by
            Museum of Toys.
          </p>

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div
                className={Style.collectionProfile_box_middle_box_item}
                key={i + 1}
              >
                <small>Floor price</small>
                <p>${i + 1}95,4683</p>
                <span>+ {i + 2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default collectionProfile;
