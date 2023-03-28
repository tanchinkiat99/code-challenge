pragma solidity ^0.8.0;

interface ERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract TokenBalanceChecker {
    function getBalances(address _wallet, address[] calldata _tokens) external view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](_tokens.length);
        for (uint i = 0; i < _tokens.length; i++) {
            ERC20 token = ERC20(_tokens[i]);
            balances[i] = token.balanceOf(_wallet);
        }
        return balances;
    }
}
