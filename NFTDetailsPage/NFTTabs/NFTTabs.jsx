import {React,useState,useEffect}from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
import Link from "next/link";
import { CCLTokenContext } from "../../Context/CCLToken";
import { CollectionContext } from "../../Context/CollectionContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const NFTTabs = ({ dataTab,owner }) => {
  const [nftOwner, setNFTOwner] = useState("");
  const router = useRouter();
  const {currentAccount} = useContext(CollectionContext)
  const { getOwner } = useContext(CollectionContext);


  // useEffect(() => {
  //   if(nftOwner==""){
  //   getOwner(parseInt(tokenId),tokenaddress).then((res) => {
  //     console.log('owner of this NFT',res)
  //     setNFTOwner(res);
  //   });
  // }
  // });
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
              Offered From {txs._bidder} of {txs._price._hex} CCL Tokens
            </span>
            <small>{txs._expiresAt._hex}</small>
            </div>
            <div className={Style.Buttons}>
          {currentAccount== txs._bidder?
          <button className={Style.Accecpt_btn}>Cancel</button> :<Link href={{ pathname: `/acceptOffer` , query:{tokenaddress:txs._tokenAddress,tokenId:txs._tokenId._hex,data:txs._id,bidder:txs._bidder} }}>
          <button className={Style.Cancel_btn}>Accept</button></Link>
           
          }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
