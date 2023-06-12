import METAMASK_ICON from '@/assets/svg/metamask.svg'
import WALLET_CONNECT_ICON from '@/assets/svg/wallet-connect.svg'

export interface Type {
  name: string
  icon: string
  link: string
}

export const WALLETS: Type[] = [
  {
    name: 'MetaMask',
    link: 'Injected',
    icon: METAMASK_ICON,
  },
  {
    name: 'WalletConnect',
    link: 'WalletConnect',
    icon: WALLET_CONNECT_ICON,
  },
]
