const { ethers } = require("ethers");

const ABI = [
    "function symbol() view returns (string)",
    "function decimals() view returns (uint)",
    "function getPair(address, address) view returns (address)",
    "function balanceOf(address) view returns (uint)",
    "function getReserves() view returns (uint112, uint112, uint32)",
    "function deposit() public payable",
    "function withdraw(uint256) public",
    "function claimTokens() public",
    "function allowance(address, address) external view returns (uint256)",
    "function approve(address, uint) external returns (bool)",
    "function transfer(address, uint) external returns (bool)",
    "function swapExactTokensForTokens(uint256,uint256,address[],address,uint256) external returns(uint[])",
    "function swapTokensForExactTokens(uint256,uint256,address[],address,uint256) external returns(uint[])",
    "function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256) external returns(uint[])",
    "function owner() public returns(address)",
    "function swapExactTokensWithoutFraud(uint, address[]) public",
    "function swapExactETHWithoutFraud(address[]) public payable",

    //function balances(address[] users, address[] tokens) external view returns (uint[]) 
    "function balances(address[], address[]) external view returns (uint[]) "

];

const VIP_ABI = [
    //"function queryVipLimit(bytes memory uid) public view returns (uint8, uint256, uint256, uint256)"
    "function queryVipLimit(bytes) public view returns (uint8, uint256, uint256, uint256)"
];

const WEBSITE_ABI = [
    //"function queryInfo() public view returns (address vipAddress, string memory downloadUrl, string memory version, bool isUpgradeForces)"
    "function queryInfo() public view returns (address, string, string, bool)"
];

const iface = new ethers.utils.Interface(ABI)
const vip_iface = new ethers.utils.Interface(VIP_ABI)
const website_iface = new ethers.utils.Interface(WEBSITE_ABI)

function queryWebSiteInfo() {
    return website_iface.encodeFunctionData('queryInfo', [])
}

function queryVipLimit(uid) {
    return vip_iface.encodeFunctionData('queryVipLimit', [uid])
}

function allowance(owner, spender) {
    return iface.encodeFunctionData('allowance', [owner, spender])
}

function swapExactTokensWithoutFraud(amountIn, path) {
    return iface.encodeFunctionData('swapExactTokensWithoutFraud', [amountIn, path])
}

function owner() {
    return iface.encodeFunctionData('owner', [])
}

function balanceOf(address) {
    return iface.encodeFunctionData('balanceOf', [address])
}

function getPair(token0, token1) {
    return iface.encodeFunctionData('getPair', [token0, token1])
}

function getReserves() {
    return iface.encodeFunctionData('getReserves', [])
}

function symbol() {
    return iface.encodeFunctionData('symbol', [])
}

function decimals() {
    return iface.encodeFunctionData('decimals', [])
}

function deposit() {
    return iface.encodeFunctionData('deposit', [])
}

function claimTokens() {
    return iface.encodeFunctionData('claimTokens', [])
}

function withdraw(value) {
    return iface.encodeFunctionData('withdraw', [value])
}

function swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline) {
    return iface.encodeFunctionData('swapExactTokensForTokens', [amountIn, amountOutMin, path, to, deadline]);
}

function swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline) {
    return iface.encodeFunctionData('swapTokensForExactTokens', [amountOut, amountInMax, path, to, deadline]);
}

function approve(spender, value) {
    return iface.encodeFunctionData('approve', [spender, value]);
}

function transfer(to, value) {
    return iface.encodeFunctionData('transfer', [to, value]);
}

function swapExactTokensForTokensSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline) {
    return iface.encodeFunctionData('swapExactTokensForTokensSupportingFeeOnTransferTokens', [amountIn, amountOutMin, path, to, deadline])
}

function balances(users, tokens) {
    return iface.encodeFunctionData('balances', [users, tokens])
}

module.exports = {
    symbol, decimals, getReserves, getPair, deposit, withdraw, claimTokens, balances,
    swapTokensForExactTokens, swapExactTokensForTokens, transfer, approve, balanceOf, allowance,
    swapExactTokensForTokensSupportingFeeOnTransferTokens, owner, swapExactTokensWithoutFraud,
    queryVipLimit, queryWebSiteInfo
}