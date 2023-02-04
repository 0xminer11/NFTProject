import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
import { CCLTokenProvider } from "../Context/CCLToken";
import { MarketplaceProvider } from "../Context/Marketplace";
import { ERC721BidProvider } from "../Context/ERC721Bid";
import { CollectionProvider } from "../Context/CollectionContext";
import { FactoryProvider } from "../Context/Factory";
import { useEffect } from "react";
const MyApp = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   async function test() {
  //     const response = await fetch(
  //       "http://http://localhost:5000:5001/api/profile/getUserProfile",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({
  //           walletAddress: "0xa234118Bf5Fe52103708a2345347Ea4ecc214267",
  //         }),
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       }
  //     );
  //     console.log({ response });
  //   }
  //   test();
  // }, []);

  return (
    <div>
      <NFTMarketplaceProvider>
        <CollectionProvider>
          <FactoryProvider>
            <MarketplaceProvider>
              <CCLTokenProvider>
                <ERC721BidProvider>
                  <NavBar />
                  <Component {...pageProps} />
                  <Footer />
                </ERC721BidProvider>
              </CCLTokenProvider>
            </MarketplaceProvider>
          </FactoryProvider>
        </CollectionProvider>
      </NFTMarketplaceProvider>
    </div>
  );
};

export default MyApp;
