import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import UploadCollection from "../UploadNFT/UploadCollection";

//SMART CONTRACT IMPORT
// import { CollectionContext } from "../Context/CollectionContext";
import { FactoryContext } from "../Context/Factory";

const createCollection = () => {
  const { createCollection } = useContext(FactoryContext);
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create Collection</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Image, Video, Audio, or 3D Model</h2>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadCollection createNFTCollection={createCollection} />
        </div>
      </div>
    </div>
  );
};

export default createCollection;
