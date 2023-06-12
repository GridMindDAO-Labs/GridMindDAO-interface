import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import type { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { useEffect } from 'react'
import { metaMask } from '@/connectors/metaMask'
import { walletConnect } from '@/connectors/walletConnect'
import { URLS } from '@/contracts/chains'
import { getActiveChainId } from '@/contracts/constant'
import type WalletConnectProvider from '@walletconnect/ethereum-provider'
// import { network } from '@/connectors/network' void network.activate()
import { SaveIsLogin, SaveWallet, SaveNetwork } from '@/store/wallet'
import { SaveAddress } from '@/store/user'

export const getName = (connector: Connector) => {
  if (connector instanceof MetaMask) return 'Injected'
  if (connector instanceof WalletConnect) return 'WalletConnect'
  if (connector instanceof Network) return 'Network'
  return 'Unknown'
}

interface InfoType {
  network: number
  islogin: boolean
  wallet: string
}

export const useEagerConnect = (status: string, walletInfo: InfoType) => {
  const chainIds = Object.keys(URLS)

  useEffect(() => {
    status === 'WalletConnect' && void walletConnect.connectEagerly()
    status === 'Injected' && void getInjectedEagerly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInjectedEagerly = async () => {
    let isTrue = getActiveChainId(chainIds, walletInfo.network)
    isTrue && void metaMask.connectEagerly()
  }
}

export const UseWatchWalletConnectConnect = ({ provider, dispatch }: { provider: WalletConnectProvider | any; dispatch: any }) => {
  const chainIds = Object.keys(URLS)
  provider?.on('chainChanged', (chainId: any) => {
    let isTrue = getActiveChainId(chainIds, chainId)
    !isTrue && setTimeout(() => void walletConnect.deactivate(), 5000)
    // console.log('chainId', chainId)
  })
  provider?.on('accountsChanged', (accounts: string[]) => {
    // console.log('accounts', accounts)
  })
  provider?.on('disconnect', () => {
    dispatch(SaveIsLogin(false))
    dispatch(SaveAddress(''))
    dispatch(SaveWallet('NetWork'))
    localStorage.removeItem('isLogin')
    localStorage.removeItem('wallet')
  })
}

export const UseWatchInjectedConnect = ({ dispatch }: { dispatch: any }) => {
  // @ts-ignore
  const { ethereum } = window as any

  const setActivateChange = (networkId: any) => {
    const chainIds = Object.keys(URLS)
    let isTrue = getActiveChainId(chainIds, Number(networkId))
    if (!isTrue) {
      void metaMask.deactivate()
      dispatch(SaveIsLogin(false))
      dispatch(SaveAddress(''))
      dispatch(SaveWallet('NetWork'))
      localStorage.removeItem('isLogin')
      localStorage.removeItem('wallet')
    } else metaMask.connectEagerly()
  }

  if (ethereum && ethereum.on) {
    const handleNetworkChanged = (networkId: string | number) => {
      // console.log("Handling 'networkChanged' event with payload", networkId)
      setActivateChange(networkId)
      dispatch(SaveNetwork(Number(networkId)))
      localStorage.setItem('chainId', networkId.toString())
    }

    ethereum.on('connect', () => {
      /** console.log("Handling 'connect' event") */
    })
    ethereum.on('chainChanged', (chainId: string | number) => {
      /** console.log("Handling 'chainChanged' event with payload", chainId) */
    })
    ethereum.on('accountsChanged', (accounts: string[]) => {
      /** console.log("Handling 'accountsChanged' event with payload", accounts) */
    })
    ethereum.on('networkChanged', handleNetworkChanged)
  }
}
