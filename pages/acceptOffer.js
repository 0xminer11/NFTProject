import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
// import {MarketplaceContext} from "../Context/Marketplace"
import { CollectionContext } from "../Context/CollectionContext";
import { ERC721BidContext } from "../Context/ERC721Bid";
import { CCLTokenContext } from "../Context/CCLToken";

const acceptofferToken = () => {
  const { createSale,transfer } = useContext(NFTMarketplaceContext);
  const { setAllowance,getAllowance} = useContext(CCLTokenContext);
  const {currentAccount,checkApprove,setApprove} = useContext(CollectionContext);
  // const {createOrders} = useContext(MarketplaceContext);
  const {placebid,acceptbid,getBid} = useContext(ERC721BidContext)
  const [image, setImage] = useState("");
  const [price, setPrice] = useState('"');
  const [Experies, serExperis] =useState('"');
  const [index,setIndex] =useState(0);
  // const[data,setData] = useState("");
  const router = useRouter();
  //
  const {tokenaddress,bidder,tokenId,data} = router.query;
  const bidaddress='0xCf3065621f4D82B614E26a94F7BFb8854997a4bd'



  const acceptBidoffer = async () => {
    
    try{
      const res =await getBid(tokenaddress,parseInt(tokenId),bidder);
      console.log(res)
      setIndex(parseInt(res.bidIndex._hex))
    }catch{
      console.log("Error While getting bid data")
    }
  try{
    const res =await checkApprove(currentAccount,bidaddress,tokenaddress)
    console.log('approve',res)
    if(res){
      console.log("allready approved")
    }else{
      await setApprove(bidaddress,true,tokenaddress)
    } 
  }
  catch{
    console.log("Error While geting Approve");
  }
    try{
      console.log('currentAccount',currentAccount,'index',index,'data',data)
      await acceptbid(currentAccount,bidaddress,parseInt(tokenId),index,tokenaddress,data);
      router.push("/collection");
    } catch (error){
      console.log("Error while resell", error);
    }

  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>Accepting offer</h1>
        {/* <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={1}
            placeholder="offer price"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
           <input
            type="number"
            min={1}
            placeholder="Experies AT"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => serExperis(e.target.value)}
          />
        </div> */}

        {/* <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} />
          )}
        </div> */}

        <div className={Style.reSellToken_box_btn}>
          <Button btnName="AcceptOffer" handleClick={() => acceptBidoffer()} />
        </div>
      </div>
    </div>
  );
};

export default acceptofferToken;
