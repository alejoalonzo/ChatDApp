const hre = require("hardhat");

async function main() {
  // Get the contract factory we want to deploy
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");

  // Deploy the contract
  const chatApp = await ChatApp.deploy();

  // Wait for the deployment to be confirmed (new syntax)
  await chatApp.waitForDeployment();

  console.log("ChatApp deployed to:", await chatApp.getAddress());
}

// Run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
