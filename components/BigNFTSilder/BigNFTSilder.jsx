import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";
import axios from 'axios';
//INTERNAL IMPORT
import Style from "./BigNFTSilder.module.css";
import images from "../../img";
import Button from "../Button/Button";

const BigNFTSilder = () => {
  const [idNumber, setIdNumber] = useState(0);

  const [nfts,setCollections] =useState([]);

  const sliderData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Daulat Hussain",
      collection: "GYm",
      price: "00664 ETH",
      like: 243,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 21,
        hours: 40,
        minutes: 81,
        seconds: 15,
      },
    },
    {
      title: "Buddy NFT",
      id: 2,
      name: "Shoaib Hussain",
      collection: "Home",
      price: "0000004 ETH",
      like: 243,
      image: images.user2,
      nftImage: images.nft_image_2,
      time: {
        days: 77,
        hours: 11,
        minutes: 21,
        seconds: 45,
      },
    },
    {
      title: "Gym NFT",
      id: 3,
      name: "Raayan Hussain",
      collection: "GYm",
      price: "0000064 ETH",
      like: 243,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: {
        days: 37,
        hours: 20,
        minutes: 11,
        seconds: 55,
      },
    },
    {
      title: "Home NFT",
      id: 4,
      name: "Raayan Hussain",
      collection: "GYm",
      price: "4664 ETH",
      like: 243,
      image: images.user4,
      nftImage: images.nft_image_1,
      time: {
        days: 87,
        hours: 29,
        minutes: 10,
        seconds: 15,
      },
    },
  ];

  useEffect(() => {

     setInterval( imgchange,3000);


  }, []);


  const options = {
    method: 'GET',
    url: 'https://deep-index.moralis.io/api/v2/nft/address?',
    params: {address:'0x59F40bc4659a39B544dd6A1d6ae81082AcdBebCa',chain: 'mumbai', format: 'decimal',normalizeMetadata: 'true'},
    headers: {accept: 'application/json','X-API-Key': 'wUpJmDYntJM9q41HNFjRUiJ9OOlbEAepazIjFDVTvJrTeWZjrgQdn72HKRRkAm58'}
  };

  axios
  .request(options)
  .then(function (response) {
    setCollections(response.data.result)
    console.log('nfts',response.data.result);
  })
  .catch(function (error) {
    console.error(error);
  });



  const imgchange =()=>{

    const rndm = Math.floor(Math.random() * sliderData.length)

    setIdNumber(rndm)

  }
  //-------INC
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);

  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);


  var unixTimestamp = 1651822834;
  var date = new Date(unixTimestamp * 1000);
  var currentDate = Date.now()
  var distance = currentDate - date
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  // + minutes + "m " + seconds + "s ";
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);

  // var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
console.log(nfts)
  return (

    
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        
        <div className={Style.bigNFTSlider_box_left}>
          
          <h2>{nfts[idNumber].name}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                // src={nfts[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {nfts[idNumber].minter_address}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{nfts[idNumber].name}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {sliderData[idNumber].price} <span>$221,21</span>
              </p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in</span>
            </p>

            <p id="demo"></p>

            <div className={Style.bigNFTSlider_box_left_button}>
              <Button btnName="Place" handleClick={() => {}} />
              <Button btnName="View" handleClick={() => {}} />
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={nfts[idNumber].normalized_metadata.image}
              alt="NFT IMAGE"
              height={400}
              width={300}
              className={Style.bigNFTSlider_box_right_box_img}
            />

            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSilder;
