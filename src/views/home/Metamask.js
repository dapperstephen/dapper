import Vue from 'vue'
import { ethers } from 'ethers'
import BN from 'bn.js'
let Provider = null


let ABI = [
  'function approve(address, uint256) view returns (boolean)',
  'function queryPools() view public returns(address[], tuple(uint256,uint256,uint256,uint256)[])',
  'function queryShares(address) public view returns (uint totalShares, uint shares, uint balances)',
  'function addLiquidity(address token, uint amount) payable',
  'function removeLiquidity(address token, uint shares) public',
  'function luckyOrder(address token, uint multiplier, uint orderAmount) public payable',
  'function decimals() public view returns (uint8)'
]
const encode_abi = require('./EncodeABI')
const callFrom = "0x0000000000000000000000000000000000000000";
const usdt = '0x1B7B3A2b6715856d14f3358589f45EBA7fCe9210'
const routerAddress = '0x2070C49BA53242E150bB3337665e5B573cFACf40'
const queryAddress = '0x426a0641fA825a9bC12946c8A2c9F0F086a71fEe'

async function getWeb3 () {
  var accounts = await requestAccounts()
  console.log('当前使用账号：', accounts[0])
  Vue.prototype.accounts = accounts[0]
  return accounts[0]
}

//查询币种
async function queryPools () {
  Provider = new ethers.providers.Web3Provider(window.ethereum)
  let daiContract = new ethers.Contract(queryAddress, ABI, Provider.getSigner(), {
    estimateGas: 100000
  })
  try {
    const pools = await daiContract.queryPools()
    console.log('币种:', pools)
    for (let index = 0; index < pools.length; index++) {
      const element = pools[1];
    }
    return pools
  } catch (error) {
    console.log(error)
    return 0
  }
}

//查询池子
async function queryShares (address) {
  Provider = new ethers.providers.Web3Provider(window.ethereum)
  let daiContract = new ethers.Contract(address, ABI, Provider.getSigner(), {
    estimateGas: 100000
  })
  try {
    const shares = await daiContract.queryShares(address)
    console.log('池子:', shares)
    return shares
  } catch (error) {
    console.log(error)
    return 0
  }
}
//查看代币精度
async function getTokenDecimal (token) {
  if (!token) return 0
  Provider = new ethers.providers.Web3Provider(window.ethereum)
  let daiContract = new ethers.Contract(token, ABI, Provider.getSigner(), {
    estimateGas: 100000
  })
  try {
    const decimals = await daiContract.decimals()
    console.log(decimals)
    return decimals
  } catch (error) {
    console.log(error)
    return 0
  }
}

//approve代币
async function approve (token, spender, number) {
  let tokenDecimal = await getTokenDecimal(token)
  console.log("tokenDecimal:"+tokenDecimal)
  let decimal = new BN(String(10 ** tokenDecimal))
  let a = [number]
  if (String(number).indexOf('.') !== -1) {
    a = number.split('.')
  }
  let a1 = new BN(a[0]).mul(decimal)
  let a2 = new BN(0)
  if (a[1] !== undefined) {
    a2 = new BN(a[1]).mul(new BN(String(10 ** (tokenDecimal - a[1].length)))).toString()
  }
  number = a1.add(new BN(a2)).toString()
  if (number === 0 || number === '0') {
    number = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  }
  var accounts = await requestAccounts()
  console.log('当前使用账号：', accounts[0])
  const provider = Provider
  const iface = new ethers.utils.Interface(ABI)
  let abiData = iface.encodeFunctionData('approve', [spender, number])
  // 计算gas值
  let gas = await provider.estimateGas({
    from: accounts[0],
    to: token,
    data: abiData,
    value: 0
  })
  const signer = provider.getSigner()
  console.log("signer:"+signer)
  const tx = {
    to: token,
    data: abiData,
    gasLimit: gas.toNumber()
  }
  return new Promise((resolve, reject) => {
    signer.sendTransaction(tx).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询是否approve
async function queryAllowance(web3, token, owner, spender) {
  var data = encode_abi.allowance(owner, spender)
  var res = await call(web3, callFrom, token, data)
  if (res[0]) {
    return res
  }
  var result = web3.eth.abi.decodeParameter('uint256', res[1])
  return [null, result]
}

//添加流动性
async function addLiquidity (token,amount) {
  //获取精度
  //let tokenDecimal = await getTokenDecimal(token)
  let tokenDecimal = 18
  let decimal = new BN(String(10 ** tokenDecimal))
  let a = [amount]
  if (String(amount).indexOf('.') !== -1) {
    a = amount.split('.')
  }
  let a1 = new BN(a[0]).mul(decimal)
  let a2 = new BN(0)
  if (a[1] !== undefined) {
    a2 = new BN(a[1]).mul(new BN(String(10 ** (tokenDecimal - a[1].length)))).toString()
  }
  amount = a1.add(new BN(a2)).toString()
  console.log("添加流动性数量："+amount)
  var accounts = await requestAccounts()
  console.log('当前使用账号：', accounts[0])
  const provider = Provider
  const iface = new ethers.utils.Interface(ABI)
  let payableValue = 0
  if(token.equals("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"))
  {
    payableValue = amount
  }
  let abiData = iface.encodeFunctionData('addLiquidity', [token, amount])
  // 计算gas值
  let gas = await provider.estimateGas({
    from: accounts[0],
    to: token,
    data: abiData,
    value: payableValue
  })
  const signer = provider.getSigner()
  const tx = {
    to: routerAddress,
    data: abiData,
    gasLimit: gas.toNumber()
  }
  return new Promise((resolve, reject) => {
    signer.sendTransaction(tx).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//移除流动性
async function removeLiquidity (token,shares) {
  //获取精度
  //let tokenDecimal = await getTokenDecimal(token)
  let tokenDecimal = 18
  let decimal = new BN(String(10 ** tokenDecimal))
  let a = [amount]
  if (String(amount).indexOf('.') !== -1) {
    a = amount.split('.')
  }
  let a1 = new BN(a[0]).mul(decimal)
  let a2 = new BN(0)
  if (a[1] !== undefined) {
    a2 = new BN(a[1]).mul(new BN(String(10 ** (tokenDecimal - a[1].length)))).toString()
  }
  shares = a1.add(new BN(a2)).toString()
  console.log("移除流动性数额："+shares)
  var accounts = await requestAccounts()
  console.log('当前使用账号：', accounts[0])
  const provider = Provider
  const iface = new ethers.utils.Interface(ABI)
  let abiData = iface.encodeFunctionData('removeLiquidity', [token, shares])
  // 计算gas值
  let gas = await provider.estimateGas({
    from: accounts[0],
    to: token,
    data: abiData,
    value: 0
  })
  const signer = provider.getSigner()
  const tx = {
    to: routerAddress,
    data: abiData,
    gasLimit: gas.toNumber()
  }
  return new Promise((resolve, reject) => {
    signer.sendTransaction(tx).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//移除流动性
async function luckyOrder (token,multiplier,orderAmount) {
  //获取精度
  //let tokenDecimal = await getTokenDecimal(token)
  let tokenDecimal = 18
  let decimal = new BN(String(10 ** tokenDecimal))
  let a = [orderAmount]
  if (String(orderAmount).indexOf('.') !== -1) {
    a = orderAmount.split('.')
  }
  let a1 = new BN(a[0]).mul(decimal)
  let a2 = new BN(0)
  if (a[1] !== undefined) {
    a2 = new BN(a[1]).mul(new BN(String(10 ** (tokenDecimal - a[1].length)))).toString()
  }
  orderAmount = a1.add(new BN(a2)).toString()
  console.log("下单："+orderAmount)
  var accounts = await requestAccounts()
  console.log('当前使用账号：', accounts[0])
  const provider = Provider
  const iface = new ethers.utils.Interface(ABI)
  let abiData = iface.encodeFunctionData('luckyOrder', [token,multiplier,orderAmount])
  let payableValue = 0;
  if(token.equals("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"))
  {
    payableValue = orderAmount
  }
  // 计算gas值
  let gas = await provider.estimateGas({
    from: accounts[0],
    to: token,
    data: abiData,
    value: payableValue
  })
  const signer = provider.getSigner()
  const tx = {
    to: routerAddress,
    data: abiData,
    gasLimit: gas.toNumber()
  }
  return new Promise((resolve, reject) => {
    signer.sendTransaction(tx).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}



function call(web3, from, to, data) {
  return new Promise((resolve, reject) => {
    web3.eth.call({ from: from, to: to, data: data }, (function (err, res) {
      if (err) {
        return resolve([err])
      }
      return resolve([null, res])
    }))
  })
}


function requestAccounts () {
  return window.ethereum.request({
    method: 'eth_requestAccounts'
  })
}



async function showBalance (token) {
  var accounts = await requestAccounts()
  var balance = 0
  if (token) {
    balance = await getTokenBalance(token, accounts[0])
  } else {
    balance = await getBalance(accounts)
  }
  return balance
}

function getBalance (accounts) {
  Provider = new ethers.providers.Web3Provider(window.ethereum)
  return Provider.getBalance(accounts[0]).then((balance) => {
    let etherString = ethers.utils.formatEther(balance)
    return etherString
  }).catch(err => {
    console.log('err', err)
  })
}

async function getTokenBalance (token, address) {
  if (!token) return 0
  const ABI = [
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    'function balanceOf(address) view returns (uint)'
  ]
  Provider = new ethers.providers.Web3Provider(window.ethereum)
  let daiContract = new ethers.Contract(token, ABI, Provider.getSigner(), {
    estimateGas: 100000
  })
  try {
    const decimals = await daiContract.decimals()
    const res = await daiContract.balanceOf(address)
    const balance = ethers.utils.formatUnits(res.toString(), decimals)
    console.log('余额:', balance)
    return balance
  } catch (error) {
    console.log(error)
    return 0
  }
}



export {
  getWeb3, requestAccounts, approve, getBalance, showBalance, getTokenBalance,queryPools,queryShares,getTokenDecimal,addLiquidity,removeLiquidity,luckyOrder
}
