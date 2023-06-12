/* eslint-disable */
import Icon from '@ant-design/icons'
import { EthIconSvg, DAIIconSvg, UsdtIconSvg, UsdcIconSvg, AitokenSvg, BNBIconSvg } from '@/contracts/icon'
import { TokenSelectOptionsType } from '@/common/type.d'
import polygonMin from '@/assets/token/polygon-min.svg'
import stETH from '@/assets/token/stETH.png'
import gmd from '@/assets/token/gmd.svg'
import { Image } from 'antd'
import { TokenCurrentAccountPriceType } from '@/common/data'

import Dai from '@/contracts/abis/Dai.json'
import Tether from '@/contracts/abis/Tether.json'
import GMDToken from '@/contracts/abis/GMDToken.json'
import USDC from '@/contracts/abis/USDC.json'

type DataTypes = {
  options: TokenSelectOptionsType[]
  swapOptions: TokenSelectOptionsType[]
  tokens: { address: string; decimals: number }[]
  tokenCurrentAccountPriceInit: TokenCurrentAccountPriceType[]
  tokenConstant: { token: string; constantAbi: any }[]
}
/**
 * tokenConstant: [
    { token: '0x55d398326f99059ff775485246999027b3197955', constantAbi: Tether },
    { token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', constantAbi: USDC },
    { token: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', constantAbi: Dai },
    { token: '0x53d851131f9a82b97af8a32d70c57B5C24c429cE', constantAbi: GMDToken },
  ],
 */
export const BNBINIT: {
  swapOptions: TokenSelectOptionsType[]
  tokens: { address: string; decimals: number }[]
  tokenCurrentAccountPriceInit: TokenCurrentAccountPriceType[]
} = {
  swapOptions: [
    { value: 'USDT', icon: <Icon component={UsdtIconSvg} />, address: '0x55d398326f99059ff775485246999027b3197955' },
    { value: 'USDC', icon: <Icon component={UsdcIconSvg} />, address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' },
    { value: 'DAI', icon: <Icon component={DAIIconSvg} />, address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3' },
    {
      value: 'GMD',
      icon: <Image style={{ width: 22, height: 'auto' }} src={gmd} preview={false} />,
      address: '0x53d851131f9a82b97af8a32d70c57B5C24c429cE',
    },
  ],
  tokens: [
    {
      address: '0x55d398326f99059ff775485246999027b3197955', // USDT
      decimals: 18,
    },
    {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
      decimals: 18,
    },
    {
      address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI
      decimals: 18,
    },
    {
      address: '0x53d851131f9a82b97af8a32d70c57B5C24c429cE', // GMD
      decimals: 18,
    },
  ],
  tokenCurrentAccountPriceInit: [
    { token: '0x55d398326f99059fF775485246999027B3197955', balance: '0', type: 'USDT' },
    { token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', balance: '0', type: 'USDC' },
    { token: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', balance: '0', type: 'DAI' },
    { token: '0x53d851131f9a82b97af8a32d70c57B5C24c429cE', balance: '0', type: 'GMD' },
  ],
}

export const ETHINIT: {
  swapOptions: TokenSelectOptionsType[]
  tokens: { address: string; decimals: number }[]
  tokenCurrentAccountPriceInit: TokenCurrentAccountPriceType[]
} = {
  swapOptions: [
    { value: 'ETH', icon: <Icon component={EthIconSvg} />, address: '0x0000000000000000000000000000000000000000' },
    { value: 'USDT', icon: <Icon component={UsdtIconSvg} />, address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
    { value: 'DAI', icon: <Icon component={DAIIconSvg} />, address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
    { value: 'USDC', icon: <Icon component={UsdcIconSvg} />, address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
    {
      value: 'stETH',
      icon: <Image style={{ width: 22, height: 'auto' }} src={stETH} preview={false} />,
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    },
  ],
  tokens: [
    {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
      decimals: 18,
    },
    {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
      decimals: 6,
    },
    {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
      decimals: 6,
    },
    {
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // stETH
      decimals: 18,
    },
  ],
  tokenCurrentAccountPriceInit: [
    { token: '0x6b175474e89094c44da98b954eedeac495271d0f', balance: '0', type: 'DAI' },
    { token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', balance: '0', type: 'USDC' },
    { token: '0xdac17f958d2ee523a2206206994597c13d831ec7', balance: '0', type: 'USDT' },
    { token: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', balance: '0', type: 'stETH' },
    { token: '0x0000000000000000000000000000000000000000', balance: '0', type: 'ETH' },
  ],
}

/** dev local 配置 ETH */
export const localData: DataTypes = {
  options: [{ value: 'MATIC', icon: <Icon component={EthIconSvg} />, address: '0x0000000000000000000000000000000000000000' }],
  tokenConstant: [{ token: '0x0000000000000000000000000000000000000000', constantAbi: '' }],
  ...ETHINIT,
}

/** dev polygon 配置 swap ETH */
export const polygonTestData: DataTypes = {
  options: [
    { value: 'MATIC', icon: <Icon component={EthIconSvg} />, address: '0x0000000000000000000000000000000000000000' },
    { value: 'DAI', icon: <Icon component={DAIIconSvg} />, address: '0xF14f9596430931E177469715c591513308244e8F' },
    { value: 'USDT', icon: <Icon component={UsdtIconSvg} />, address: '0xA45742B870F3602177275Bdf713bD0287741Fe0b' },
    {
      value: 'GMD',
      icon: <Image style={{ width: 22, height: 'auto' }} src={gmd} preview={false} />,
      address: '0x1d4F8BB45895FEFbC1371EfD09cF059475FEAe9D',
    },
  ],
  tokenConstant: [
    { token: '0x0000000000000000000000000000000000000000', constantAbi: '' },
    { token: '0xA45742B870F3602177275Bdf713bD0287741Fe0b', constantAbi: Tether },
    { token: '0xF14f9596430931E177469715c591513308244e8F', constantAbi: Dai },
    { token: '0x1d4F8BB45895FEFbC1371EfD09cF059475FEAe9D', constantAbi: GMDToken },
  ],
  ...ETHINIT,
}

/** uat local 配置 swap BNB */
export const uatLocalTestData: DataTypes = {
  options: [
    { value: 'BNB', icon: <Icon component={BNBIconSvg} />, address: '0x0000000000000000000000000000000000000000' },
    { value: 'DAI', icon: <Icon component={DAIIconSvg} />, address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3' },
    { value: 'USDT', icon: <Icon component={UsdtIconSvg} />, address: '0x55d398326f99059fF775485246999027B3197955' },
    {
      value: 'GMD',
      icon: <Image style={{ width: 22, height: 'auto' }} src={gmd} preview={false} />,
      address: '0xB62E10B2d0671948e963D970D0911616F31e59cb',
    },
  ],
  tokenConstant: [
    { token: '0x0000000000000000000000000000000000000000', constantAbi: '' },
    { token: '0x55d398326f99059fF775485246999027B3197955', constantAbi: Tether },
    { token: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', constantAbi: Dai },
    { token: '0xB62E10B2d0671948e963D970D0911616F31e59cb', constantAbi: GMDToken },
  ],
  ...BNBINIT,
}

/** bscTestData */
export const bscTestData: DataTypes = {
  options: [
    { value: 'BNB', icon: <Icon component={BNBIconSvg} />, address: '0x0000000000000000000000000000000000000000' },
    { value: 'USDT', icon: <Icon component={UsdtIconSvg} />, address: '0xA11c8D9DC9b66E209Ef60F0C8D969D3CD988782c' },
    {
      value: 'GMD',
      icon: <Image style={{ width: 22, height: 'auto' }} src={gmd} preview={false} />,
      address: '0xbFD0e78Fd702c6c0794301E8844204DDE86B8c06',
    },
  ],
  tokenConstant: [
    { token: '0x0000000000000000000000000000000000000000', constantAbi: '' },
    { token: '0xA11c8D9DC9b66E209Ef60F0C8D969D3CD988782c', constantAbi: Tether },
    { token: '0xbFD0e78Fd702c6c0794301E8844204DDE86B8c06', constantAbi: GMDToken },
  ],
  ...BNBINIT,
}

/** prd 配置 swap BNB */
export const bscData: DataTypes = {
  options: [
    // { value: 'USDT', icon: <Icon component={UsdtIconSvg} />, address: '0x55d398326f99059ff775485246999027b3197955' },
    // { value: 'USDC', icon: <Icon component={UsdcIconSvg} />, address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' },
    // { value: 'DAI', icon: <Icon component={DAIIconSvg} />, address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3' },
    {
      value: 'GMD',
      icon: <Image style={{ width: 22, height: 'auto' }} src={gmd} preview={false} />,
      address: '0x53d851131f9a82b97af8a32d70c57B5C24c429cE',
      decimals: 18,
    },
  ],
  tokenConstant: [
    // { token: '0x55d398326f99059ff775485246999027b3197955', constantAbi: Tether },
    // { token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', constantAbi: USDC },
    // { token: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', constantAbi: Dai },
    { token: '0x53d851131f9a82b97af8a32d70c57B5C24c429cE', constantAbi: GMDToken },
  ],
  ...BNBINIT,
}

export const ZORE = '0x0000000000000000000000000000000000000000'
