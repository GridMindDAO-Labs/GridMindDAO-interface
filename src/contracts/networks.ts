import { REACT_APP_ENV } from '@/contracts/chains'
import ETH_ICON from '@/assets/token/ETH.svg'
import ETH_MIN from '@/assets/token/Ethereum-min.svg'
import POLYGON_MIN from '@/assets/token/polygon-min.svg'
import POLYGON_ICON from '@/assets/token/polygon.svg'
import BNB_ICON from '@/assets/token/BNB.svg'
import BNB_MIN from '@/assets/token/Binance-min.svg'

interface listTypes {
  name: string
  icon: string
  chainId: any
  image: string
  fullName: string
  backgroundImage: string
}

export const NTTWORK_ENV: { [env: string]: listTypes[] } = {
  dev: [
    {
      name: 'Polygon',
      fullName: 'Polygon Testnet',
      icon: POLYGON_ICON,
      image: POLYGON_MIN,
      chainId: 1337,
      backgroundImage: 'linear-gradient(73.28deg, #8247E5 6.51%, #6027C0 88.45%)',
    },
    {
      name: 'Polygon',
      fullName: 'Polygon Testnet',
      icon: POLYGON_ICON,
      image: POLYGON_MIN,
      chainId: 80001,
      backgroundImage: 'linear-gradient(73.28deg, #8247E5 6.51%, #6027C0 88.45%)',
    },
  ],
  uat: [
    {
      name: 'Binance',
      fullName: 'BNB Smart Chain Testnet',
      icon: BNB_ICON,
      image: BNB_MIN,
      chainId: 97,
      backgroundImage: 'linear-gradient(to right,#3E3F47,#525961)',
    },
    {
      name: 'Polygon',
      fullName: 'Polygon Testnet',
      icon: POLYGON_ICON,
      image: POLYGON_MIN,
      chainId: 1337,
      backgroundImage: 'linear-gradient(73.28deg, #8247E5 6.51%, #6027C0 88.45%)',
    },
  ],
  prd: [
    {
      name: 'BNB Chain',
      fullName: 'Binance Smart Chain',
      icon: BNB_ICON,
      image: BNB_MIN,
      chainId: 56,
      backgroundImage: 'linear-gradient(to right,#3E3F47,#525961)',
    },
  ],
}

export const NTTWORKS: listTypes[] = NTTWORK_ENV[REACT_APP_ENV]
