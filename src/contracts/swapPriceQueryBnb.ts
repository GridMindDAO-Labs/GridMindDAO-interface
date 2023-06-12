import Web3 from 'web3'
import { BigNumber as BigNumberEthers } from 'ethers'
import BigNumber from 'bignumber.js'
import { bscData, ZORE } from '@/contracts/tokenList'

const web3 = new Web3(`https://bsc-dataseed1.binance.org`)

// eslint-disable-next-line max-len
const MultiCallAbi =
  '[{"inputs":[],"name":"gasLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaslimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"}],"name":"multicallWithGas","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"},{"internalType":"uint256[]","name":"gasUsed","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"},{"internalType":"uint256","name":"gasBuffer","type":"uint256"}],"name":"multicallWithGasLimitation","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"},{"internalType":"uint256","name":"lastSuccessIndex","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]'
// eslint-disable-next-line max-len
const OffChainOracleAbi =
  '[{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"},{"internalType":"contract IOracle[]","name":"existingOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"},{"internalType":"contract IERC20[]","name":"existingConnectors","type":"address[]"},{"internalType":"contract IERC20","name":"wBase","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract MultiWrapper","name":"multiWrapper","type":"address"}],"name":"MultiWrapperUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"addConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"addOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"connectors","outputs":[{"internalType":"contract IERC20[]","name":"allConnectors","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"bool","name":"useWrappers","type":"bool"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"bool","name":"useSrcWrappers","type":"bool"}],"name":"getRateToEth","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiWrapper","outputs":[{"internalType":"contract MultiWrapper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracles","outputs":[{"internalType":"contract IOracle[]","name":"allOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"removeConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"removeOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"}],"name":"setMultiWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'

const offChainOracleAddress = '0xfbD61B037C325b959c0F6A7e69D8f37770C2c550'

const multiCallContract = new web3.eth.Contract(JSON.parse(MultiCallAbi), '0x804708de7af615085203fa2b18eae59c5738e2a9')
const offChainOracleContract = new web3.eth.Contract(JSON.parse(OffChainOracleAbi))

const callData = bscData.tokens.map((token) => ({
  to: offChainOracleAddress,
  data: offChainOracleContract.methods
    .getRateToEth(
      token.address,
      false, // use wrapper
    )
    .encodeABI(),
}))

type Types = {
  formToken: string
  toToken: string
}

export const SwapPriceQuery = async ({ formToken, toToken }: Types): Promise<{ price: string; isSuccess: boolean }> => {
  try {
    const results = await multiCallContract.methods.multicall(callData).call()
    let prices: any = {}
    for (let i = 0; i < results.length; i++) {
      const decodedRate = web3.eth.abi.decodeParameter('uint256', results[i]).toString()
      console.log('decodedRate', decodedRate)
      const numerator = BigNumberEthers.from(10).pow(bscData.tokens[i].decimals)
      const denominator = BigNumberEthers.from(10).pow(18) // eth decimals
      const price = BigNumberEthers.from(decodedRate).mul(numerator).div(denominator)
      prices[bscData.tokens[i].address] = price.toString()
    }
    console.log('prices', prices)
    if (formToken === ZORE) {
      let denominator = new BigNumber(10).pow('18') // eth decimals
      let balances = new BigNumber(prices[toToken]).div(denominator)
      let price = new BigNumber(1).div(balances)
      return await { price: price.toString(), isSuccess: true }
    } else if (toToken === ZORE) {
      let denominator = new BigNumber(10).pow('18') // eth decimals
      let balances = new BigNumber(prices[formToken]).div(denominator)
      return await { price: balances.toString(), isSuccess: true }
    } else {
      let denominator = new BigNumber(10).pow('18') // eth decimals
      let formTokenBalanceEths = new BigNumber(prices[formToken]).div(denominator)
      let toTokenBalanceEths = new BigNumber(prices[toToken]).div(denominator)
      let balances = new BigNumber(formTokenBalanceEths).div(toTokenBalanceEths)
      return await { price: balances.toString(), isSuccess: true }
    }
  } catch (error) {
    console.log('error', error)
    return await { price: '0'.toString(), isSuccess: false }
  }
}
