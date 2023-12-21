import { expect } from "chai";
import { ethers } from "hardhat";
import { MyErc721 } from "../typechain-types";
import { BigNumber } from "ethers";

describe("MyErc721Contract", async function () {
  let myErc721: MyErc721;
  const name = "Plus";
  const symbol = "Ps";

  before(async () => {
    const myErc721ContractFactory = await ethers.getContractFactory("MyErc721");
    myErc721 = (await myErc721ContractFactory.deploy(name, symbol)) as MyErc721;
    await myErc721.deployed();
  });

  describe("Deployment", async () => {
    it("Should initialize name and symbol correctly", async function () {
      expect(await myErc721.name()).to.equal(name);
      expect(await myErc721.symbol()).to.equal(symbol);
    });
  });

  describe("MintNft", async () => {
    it("Should revert when called by zero address", async function () {
      const zeroAddress = ethers.constants.AddressZero;
      expect(myErc721.connect(zeroAddress).mintNft("")).to.be.rejectedWith("Invalid address");
    });

    it("Should revert when tokenUrl is empty", async function () {
      expect(myErc721.mintNft("")).to.be.rejectedWith("Invalid token url");
    });

    it("Should return tokenId when mint success", async function () {
      const tokenUrl =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc5f27a5c-7273-4830-85e5-214a35b76bae%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1704723662&t=150220e4aa964e46c09320f17573787b";

      const tokenId = await myErc721.callStatic.mintNft(tokenUrl);
      expect(tokenId).to.be.instanceOf(BigNumber);
    });
  });

  describe("GetAllTokenUrls", async () => {
    it("Should return all tokenUrls", async function () {
      const tokenUrl =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc5f27a5c-7273-4830-85e5-214a35b76bae%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1704723662&t=150220e4aa964e46c09320f17573787b";
      (await myErc721.mintNft(tokenUrl)).wait();
      (await myErc721.mintNft(tokenUrl)).wait();
      const allTokenUrls = await myErc721.getAllTokenUrls();
      console.log(allTokenUrls);
    });
  });
});
