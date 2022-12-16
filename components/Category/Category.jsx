import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";
import Title from "../Title/Title"

const Category = () => {
  const CategoryArray = [
    {
      images: images.tigers,
      name: "Tigers",
    },
    {
      images: images.panda,
      name: "Pandas",
    },
    {
      images: images.eagle,
      name: "Eagles",
    },
    {
      images: images.polarBear,
      name: "Polar Bears",
    },
    {
      images: images.reptiles,
      name: "Reptiles",
    },
    
  
  ];
  return (
    <div className={Style.box_category}>
       <Title
        heading='Browse by category'
      />
      <div className={Style.category}>
     
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={i + 1}>
            <Image
              src={el.images}
              className={Style.category_box_img}
              alt="Background image"
              width={350}
              height={150}
              objectFit="cover"
            />

            <div className={Style.category_box_title}>
             
              <div className={Style.category_box_title_info}>
                <h4>{el.name}</h4>
                <small>{i + 1}995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
