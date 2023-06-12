import { useEffect } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { SaveNetwork } from '@/store/wallet'

export const useChainIdHooks = () => {
  const { chainId } = useWeb3React()
  const dispatch = useDispatch()

  const dataInit: DataTypes = useDataHooks()
  const { web3 } = dataInit.data

  useEffect(() => {
    if (chainId) {
      dispatch(SaveNetwork(chainId))
      localStorage.setItem('chainId', chainId.toString())
    } else noChainIdSwitch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  useEffect(() => {
    const chainIdTimer = setInterval(() => {
      // @ts-ignore
      const ethereum = window && (window.ethereum as any)
      /** When the user switches networks, the MetaMask extension will automatically refresh, allowing to turn off the default automatic refresh function for network switching. */
      if (ethereum) {
        ethereum.autoRefreshOnNetworkChange = false
        ethereum.on &&
          ethereum.on('chainChanged', function () {
            // window.location.reload()
          })
        if (chainId) clearInterval(chainIdTimer)
      } else {
        noChainIdSwitch()
        clearInterval(chainIdTimer)
      }
    }, 300)
    if (chainId) clearInterval(chainIdTimer)
    return () => clearInterval(chainIdTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  const noChainIdSwitch = () => {
    // @ts-ignore
    const { ethereum } = window as any
    if (ethereum && ethereum.isMetaMask && ethereum.chainId) {
      let currentChainId = web3.utils.hexToNumber(ethereum.chainId)
      dispatch(SaveNetwork(currentChainId))
      localStorage.setItem('chainId', currentChainId.toString())
    }
  }
}
