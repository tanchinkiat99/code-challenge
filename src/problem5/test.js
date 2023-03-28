const { ethers } = require("ethers");

const ADDR = "…";   // your contract address
const ABI = fetch('abi.json')
.then(response => response.json());

const ADDRESS = "…"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
	"…",
	"…",
];

// RPC provider url
const provider = ethers.providers.getDefaultProvider();

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);

  const balances = await contract.getBalances(ADDRESS, tokens);
	
	return balances;
};

test().then(console.log);