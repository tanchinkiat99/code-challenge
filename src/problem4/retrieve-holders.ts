import Web3 from "web3";

const rpcUrl = "https://bsc-dataseed.binance.org/"; // Binance Smart Chain RPC endpoint
const contractAddress = "0x250b211EE44459dAd5Cd3bCa803dD6a7EcB5d46C"; // SWTH token contract address
const limit = 100; // number of top holders to retrieve

const web3 = new Web3(rpcUrl);

async function getTopHolders(): Promise<void> {
  try {
    const tokenContract = new web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
      ],
      contractAddress
    );

    const holders: { address: string; balance: string }[] = [];

    const totalSupply = await tokenContract.methods.totalSupply().call();

    for (let i = 0; i < limit; i++) {
      const address = await tokenContract.methods
        .tokenHolders(i)
        .call()
        .catch(() => null);
      if (address) {
        const balance = await tokenContract.methods.balanceOf(address).call();
        holders.push({ address, balance });
      }
    }

    for (const holder of holders) {
      console.log(`${holder.address}: ${holder.balance}`);
    }
  } catch (error) {
    console.error(error);
  }
}

getTopHolders();
