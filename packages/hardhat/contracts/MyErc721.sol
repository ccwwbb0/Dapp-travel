//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract MyErc721 is ERC721Enumerable {
	mapping(uint256 => string) private _tokenUrls;
	uint256 private _currentTokenId;

	constructor(
		string memory name,
		string memory symbol
	) ERC721(name, symbol) {}

	function mintNft(string memory tokenUrl) public returns (uint256) {
		address owner = msg.sender;
		require(owner != address(0), "Invalid address");
		require(bytes(tokenUrl).length > 0, "Invalid token url");
		uint256 tokenId = _generateTokenId();
		_mint(owner, tokenId);
		_setTokenUrl(tokenId, tokenUrl);
		return tokenId;
	}

	function getTokenUrl(uint256 tokenId) public view returns (string memory) {
		require(_exists(tokenId), "TokenId does not exists");
		return _tokenUrls[tokenId];
	}

	function getAllTokenUrls()
		external
		view
		returns (uint256[] memory, string[] memory)
	{
		uint256 totalSupply = totalSupply();
		string[] memory tokenUrls = new string[](totalSupply);
		uint256[] memory tokenIds = new uint256[](totalSupply);
		for (uint256 i = 0; i < totalSupply; i++) {
			uint256 tokenId = tokenByIndex(i);
			tokenUrls[i] = getTokenUrl(tokenId);
			tokenIds[i] = tokenId;
		}
		return (tokenIds, tokenUrls);
	}

	function _setTokenUrl(uint256 tokenId, string memory tokenUrl) internal {
		require(_exists(tokenId), "TokenId does not exists");
		require(bytes(tokenUrl).length > 0, "Invalid TokenUrl");
		_tokenUrls[tokenId] = tokenUrl;
	}

	function _generateTokenId() internal returns (uint256) {
		_currentTokenId++;
		return _currentTokenId;
	}
}
