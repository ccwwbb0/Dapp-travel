//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MyErc721 is ERC721URIStorage, Ownable {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	constructor(
		string memory _name,
		string memory _symbol
	) ERC721(_name, _symbol) {}

	function awardItem(
		address player,
		string memory tokenImgURI
	) public onlyOwner returns (uint256) {
		uint256 newItemId = _tokenIds.current();
		_mint(player, newItemId);
		_setTokenURI(newItemId, tokenImgURI);

		_tokenIds.increment();
		return newItemId;
	}
}
