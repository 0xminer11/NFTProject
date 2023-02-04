// SPDX-License-Identifier: MIT
// Author: kofkuiper
pragma solidity ^0.8.4;

import "./Collection.sol";

contract CollectionFactory {
    // owner address => nft list
    mapping(address => address[]) public nfts;

    mapping(address => bool) private CollectionNFT;

    event CreatedNFTCollection(
        address creator,
        address nft,
        string name,
        string symbol
    );

    function createNFTCollection(
        string memory _name,
        string memory _symbol,
        uint256 _royaltyFee,
        address _royaltyRecipient
    ) external {
        Collection nft = new Collection(
            _name,
            _symbol,
            msg.sender,
            _royaltyFee,
            _royaltyRecipient
        );
        nfts[msg.sender].push(address(nft));
        CollectionNFT[address(nft)] = true;
        emit CreatedNFTCollection(msg.sender, address(nft), _name, _symbol);
    }

    function getOwnCollections(address addr) external view returns (address[] memory) {
        return nfts[addr];
    }

    function isCollection(address _nft) external view returns (bool) {
        return CollectionNFT[_nft];
    }
}