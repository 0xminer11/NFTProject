import React from "react";
import Image from "next/image";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";

const OwnerNFTTabsoffer = ({ dataTab, _tokenID }) => {
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
            <div className={Style.transaction_details}>
            <span>
              Offered From {txs.from_address} to {txs.to_address} for <span>{txs.value}</span>
            </span>
            <small>{txs.block_timestamp}</small>
            </div>

            <div className={Style.Buttons}>
              <button className={Style.Accecpt_btn}><Link href={{ pathname: "/acceptOffer", query: txs }}>Accept</Link></button>
              <button className={Style.Cancel_btn}>Cancel</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default OwnerNFTTabsoffer;
