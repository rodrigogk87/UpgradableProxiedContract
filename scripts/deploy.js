// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require("hardhat");
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // Deploying
  const Greeter = await ethers.getContractFactory("Greeter");
  const proxy = await upgrades.deployProxy(Greeter, ['halo']);
  await proxy.deployed();
  
  const implementation1 = await getImplementationAddress(
    ethers.provider,
    proxy.address);

  // Upgrading
  const Greeter2 = await ethers.getContractFactory("Greeter2");
  const upgrade = await upgrades.upgradeProxy(proxy.address, Greeter2, ['hello2']);
  
  await upgrade.deployed();

  await upgrade.setNumber(10);

  const implementation2 = await getImplementationAddress(
    ethers.provider,
    upgrade.address);

  console.log("Proxy address:", proxy.address);
  console.log("upgrade address:", upgrade.address);
  console.log("implementation 1 address:", implementation1);
  console.log("implementation 2 address:", implementation2);
  console.log(await upgrade.getNumber());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
