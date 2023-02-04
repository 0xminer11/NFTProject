import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Category, Brand, Transactions ,Offer} from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

//IMPORT SMART CONTRACT DATA
// import Transactions from "../components/Transactions/Transactions";
const NFTDetails = () => {


  
  const [transfers,setTransfers] =useState([]);
  const [bid,setBids] =useState([]);

  // const [nft, setNft] = useState({
  //   el:[],
  //   elmeta:[],
  // })
  const [nft, setNft] = useState([])

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
    console.log("query",router.query)
  }, [router.isReady]);



  return (
    <div>
      <NFTDetailsPage nft={nft}transfers={transfers} setTransfers={setTransfers} />
      <Transactions transfers={transfers}/>
      <Category />
      {/* <Brand /> */}
    </div>
  );
};

export default NFTDetails;
