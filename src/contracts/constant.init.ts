import Web3 from 'web3'
import {
  Timelock_ABI,
  Governance_ABI,
  LPToken_ABI,
  Tether_ABI,
  PriceOracle_ABI,
  Treasury_ABI,
  USECONSTANT,
  Swap_ABI,
  Financing_ABI,
  GMDToken_ABI,
  InvitationRewards_ABI,
  StakingRewards_ABI,
  LiquidityStaking_ABI,
  UniswapLiquidity_ABI,
} from '@/contracts/constant'
import { REACT_APP_ENV } from '@/contracts/chains'
import { TokenSelectOptionsType } from '@/common/type'
import BigNumber from 'bignumber.js'

export interface ConstantTypes {
  ContractFinancing: any
  ContractGMDToken: any
  ContractGovernance: any
  ContractInvitationRewards: any
  ContractLPToken: any
  ContractPriceOracle: any
  ContractStakingRewards: any
  ContractTether: any
  ContractTimelock: any
  ContractTreasury: any
  ContractSwap: any
  ContractLiquidityStaking: any
  ContractUniswapLiquidity: any
}

export interface ConstantInitTypes {
  web3: Web3
  Financing_Address: string
  GMDToken_Address: string
  Governance_Address: string
  InvitationRewards_Address: string
  LPToken_Address: string
  PriceOracle_Address: string
  StakingRewards_Address: string
  Tether_Address: string
  Timelock_Address: string
  Treasury_Address: string
  Swap_Address: string
  LiquidityStaking: string
  UniswapLiquidity: string
  constant: ConstantTypes
  toWeiPowBanlance: ({ decimals, balance }: { decimals: string; balance: string }) => string
  fromWeiPowBanlance: ({ decimals, balance }: { decimals: string; balance: string }) => string
  fromWeiPowBanlances: ({ decimals, balance }: { decimals: string; balance: string }) => string
  apiUrl: string
  apiKey: string
  blockExplorerUrl: string
  fullName: string
  tokenSelectOptions: TokenSelectOptionsType[]
  tokenConstant: { token: string; constantAbi: any }[]
  SwapSelectOptions: TokenSelectOptionsType[]
  liquidityUri: string
  symbolETH: string
  symbolETHs: string[]
}

export class ConstantInit {
  web3: Web3
  Financing_Address: string
  GMDToken_Address: string
  Governance_Address: string
  InvitationRewards_Address: string
  LPToken_Address: string
  PriceOracle_Address: string
  StakingRewards_Address: string
  Tether_Address: string
  Timelock_Address: string
  Treasury_Address: string
  Swap_Address: string
  LiquidityStaking: string
  UniswapLiquidity: string
  constant: ConstantTypes
  apiUrl: string
  blockExplorerUrl: string
  apiKey: string
  symbolETH: string
  tokenSelectOptions: TokenSelectOptionsType[]
  tokenConstant: { token: string; constantAbi: any }[]
  fullName: string
  SwapSelectOptions: TokenSelectOptionsType[]
  liquidityUri: string
  symbolETHs: string[]

  constructor(provider: any, chainId: number) {
    const {
      Financing_Address,
      GMDToken_Address,
      Governance_Address,
      InvitationRewards_Address,
      LPToken_Address,
      PriceOracle_Address,
      StakingRewards_Address,
      Timelock_Address,
      Treasury_Address,
      Tether_Address,
      apiKey,
      apiUrl,
      blockExplorerUrl,
      tokenSelectOptions,
      tokenConstant,
      fullName,
      Swap_Address,
      SwapSelectOptions,
      liquidityUri,
      LiquidityStaking,
      UniswapLiquidity,
      symbolETH,
      symbolETHs,
    } = USECONSTANT[chainId]

    this.symbolETHs = symbolETHs
    this.web3 = new Web3(provider)
    this.liquidityUri = liquidityUri
    this.Financing_Address = Financing_Address
    this.GMDToken_Address = GMDToken_Address
    this.Governance_Address = Governance_Address
    this.InvitationRewards_Address = InvitationRewards_Address
    this.LPToken_Address = LPToken_Address
    this.PriceOracle_Address = PriceOracle_Address
    this.StakingRewards_Address = StakingRewards_Address
    this.Timelock_Address = Timelock_Address
    this.Treasury_Address = Treasury_Address
    this.Tether_Address = Tether_Address
    this.LiquidityStaking = LiquidityStaking
    this.UniswapLiquidity = UniswapLiquidity
    this.tokenSelectOptions = tokenSelectOptions
    this.tokenConstant = tokenConstant
    this.apiKey = apiKey
    this.symbolETH = symbolETH
    this.apiUrl = apiUrl
    this.blockExplorerUrl = blockExplorerUrl
    this.Swap_Address = Swap_Address
    this.SwapSelectOptions = SwapSelectOptions
    this.constant = {
      ContractFinancing: new this.web3.eth.Contract(Financing_ABI, Financing_Address),
      ContractGMDToken: new this.web3.eth.Contract(GMDToken_ABI, GMDToken_Address),
      ContractGovernance: new this.web3.eth.Contract(Governance_ABI, Governance_Address),
      ContractInvitationRewards: new this.web3.eth.Contract(InvitationRewards_ABI, InvitationRewards_Address),
      ContractLPToken: new this.web3.eth.Contract(LPToken_ABI, LPToken_Address),
      ContractPriceOracle: new this.web3.eth.Contract(PriceOracle_ABI, PriceOracle_Address),
      ContractStakingRewards: new this.web3.eth.Contract(StakingRewards_ABI, StakingRewards_Address),
      ContractTether: new this.web3.eth.Contract(Tether_ABI, Tether_Address),
      ContractTimelock: new this.web3.eth.Contract(Timelock_ABI, Timelock_Address),
      ContractTreasury: new this.web3.eth.Contract(Treasury_ABI, Treasury_Address),
      ContractSwap: new this.web3.eth.Contract(Swap_ABI, Swap_Address),
      ContractLiquidityStaking: new this.web3.eth.Contract(LiquidityStaking_ABI, LiquidityStaking),
      ContractUniswapLiquidity: new this.web3.eth.Contract(UniswapLiquidity_ABI, UniswapLiquidity),
    }
    this.fullName = fullName
    console.log('REACT_APP_ENV', REACT_APP_ENV)
  }

  fromWeiPowBanlance = ({ decimals, balance }: { decimals: string; balance: string }) => {
    let wei = new BigNumber(10).pow(decimals)
    let balances = new BigNumber(balance).div(wei).toFixed(6)
    return balances
  }

  fromWeiPowBanlances = ({ decimals, balance }: { decimals: string; balance: string }) => {
    let wei = new BigNumber(10).pow(decimals)
    let balances = new BigNumber(balance).div(wei)
    return balances.toString()
  }

  toWeiPowBanlance = ({ decimals, balance }: { decimals: string; balance: string }) => {
    let wei = new BigNumber(10).pow(decimals)
    let balances = new BigNumber(balance).times(wei).toFixed(0)
    return balances
  }
}
