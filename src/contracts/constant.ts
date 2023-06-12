import { REACT_APP_ENV } from '@/contracts/chains'
import Financing from '@/contracts/abis/Financing.json'
import GMDToken from '@/contracts/abis/GMDToken.json'
import Governance from '@/contracts/abis/Governance.json'
import InvitationRewards from '@/contracts/abis/InvitationRewards.json'
import LPToken from '@/contracts/abis/LPToken.json'
import PriceOracle from '@/contracts/abis/PriceOracle.json'
import StakingRewards from '@/contracts/abis/StakingRewards.json'
import Swap from '@/contracts/abis/Swap.json'
import Tether from '@/contracts/abis/Tether.json'
import Timelock from '@/contracts/abis/Timelock.json'
import Treasury from '@/contracts/abis/Treasury.json'
import UniswapLiquidity from '@/contracts/abis/UniswapLiquidity.json'
import LiquidityStaking from '@/contracts/abis/LiquidityStaking.json'

import { TokenSelectOptionsType } from '@/common/type.d'
import { localData, polygonTestData, uatLocalTestData, bscData, bscTestData } from './tokenList'

interface ConstantChainIdType {
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
  SwapSelectOptions: TokenSelectOptionsType[]
  apiUrl: string
  apiKey: string
  blockExplorerUrl: string
  tokenSelectOptions: TokenSelectOptionsType[]
  tokenConstant: { token: string; constantAbi: any }[]
  fullName: string
  liquidityUri: string
  symbolETH: string
  symbolETHs: string[]
}

interface UseConstantType {
  [chainId: number]: ConstantChainIdType
}

export const DEFAULT_CHAINID_ENV: { [env: string]: number } = {
  dev: 80001,
  uat: 97,
  prd: 56,
}

export const useConstant: { [env: string]: UseConstantType } = {
  dev: {
    1337: {
      Financing_Address: '',
      GMDToken_Address: '',
      Governance_Address: '',
      InvitationRewards_Address: '',
      LPToken_Address: '',
      PriceOracle_Address: '',
      StakingRewards_Address: '',
      Tether_Address: '',
      Timelock_Address: '',
      Treasury_Address: '',
      LiquidityStaking: '',
      UniswapLiquidity: '',
      Swap_Address: '0xBBb6344b7a9aE5E7c940B7725D3663Cd9EcA64A1',
      apiKey: '',
      apiUrl: '',
      fullName: 'local Test',
      blockExplorerUrl: '',
      tokenSelectOptions: localData.options,
      tokenConstant: localData.tokenConstant,
      SwapSelectOptions: localData.swapOptions,
      liquidityUri: '',
      symbolETH: '',
      symbolETHs: ['', ''],
    },
    80001: {
      Financing_Address: '0x149bA892568261dDd8d044941941e0911c42ff56',
      GMDToken_Address: '0x1d4F8BB45895FEFbC1371EfD09cF059475FEAe9D',
      Governance_Address: '0x2DCE4Ef679Fb363F9817963Db1eb5810943B16ce',
      InvitationRewards_Address: '0x924037479855F22D5bD39460922E71e8E3D12ce0',
      LPToken_Address: '0xd30761bA04B691D58f4Ae28DA882c25b14D78C93',
      PriceOracle_Address: '0x46e42d1Adf62135557A2F49BC81367BbFDAF73f5',
      StakingRewards_Address: '0x823AaF1a57864Bc54c379C8f8F2431f20D0192D1',
      Tether_Address: '0xA45742B870F3602177275Bdf713bD0287741Fe0b',
      Timelock_Address: '0x359D5d92653020e2200899511B8bDF5F8488972A',
      Treasury_Address: '0x91456699AF8031c4faD4164e1e1Cf87eA04Cb51B',
      Swap_Address: '',
      LiquidityStaking: '0x0f2753DaCB86652CFd9FF1E1ECe3d4478Ce34D4C',
      UniswapLiquidity: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
      apiKey: 'R6H91I1RMZRJA6XPDHHCY3S6659CTN3N5Q',
      apiUrl: 'https://api-testnet.polygonscan.com',
      fullName: 'Polygon Testnet',
      blockExplorerUrl: 'https://mumbai.polygonscan.com',
      tokenSelectOptions: polygonTestData.options,
      tokenConstant: polygonTestData.tokenConstant,
      SwapSelectOptions: polygonTestData.swapOptions,
      liquidityUri: 'https://app.uniswap.org/#/add/0x1d4F8BB45895FEFbC1371EfD09cF059475FEAe9D/ETH/3000',
      symbolETH: 'GMD/MATIC',
      symbolETHs: ['0x1d4F8BB45895FEFbC1371EfD09cF059475FEAe9D', ''],
    },
  },
  uat: {
    1137: {
      Financing_Address: '',
      GMDToken_Address: '',
      Governance_Address: '',
      InvitationRewards_Address: '',
      LPToken_Address: '',
      PriceOracle_Address: '',
      StakingRewards_Address: '',
      Tether_Address: '0x55d398326f99059fF775485246999027B3197955',
      Timelock_Address: '',
      Treasury_Address: '',
      LiquidityStaking: '',
      UniswapLiquidity: '',
      Swap_Address: '0xF9334685D8536019cA93d5A91531942A2485A9Fd',
      apiKey: '366TDMB1M11NCFABM78212QFUM81INYK1C',
      apiUrl: 'https://api-testnet.bscscan.com',
      fullName: 'BNB Smart Chain Test',
      blockExplorerUrl: 'https://testnet.bscscan.com',
      tokenSelectOptions: uatLocalTestData.options,
      tokenConstant: uatLocalTestData.tokenConstant,
      SwapSelectOptions: uatLocalTestData.swapOptions,
      liquidityUri: 'http://pancakeswap.finance/add/BNB/0xB62E10B2d0671948e963D970D0911616F31e59cb/2500',
      symbolETH: 'BUSD/BNB',
      symbolETHs: ['', ''],
    },
    97: {
      Financing_Address: '0xc2B5a4E3d37FDD0F0D0DEe6e2fB442595ab50e4C',
      GMDToken_Address: '0xbFD0e78Fd702c6c0794301E8844204DDE86B8c06',
      Governance_Address: '0x0FE3DcbB4B63e60DFE2EC1183D69BEF775880093',
      InvitationRewards_Address: '0x3ecc01b6b92FDB195d3dB8eFA100f4E0209464a1',
      LPToken_Address: '0xcdd86fdc6B1f94e4F5Df42651C0728B44C52cedb',
      PriceOracle_Address: '0x188fC3cb709A81023C87F1ba920eD4E2d68F19AC',
      StakingRewards_Address: '0x806896d693C948A0B279D00C32403B53fEB997B3',
      Tether_Address: '0xA11c8D9DC9b66E209Ef60F0C8D969D3CD988782c',
      Timelock_Address: '0x8d2FcFf867bbbf4A976A177ae9c7F0571C5D50a4',
      Treasury_Address: '0xeE6e0351F18255B5D23C32974eAe5CF0b347EA7E',
      LiquidityStaking: '0x1DFBf084410f6e66cf7E41f029D4839BdF72fD17',
      UniswapLiquidity: '0x427bF5b37357632377eCbEC9de3626C71A5396c1',
      Swap_Address: '0xF9334685D8536019cA93d5A91531942A2485A9Fd',
      apiKey: '366TDMB1M11NCFABM78212QFUM81INYK1C',
      apiUrl: 'https://api-testnet.bscscan.com',
      fullName: 'BNB Smart Chain Test',
      blockExplorerUrl: 'https://testnet.bscscan.com',
      tokenSelectOptions: bscTestData.options,
      tokenConstant: bscTestData.tokenConstant,
      SwapSelectOptions: bscTestData.swapOptions,
      liquidityUri:
        'https://pancakeswap.finance/add/0xA11c8D9DC9b66E209Ef60F0C8D969D3CD988782c/0xbFD0e78Fd702c6c0794301E8844204DDE86B8c06/100?chain=bscTestnet',
      symbolETH: 'USDT/GMD',
      symbolETHs: ['0xA11c8D9DC9b66E209Ef60F0C8D969D3CD988782c', '0xbfd0e78fd702c6c0794301e8844204dde86b8c06'],
    },
  },
  prd: {
    56: {
      Financing_Address: '0xBaD2d46b664bAFe18aC4B806edFB07efD6F7FDe2',
      GMDToken_Address: '0x53d851131f9a82b97af8a32d70c57B5C24c429cE',
      Governance_Address: '0x452221D0E9148d29460B058113b332885dbA47B9',
      InvitationRewards_Address: '0xBe3C302C93017098Ce013CcC1Af3c1B8F105E4BD',
      LPToken_Address: '0x7dff526FcC9695f9E5b3eeE4EA983A3C685d67ab',
      PriceOracle_Address: '0x92A011Cf7056d906e75bb05cE4a1D975Dc200365',
      StakingRewards_Address: '0x19DE03eb5979dEe621Ab823112559d1c1553bdc5',
      Tether_Address: '0x55d398326f99059ff775485246999027b3197955',
      Timelock_Address: '0xFfdB108ED69b3077ABF6a75C1794E9e33d7dd7B3',
      Treasury_Address: '0xE8Ad852E2fb1455872d63Bf7E79Fb320874287Cd',
      LiquidityStaking: '0xe3b117C155034556d56c47879143834FAbA28478',
      UniswapLiquidity: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
      Swap_Address: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
      apiKey: '366TDMB1M11NCFABM78212QFUM81INYK1C',
      apiUrl: 'https://api.bscscan.com',
      blockExplorerUrl: 'https://bscscan.com',
      fullName: 'BNB Smart Chain Mainnet',
      tokenSelectOptions: bscData.options,
      tokenConstant: bscData.tokenConstant,
      SwapSelectOptions: bscData.swapOptions,
      liquidityUri:
        'https://pancakeswap.finance/add/0x55d398326f99059ff775485246999027b3197955/0x53d851131f9a82b97af8a32d70c57B5C24c429cE/100?chain=bsc',
      symbolETH: 'USDT/GMD',
      symbolETHs: ['0x55d398326f99059ff775485246999027b3197955', '0x53d851131f9a82b97af8a32d70c57B5C24c429cE'],
    },
  },
}

export const Financing_ABI: any = Financing
export const GMDToken_ABI: any = GMDToken
export const Governance_ABI: any = Governance
export const InvitationRewards_ABI: any = InvitationRewards
export const LPToken_ABI: any = LPToken
export const PriceOracle_ABI: any = PriceOracle
export const StakingRewards_ABI: any = StakingRewards
export const Swap_ABI: any = Swap
export const Tether_ABI: any = Tether
export const Treasury_ABI: any = Treasury
export const Timelock_ABI: any = Timelock
export const UniswapLiquidity_ABI: any = UniswapLiquidity
export const LiquidityStaking_ABI: any = LiquidityStaking

export const DEFAULT_CHAINID: number = DEFAULT_CHAINID_ENV[REACT_APP_ENV]

export const USECONSTANT: UseConstantType = useConstant[REACT_APP_ENV]

export const getActiveChainId = (arr: string[], network: number) => {
  if (network === null) return false
  return arr.some((item) => Number(item) === Number(network))
}
