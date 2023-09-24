//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RoomToken is ERC20 {
    constructor() ERC20("Room Token", "RT") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}