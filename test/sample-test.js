const { expect } = require("chai");
const { upgrades } = require("hardhat");

describe("Greeter", function () {
  /*it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });*/


  it('works before and after upgrading', async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const Greeter2 = await ethers.getContractFactory("Greeter2");

    const instance = await upgrades.deployProxy(Greeter, ['hallo']);
    expect(await instance.greet()).to.equal('hallo');
  
    const upgraded = await upgrades.upgradeProxy(instance.address, Greeter2);
    expect(await upgraded.greet()).to.equal('hallo');
  });


});

