import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Blocks from 'eth-block-timestamp'
import { ethers } from "ethers";

import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTTabs } from "../NFTDetailsIndex";
import {NFTTabsoffer,OwnerNFTTabsoffer} from "../NFTDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { CollectionContext } from "../../Context/CollectionContext";
import { MarketplaceContext } from "../../Context/Marketplace";
import { CCLTokenContext } from "../../Context/CCLToken";
import { Marketplaceaddress } from "../../Context/constants";
const NFTDescription = ({ nft, transfers, setTransfers }) => {


  const blocks = new Blocks('https://polygon-mumbai.infura.io/v3/11c79160811d467fad09bb62ed12d7eb'
  )


  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(false);
  const [bidhistory, setProvanance] = useState(true);
  const [owner, setOwner] = useState(false);
  const [txs, setTxs] = useState([]);
  const [bid, setBid] = useState([]);
  const [TId, setTokenId] = useState(BigInt(""));
  const [nftOwner, setNFTOwner] = useState("");
  const [run,setRun]=useState(false);
  const [order,setOrder] =useState([]);
  const [bidrun,setBidrun]=useState(false);
  const [price,setPrice] = useState('');
  const [tokens,setTokens] = useState('');
  const [isOwner,setIsOwner]=useState(false);
  // const [tokenaddress,setTokenaddress] =useState("");
  // const [tokenid,setTokenId] =useState(BigInt());
  const { getOwner } = useContext(CollectionContext);
  const {getOrderdeatils,buyOrders} =useContext(MarketplaceContext);

  const {getAllowance,setAllowance} =useContext(CCLTokenContext);

  const [days,setDays]=useState('')
  const [hours,setHours]=useState('')
  const [minutes,setMinutes]=useState('')
  const [seconds,setSeconds]=useState('')
  

  const router = useRouter();
  const { tokenaddress, tokenId, image } = router.query;
 

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  // const { tokenaddress, tokenId } = router.query;
  console.log("TId", TId);
  // useEffect(()=>{})
  // setTokenId(parseInt(tokenId));



  const options = {
    method: "GET",
    url: `https://deep-index.moralis.io/api/v2/nft/${tokenaddress}/${tokenId}/transfers`,
    params: { chain: "mumbai", format: "decimal" },
    headers: {
      accept: "application/json",
      "X-API-Key":
        "wUpJmDYntJM9q41HNFjRUiJ9OOlbEAepazIjFDVTvJrTeWZjrgQdn72HKRRkAm58",
    },
  };


 

  if(!run){
  axios
    .request(options)
    .then(function (response) {
      setTransfers(response.data.result);
    })
    .catch(function (error) {
      console.error(error);
    });
    setRun(true)
  }

  useEffect(() => {
    setTokenId(parseInt(tokenId));
    getBid();
  },[TId]);

async function getBid() {

  const bidoptions = {
    method: "GET",
    url: `http://localhost:5000/api/nft/getbids?tokenaddress=${tokenaddress}&tokenid=${TId}&bidstatus=CREATED`,
    params: { chain: "mumbai", format: "decimal" },
    headers: { accept: "application/json" },
  };
  axios
    .request(bidoptions)
    .then(function (response) {
      console.log("bid", response.data.data);
      setBid(response.data.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

  

  useEffect(() => {
    if(nftOwner==""){
    getOwner(parseInt(tokenId),tokenaddress).then((res) => {
      console.log('owner of this NFT',res)
      setNFTOwner(res);
      if(res == currentAccount){
        setIsOwner(true)
      }else{
        setIsOwner(false)
      }
    });
  }

    getOrderdeatils(tokenaddress,parseInt(tokenId)).then((res)=>{
      setOrder(res);
      console.log('OrderDetails',res)
    });
  },[]);

  // useEffect(()=>{
  //   getBid();
  // },[]);



  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Transfer History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Offer History") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };

async function setTime() {
  const {block,timestamp} = await blocks.getDate(order.expiresAt)
  console.log('timestamp',timestamp)

  var now = new Date().getTime();
  var expiresAt =parseInt(order.expiresAt)
var timeleft = expiresAt - parseInt(now)
console.log('experis',parseInt(order.expiresAt))
// var test = new Date(timeleft);
console.log('timeleft',timeleft)
var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
setDays(days)
var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
setHours(hours)
var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
setMinutes(minutes)
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
setSeconds(seconds)
}

async function setprice() {
setPrice(parseInt(order.price)/parseInt('1000000000000000000'))
console.log('priceMatic',price)
}

async function buyOrder(){
try{
  var value =  (order.price).toLocaleString('fullwide', {useGrouping:false})
  console.log('value',value)
    const res = await setAllowance(Marketplaceaddress,value);

}catch{
  
  console.log("ERROR: while checking token allowance")
}

try{
  var value =  (parseInt(order.price)).toLocaleString('fullwide', {useGrouping:false})
  console.log('value',value)
  await buyOrders(tokenaddress,tokenId,value);
}
catch{
  console.log("ERROR: while buing Order")
}
// router.push("/collections")
}



useEffect(()=>{
  setTime();
  setprice();
});

  //SMART CONTRACT DATA
  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);
  console.log("image", image);
  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="#">
                  <MdReportProblem /> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {/* {nft.normalized_metadata.name} #{nft.normalized_metadata.tokenId} */}
            {nft.name}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              {/* <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              /> */}
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Owner</small> <br />
                <Link
                  href={{ pathname: "/author", query: `${nft.minter_address}` }}
                >
                  <span>
                    {nftOwner} <MdVerified />
                  </span>
                </Link>
                <br />
                {/* <small>Seller</small> <br />
                <Link href={{ pathname: "/author", query: `${nft.minter_address}` }}>
                  <span>
                  {nft.minter_address} <MdVerified />
                  </span>
                </Link> */}
              </div>
            </div>
          </div>
          <div className={Style.NFTDescription_box_profile_box_right}>
          <img
                    src="https://s2.coinmarketcap.com/static/img/coins/200x200/8968.png"
                    style={{
                      borderRadius: 150,
                      height: 50,
                      zIndex: 1,
                    }}
                  />

            <div className={Style.NFTDescription_box_profile_box_right_info}>
              <small>Collection</small> <br />
              <span>
                {nft.collection_name}<MdVerified />
              </span>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            <div
                    date={Date.now() + 10000000000}
                    renderer={({ hours, minutes, seconds }) => (
                      <div className="">{`${hours}h: ${minutes}m: ${seconds}s`}</div>
                    )}
                  >
                    </div>
            <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{days}</p>
                <span>Days</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{hours}</p>
                <span>hours</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{minutes}</p>
                <span>mins</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{seconds}</p>
                <span>secs</span>
              </div>
            </div>
            {price == 0? <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Price</small>
                <p>Not For Sale</p>
              </div>

              {/* <span>[96 in stock]</span> */}
            </div>:
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Price</small>
                <p>{price} CCLToken</p>
              </div>

              {/* <span>[96 in stock]</span> */}
            </div>}
            {/* <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Price</small>
                <p>{price} CCLToken</p>
              </div> */}

              {/* <span>[96 in stock]</span> */}
            {/* </div> */}
            <div className={Style.NFTDescription_box_profile_biding_box_button}>

              {isOwner !=false ?
                <Button
                  icon=<FaWallet />
                  btnName="List on Marketplace"
                  handleClick={() =>
                    router.push(
                      `/reSellToken?tokenaddress=${tokenaddress}&id=${tokenId}&tokenURI=${nft.image}`
                    )
                  }
                  classStyle={Style.button}
                />
              :price == 0?<p>You Cant Buy right Now</p>: (
                <Button
                  icon=<FaWallet />
                  btnName="Buy NFT"
                  handleClick={() => buyOrder()}
                  classStyle={Style.button}
                />
              )}

              <Button
                  icon=<FaWallet />
                  btnName="List on Marketplace"
                  handleClick={() =>
                    router.push(
                      `/reSellToken?tokenaddress=${tokenaddress}&id=${tokenId}&tokenURI=${nft.image}`
                    )
                  }
                  classStyle={Style.button}
                />
              <Button
                icon=<FaPercentage />
                btnName="Make offer"
                handleClick={() =>
                  router.push(
                    `/makeoffer?tokenaddress=${tokenaddress}&id=${tokenId}&tokenURI=${nft.image}`
                  )
                }
                classStyle={Style.button}
              />
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Offer History</button>
            </div>
              <div
                className={Style.NFTDescription_box_profile_biding_box_card}
              >
                <NFTTabs dataTab={bid} owner={nftOwner} icon=<MdVerified /> />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
