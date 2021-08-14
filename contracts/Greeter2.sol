//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol";

contract Greeter2 is Initializable,ERC1967UpgradeUpgradeable{
  string greeting;
  uint number;

   function initialize(string memory _greeting) public initializer {
        __ERC1967Upgrade_init();
        console.log("Deploying a Greeter with greeting:", _greeting);
        console.log("At address: ", address(this));
        greeting = _greeting;
        number = 10;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setNumber(uint _number) external{
    number = _number;
  }

  function getNumber() public view returns(uint){
    return number;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}
