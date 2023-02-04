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
import {MarketplaceContext} from "../Context/Marketplace"
import { CCLTokenContext } from "../Context/CCLToken";
import { CollectionContext } from "../Context/CollectionContext";
const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const {createOrders} = useContext(MarketplaceContext);
  const { setAllowance, getAllowance ,currentAccount} = useContext(CCLTokenContext);
  const {setApprove,checkApprove} =useContext(CollectionContext)
  const [image, setImage] = useState("");
  const [price, setPrice] = useState('"');
  const [Experies, serExperis] =useState('"');
  const [tokens,setTokken] =useState("");
  const router = useRouter();
  const { id, tokenURI,tokenaddress} = router.query;
  const addre = "0xc023019aF18eFfE0d4963DeB0907f75E096711E8"
 
  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    console.log("dataimage",data)
    setImage(data);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);


  const createorder = async () => {
    try{
      const res = await checkApprove(currentAccount,addre,tokenaddress);
      if(res){
      console.log("allready have Allowance")
      var now = new Date().getTime();
      var expiresAt = now + parseInt(Experies)
        await createOrders(tokenaddress,id,price,expiresAt);
      }else{
        try {
          await setApprove(addre,true,tokenaddress);
          var now = new Date().getTime();
          var expiresAt = now + parseInt(Experies)
          await createOrders(tokenaddress,id,price,expiresAt);
          router.push("/author");
        } catch (error) {
          console.log("Error while resell", error);
        }
      }
    }catch{
      console.log("error while chekingallowance")
    }
    
  };

  return (
    <div className={Style.container}>
      <h1>List On Marketplace Set Price</h1>
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
            <Button btnName="List" handleClick={() => createorder()} />
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

export default reSellToken;
