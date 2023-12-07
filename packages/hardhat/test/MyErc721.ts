import { expect } from "chai";
import { ethers } from "hardhat";
import { MyErc721 } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MyErc721Contract", function () {
  // We define a fixture to reuse the same setup in every test.
  let myErc721: MyErc721;
  let singer: SignerWithAddress;
  let a1: SignerWithAddress;
  const name = "Plus";
  const symbol = "Ps";
  before(async () => {
    [singer, a1] = await ethers.getSigners();
    const myErc721ContractFactory = await ethers.getContractFactory("MyErc721");
    myErc721 = (await myErc721ContractFactory.deploy(name, symbol)) as MyErc721;
    await myErc721.deployed();
  });

  describe("Deployment", function () {
    it("Should set owner correctly", async function () {
      expect(await myErc721.owner()).to.equal(singer.address);
    });

    it("Should set name and symbol", async function () {
      expect(await myErc721.name()).to.equal(name);
      expect(await myErc721.symbol()).to.equal(symbol);
    });
  });

  describe("AwardItem", function () {
    it("Should awardItem", async function () {
      const player = a1.address;
      const imgUrl = "http://www.baidu.com/";

      const id = await myErc721.callStatic.awardItem(player, imgUrl);
      (await myErc721.awardItem(player, imgUrl)).wait();

      const url = await myErc721.tokenURI(id);
      expect(url).to.equal(imgUrl);
    });

    it("Should only owner calling awardItem", async () => {
      expect(myErc721.connect(a1).awardItem(singer.address, "http://localhost")).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });
  });
});
