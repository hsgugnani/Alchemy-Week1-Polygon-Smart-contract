
const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/Greeter.sol/Greeter.json");
const abi = ContractJson.abi;


async function main() {
    const alchemy = new hre.ethers.providers.AlchemyProvider(
        'maticmum',
        process.env.ALCHEMY_API_KEY
    );
    // We're using the same wallet private key for the wallet that you
    // created in Step 6. 
    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

    const Greeter = new hre.ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        userWallet
    )
 

    const setTx1 = await Greeter.setGreeting("web3 is ngmi!");
    await setTx1.wait();
    console.log("before: " + await Greeter.greet());

    // The second transaction does the exact same thing with a new input.
    const setTx2 = await Greeter.setGreeting("web3 is awesome!");
    await setTx2.wait();
    console.log("after: " + await Greeter.greet());
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
