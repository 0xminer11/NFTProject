import React from "react";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({ nft,transfers,setTransfers}) => {
  console.log("nft from page",nft)
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft}/>
        <NFTDescription nft={nft} transfers={transfers} setTransfers={setTransfers}  />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
