const Web3 = require("web3");
const solc = require("solc"); // require the solc compiler

const contractSource = fs.readFileSync("./contract.sol", "utf8"); // define the Solidity contract source code

// Compile the contract
const input = {
  language: "Solidity",
  sources: {
    "TokenBalanceUtility.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const bytecode =
  output.contracts["TokenBalanceUtility.sol"]["TokenBalanceUtility"].evm
    .bytecode.object;
const abi =
  output.contracts["TokenBalanceUtility.sol"]["TokenBalanceUtility"].abi;

// Set up web3.js
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/{YourInfuraProjectId}"
  )
); // Replace this with your Infura project ID or your own node URL

// Create the contract object
const contract = new web3.eth.Contract(abi);

// Deploy the contract
const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); // Get the list of accounts
  const walletAddress = accounts[0]; // Use the first account
  const tokenAddresses = ["0x{TokenAddress1}", "0x{TokenAddress2}"]; // Replace these with the addresses of the tokens you want to query

  const newContractInstance = await contract
    .deploy({
      data: bytecode,
    })
    .send({
      from: walletAddress,
      gas: 1500000,
      gasPrice: "30000000000",
    });

  console.log("Contract deployed at:", newContractInstance.options.address);
  console.log(
    "Token balances:",
    await newContractInstance.methods
      .getAllTokenBalances(tokenAddresses, walletAddress)
      .call()
  );
};

deploy();
