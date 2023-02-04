import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
// import Style from "./nftcard.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  const router = useRouter();
  return (
   
    <div className={Style.main}>
      <div className={Style.container}>
        <Image
          src={images.hero}
          alt="Hero section"
          width={2000}
          height={900}
          className={Style.gif}
        />
        

        <div className={Style.desrciption}>
          <h1>DISCOVER COLLECT & SELL NFT's</h1>
           <p>
            Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them
          </p>
          
        </div>
      </div>
    </div>

    // <>
    //   <div class={Style.profile_container}>
    //     {/* <div class="nft-profile--header"></div> */}
    //     <div class={Style.card}>
    //       <img
    //         src="https://miro.medium.com/max/960/0*9GkThfRr7h_iXyPr.gif"
    //         style={{
    //           height: 200,
    //           width: 280,
    //           borderRadius: 12,
    //           position: "relative",
    //           top: 10,
    //         }}
    //       />
    //       <div class={Style.img}>
    //         <img
    //           src="https://s2.coinmarketcap.com/static/img/coins/200x200/8968.png"
    //           style={{
    //             borderRadius: 150,
    //             height: 120,
    //             zIndex: 1,
    //             objectFit:"cover"
    //           }}
    //         />
    //       </div>
    //       <div className={Style.btn_name}>
    //         <div class={Style.name}>
    //           <h3 style={{margin:6}}>POLYCHAIN MONSTERS</h3>
    //             <span>@polychainmonster</span>

    //         </div>

    //         <div class={Style.bottons}>
    //           <input className={Style.one} type="button" class="btn btn--icon" value="√" />
    //           <input className={Style.two} type="button" class="btn btn--primary" value="Subscribe" />
    //         </div>
    //       </div>
    //     </div>
    //     <div class="nft-profile--footer"></div>
    //   </div>
    // </>
  );
};

export default HeroSection;
