// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract HotelNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _hotelIds;

    constructor() ERC721("Hotel", "H") {}

    function mintHotelNFT(address _to, string memory _cid) external {
        _hotelIds.increment();
        uint256 currentId = _hotelIds.current();
        _mint(_to, currentId);
        _setTokenURI(currentId, _cid);
    }
}