import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/makeoffer.module.css";
// import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
// import {MarketplaceContext} from "../Context/Marketplace"
import { CollectionContext } from "../Context/CollectionContext";
import { ERC721BidContext } from "../Context/ERC721Bid";
import { CCLTokenContext } from "../Context/CCLToken";

const makeofferToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const { setAllowance, getAllowance } = useContext(CCLTokenContext);
  const { setApprove, currentAccount } = useContext(CollectionContext);
  // const {createOrders} = useContext(MarketplaceContext);
  const { placebid } = useContext(ERC721BidContext);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState('"');
  const [Experies, serExperis] = useState('"');
  const router = useRouter();
  const { id, tokenURI,tokenaddress} = router.query;
 
  const bidaddress = "0xCf3065621f4D82B614E26a94F7BFb8854997a4bd";
  // const bidaddress = process.env.BIDAddress;
  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  // const resell = async () => {
  //   try {
  //     await createSale(addre, price, true, id);
  //     router.push("/author");
  //   } catch (error) {
  //     console.log("Error while resell", error);
  //   }
  // };
  const makeoffer = async () => {
    // const value = await getAllowance(currentAccount, bidaddress);
    // console.log("value",value)
    // if (value >= price) {
    //   console.log("allredy got allowance");
    // } else {
    //   try {
    //     await setAllowance(bidaddress, price);
    //     console.log("allowance Done");
    //   } catch {
    //     console.log("Error while getting allowance or ", error);
    //   }
    // }
    try{
      await setAllowance(bidaddress, price);
      //     console.log("allowance Done");
    }catch{
      console.log("Error while allowance")
    }
    try {
      await placebid(tokenaddress, id, price, Experies);
    } catch (error) {
      console.log("Error while resell", error);
    }
  };
  return (
    <div className={Style.container}>
      <h1>MakeOffer Set Price</h1>
      <div className={Style.arrange}>
        <div className={Style.main}>
          <label htmlFor="name">Price :</label>
          <input
            type="text"
            name="price"
            placeholder="offer price"
            className={Style.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="name">Duration :</label>
          <div className={Style.radio_btns}>
            <input
              type="radio"
              name="duration"
              value="604800000"
              className={Style.Form_box_input_radio}
              onChange={(e) => serExperis(e.target.value)}
            />
            <input
              type="radio"
              name="duration"
              value="1296000000"
              placeholder="Experies AT"
              className={Style.Form_box_input_radio}
              onChange={(e) => serExperis(e.target.value)}
            />
            <input
              type="radio"
              name="duration"
              value="2628000000"
              className={Style.Form_box_input_radio}
              onChange={(e) => serExperis(e.target.value)}
            />
            <input
              type="radio"
              name="duration"
              value="5256000000"
              className={Style.Form_box_input_radio}
              onChange={(e) => serExperis(e.target.value)}
            />
            <input
              type="radio"
              name="duration"
              value="7884000000"
              className={Style.Form_box_input_radio}
              onChange={(e) => serExperis(e.target.value)}
            />
            <input
              type="radio"
              name="duration"
              value="15770000000"
              className={Style.Form_box_input_radio}
              onChange={(e) => serExperis(e.target.value)}
            />
          </div>
          <div className={Style.time_durations}>
            <p>1 W</p>
            <p>2 W</p>
            <p>1 M</p>
            <p>2 M</p>
            <p>3 M</p>
            <p>6 M</p>

          </div>
          <div className={Style.reSellToken_box_btn}>
            <Button btnName="MakeOffer" handleClick={() => makeoffer()} />
          </div>
        </div>
        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} />
          )}
        </div>
      </div>
    </div>
  );
};

export default makeofferToken;
