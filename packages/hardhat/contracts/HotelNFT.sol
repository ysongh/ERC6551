// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract HotelNFT is ERC721URIStorage {
    constructor() ERC721("Hotel", "H") {}

    function mintHotelNFT(uint id, address _to, string memory _cid) external {
        _mint(_to, id);
        _setTokenURI(id, _cid);
    }
}