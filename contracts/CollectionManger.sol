// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Collection.sol";



/**
 * @title Interface for contracts conforming to ERC-721
 */
interface ERC721Interface {
    function ownerOf(uint256 _tokenId) external view returns (address _owner);
    function transferFrom(address _from, address _to, uint256 _tokenId) external;
    function supportsInterface(bytes4) external view returns (bool);
    function safeMint(address to, string memory uri) external ;
}



contract CollectionManager{

constructor() public{

}
    bytes4 public constant ERC721_Interface = 0x80ac58cd;
    bytes4 public constant ERC721_Received = 0x150b7a02;
    bytes4 public constant ERC721Composable_ValidateFingerprint = 0x8f9f4b63;

    // function mintNFT(
    //     address _tokenAddress,
    //     address _to,
    //     string memory _tokenURI
    // ) public {
    //     _requireERC721(_tokenAddress);
    //     ERC721Interface token = ERC721Interface(_tokenAddress);
    //     token.safeMint(_to,_tokenURI);
    // }
    
    // function isContract(address account) internal view returns (bool) {
    //     // This method relies on extcodesize, which returns 0 for contracts in
    //     // construction, since the code is only stored at the end of the
    //     // constructor execution.

    //     uint256 size;
    //     assembly {
    //         size := extcodesize(account)
    //     }
    //     return size > 0;
    // }


    // function _requireERC721(address _tokenAddress) internal view {
    //     require(_tokenAddress.isContract(), "Token should be a contract");

    //     ERC721Interface token = ERC721Interface(_tokenAddress);
    //     require(
    //         token.supportsInterface(ERC721_Interface),
    //         "Token has an invalid ERC721 implementation"
    //     );
    // }


}