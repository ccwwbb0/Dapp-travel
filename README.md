## 基于 Scaffold-ETH 2 脚手架，编写一个 ERC721 Token 感受 Dapp 的开发全流程(包含前端和后端)

### 快速启动

```bash
git clone https://github.com/ccwwbb0/Dapp-travel.git
cd Dapp-Travel
yarn chain  # 启动本地区块链模拟网络
yarn deploy # 部署所有合约到本地网络
yarn start  # 启动前端
```

### 1. 编写MyErc721合约
```solidity
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

<!-- 这里直接继承 ERC721Enumerable，目的是为了可以遍历tokenId -->
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


```

## 编写合约测试脚本

## 编写前端逻辑

## 部署合约，部署前端项目

## 构建 Nft 展示页面，直接从链上获取图片信息

![31b26b8b065e6966ba56add4c16bf8ad.png](https://i.miji.bid/2023/12/15/31b26b8b065e6966ba56add4c16bf8ad.png)
