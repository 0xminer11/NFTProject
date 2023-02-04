import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";
import { useState } from "react";

const Form = () => {
  const[_walletAddress,setWalletAddress] = useState("")
  const[_userName,setuserName] = useState("")
  const[_email,setemail] = useState("")
  const[_twitter,settwitter] = useState("")

  // const[walletAddress,setWalletAddress] = useState("")
  // const[walletAddress,setWalletAddress] = useState("")
  const uploaddta =async ()=>{
    console.log("*************START***************")
        const response = await fetch(
          "http://localhost:5001/api/profile/editUserProfile",
          {
            method: "POST",
            body: JSON.stringify({
              walletAddress:_walletAddress,
              userName: _userName,
              email :_email,
              twitter:_twitter,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        console.log({ response });
        console.log("*************END***************")
    }



  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="User Name"
              className={Style.Form_box_input_userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input type="text" placeholder="Email*"  onChange={(e) => setemail(e.target.value)} />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="something about yourself in few words"
            ></textarea>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input type="text" placeholder="website" />
            </div>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input type="text" placeholder="http://shoaib"/>
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Twitter">Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input type="text" placeholder="http://shoaib" onChange={(e) => settwitter(e.target.value)}/>
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Instragram">Instragram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input type="text" placeholder="http://shoaib" />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Wallet address</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8"
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button
              btnName="Upload profile"
              handleClick={async() => { await uploaddta()}}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
