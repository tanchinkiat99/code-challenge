pragma solidity ^0.8.0;

contract TokenBalanceUtility {
    function getTokenBalance(address tokenAddress, address walletAddress) public view returns (uint256) {
        // call the balanceOf function on the token contract
        (bool success, bytes memory data) = tokenAddress.staticcall(abi.encodeWithSignature("balanceOf(address)", walletAddress));
        require(success, "balanceOf call failed");
        return abi.decode(data, (uint256));
    }

    function getAllTokenBalances(address[] memory tokenAddresses, address walletAddress) public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](tokenAddresses.length);
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            balances[i] = getTokenBalance(tokenAddresses[i], walletAddress);
        }
        return balances;
    }
}