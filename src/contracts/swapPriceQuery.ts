import Web3 from 'web3'
import { BigNumber as BigNumberEthers } from 'ethers'
import BigNumber from 'bignumber.js'
import { ETHINIT, ZORE } from '@/contracts/tokenList'

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURAID}`)

// eslint-disable-next-line max-len
const MultiCallAbi =
  '[{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"},{"internalType":"bool[]","name":"success","type":"bool[]"}],"stateMutability":"view","type":"function"}]'
// eslint-disable-next-line max-len
const OffChainOracleAbi =
  '[{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"},{"internalType":"contract IOracle[]","name":"existingOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"},{"internalType":"contract IERC20[]","name":"existingConnectors","type":"address[]"},{"internalType":"contract IERC20","name":"wBase","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract MultiWrapper","name":"multiWrapper","type":"address"}],"name":"MultiWrapperUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"addConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"addOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"connectors","outputs":[{"internalType":"contract IERC20[]","name":"allConnectors","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"bool","name":"useWrappers","type":"bool"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"bool","name":"useSrcWrappers","type":"bool"}],"name":"getRateToEth","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiWrapper","outputs":[{"internalType":"contract MultiWrapper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracles","outputs":[{"internalType":"contract IOracle[]","name":"allOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"removeConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"removeOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"}],"name":"setMultiWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'

const offChainOracleAddress = '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb'

const multiCallContract = new web3.eth.Contract(JSON.parse(MultiCallAbi), '0xda3c19c6fe954576707fa24695efb830d9cca1ca')
const offChainOracleContract = new web3.eth.Contract(JSON.parse(OffChainOracleAbi))

const callData = ETHINIT.tokens.map((token) => ({
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
    const { results, success } = await multiCallContract.methods.multicall(callData).call()
    let prices: any = {}
    for (let i = 0; i < results.length; i++) {
      if (!success[i]) {
        continue
      }
      const decodedRate = web3.eth.abi.decodeParameter('uint256', results[i]).toString()
      const numerator = BigNumberEthers.from(10).pow(ETHINIT.tokens[i].decimals)
      const denominator = BigNumberEthers.from(10).pow(18) // eth decimals
      const price = BigNumberEthers.from(decodedRate).mul(numerator).div(denominator)
      prices[ETHINIT.tokens[i].address] = price.toString()
    }
    // console.log('formToken, toToken', formToken, toToken)
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
    return await { price: '0'.toString(), isSuccess: false }
  }
}
