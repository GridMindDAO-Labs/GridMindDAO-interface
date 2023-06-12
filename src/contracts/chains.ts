import type { AddEthereumChainParameter } from '@web3-react/types'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'ETH',
  symbol: 'ETH',
  decimals: 18,
}

const PolygonMATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'MATIC',
  symbol: 'MATIC',
  decimals: 18,
}

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else return chainId
}

export const REACT_APP_ENV = process.env.REACT_APP_ENV || 'uat'

export const CHAINS_ENV: any = {
  dev: {
    80001: {
      urls: ['https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78'].filter((url) => url !== undefined),
      name: 'Polygon Testnet',
      nativeCurrency: PolygonMATIC,
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    },
    1337: {
      urls: ['http://34.94.60.96:9545'].filter((url) => url !== undefined),
      name: 'local Testnet',
      nativeCurrency: ETH,
      blockExplorerUrls: [''],
    },
  },
  uat: {
    1337: {
      urls: ['http://34.94.60.96:9545'].filter((url) => url !== undefined),
      name: 'local Testnet',
      nativeCurrency: ETH,
      blockExplorerUrls: [''],
    },
    97: {
      urls: ['https://data-seed-prebsc-1-s1.binance.org:8545'].filter((url) => url !== undefined),
      name: 'BNB Smart Chain Testnet',
      nativeCurrency: BNB,
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  },
  prd: {
    56: {
      urls: ['https://bsc-dataseed1.binance.org'].filter((url) => url !== undefined),
      name: 'BNB Smart Chain Mainnet',
      nativeCurrency: BNB,
      blockExplorerUrls: ['https://bscscan.com'],
    },
  },
}

export const CHAINS: any = CHAINS_ENV[REACT_APP_ENV]

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls

  if (validURLs.length) accumulator[Number(chainId)] = validURLs

  return accumulator
}, {})
