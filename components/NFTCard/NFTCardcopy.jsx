import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import style from "./NFTCard";
import images from "../../img";

const NFTCardcopy = ({ NFTData }) => {
  // const CardArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  // ];

  const [like, setLike] = useState(true);

  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  // console.log(NFTData);
  return (
    <div className={Style.NFTCard}>
     
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/walletcollection", query: el }}>
            <div class={Style.profile_container} key={i + 1}>
              <div class={Style.card}>
                <img
                  src="https://miro.medium.com/max/960/0*9GkThfRr7h_iXyPr.gif"
                  style={{
                    height: 200,
                    width: 280,
                    position: "relative",
                    top: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    objectFit: "cover",
                  }}
                />

                <div class={Style.img}>
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/200x200/8968.png"
                    style={{
                      borderRadius: 150,
                      height: 120,
                      zIndex: 1,
                    }}
                  />
                </div>

                <div className={Style.btn_name}>
                  <div class={Style.name}>
                    <h3 style={{ margin: 6 }}>{el._name}</h3>

                    <span>@polychainmonster</span>
                  </div>

                  <div class={Style.bottons}>
                    <input
                      className={Style.one}
                      type="button"
                      value="√"
                    />

                    <input
                      className={Style.two}
                      type="button"
                      value="Subscribe"
                    />
                  </div>
                </div>
              </div>

              <div class="nft-profile--footer"></div>
            </div>

            
        </Link>
      ))}
    </div>
  );
};

export default NFTCardcopy;
