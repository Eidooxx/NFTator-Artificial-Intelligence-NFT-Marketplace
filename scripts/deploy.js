
const hre = require("hardhat");

async function main() {

  const NFTATORCONTRACT = await hre.ethers.getContractFactory("NFTatorNFTMarketplace");
  const nftatorcontract = await NFTATORCONTRACT.deploy();

  await nftatorcontract.deployed();

  console.log(
    `NFTatorNFTMarketplace contract is deployed with address: ${nftatorcontract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
