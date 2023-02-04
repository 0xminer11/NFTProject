import React from "react";
import Image from "next/image";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
import { CollectionContext } from "../../Context/CollectionContext";
import { useContext } from "react";
const NFTTabsoffer = ({ dataTab, icon }) => {
  const { currentAccount} = useContext(CollectionContext);
  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((txs,i) => (
        
        <div className={Style.NFTTabs_box} key={i + 1}>
          {/* <Image
            src={el}
            alt="profile image"
            width={40}
            height={40}
            className={Style.NFTTabs_box_img}
          /> */}
          <div className={Style.NFTTabs_box_info}>
            <span>
            {txs._bidder} User Offered  <span>{txs._price._hex} CCL Tokens</span>
              {/* {icon} */}
            </span>

            <small>{txs.block_timestamp}</small>
            {currentAccount == txs._bidder? 
            <div className={Style.Buttons}>
             <Link href={{ pathname: `/acceptOffer` , query:{tokenaddress:txs._tokenAddress,tokenId:txs._tokenId._hex,data:txs._id,bidder:txs._bidder} }}><button className={Style.Cancel_btn}>CancelBid</button></Link> 
             {/* <button className={Style.Accecpt_btn}>Cancel</button> */}
            </div>:
            <div></div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabsoffer;
