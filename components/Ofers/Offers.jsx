import React from "react";
import { BiTransferAlt } from "react-icons/bi";
import Style from "./Transactions.module.css";

const Offer = ({ bid }) => {
  return (
    <div className={Style.container}>
      <div className={Style.main}>
        <div className={Style.header}>
          <BiTransferAlt className={Style.logo} />
          <h3>OFFER HISTORY</h3>
        </div>

        <div className={Style.titles}>
          <table>
            <tr className={Style.tahead}>
              <th></th>
              <th>Time</th>
              <th>Price</th>
              <th>From</th>
              <th>To</th>
            </tr>
            {bid.map((txs, i) => (
                <tbody className={Style.tbody}>
                <tr className={Style.data}>
                  <td scope="row">{i + 1}</td>
                  <td>{txs.block_timestamp}</td>
                  <td>{txs.value}</td>
                  <td>{txs.from_address}</td>
                  <td>{txs.to_address}</td>
                </tr>
                </tbody>            
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Offer;
