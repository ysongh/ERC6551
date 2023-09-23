//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "./ERC6551Registry.sol";

contract OnChainBoardGame {
  ERC6551Registry public registry;

  address public immutable owner;
  mapping(address => address) public tbaList;

  constructor(address _owner, address _registryAddress) {
    owner = _owner;
    registry = ERC6551Registry(_registryAddress);
  }

  function createTokenBoundAccount(
    address _implementation,
    uint256 _chainId,
    address _tokenContract,
    uint256 _tokenId,
    uint256 _salt,
    bytes calldata _initData
  ) external {
    address newTBA = registry.createAccount(_implementation, _chainId, _tokenContract, _tokenId, _salt, _initData);
    tbaList[msg.sender] = newTBA;
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}