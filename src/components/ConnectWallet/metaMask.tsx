import { memo } from 'react'
import { Image, message } from 'antd'
import type { Type as WalletsType } from '@/contracts/wallets'
import { metaMask } from '@/connectors/metaMask'
import { getAddChainParameters } from '@/contracts/chains'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@/store/wallet'
import { DEFAULT_CHAINID, getActiveChainId } from '@/contracts/constant'
import { URLS } from '@/contracts/chains'
import { getErrorMessage } from '@/hooks/useErrorHooks'
import { Adapth5 } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'

interface Type {
  item: WalletsType
  setLoading: (s: boolean) => void
}

export default memo(function MetaMaskPage(props: Type) {
  const { item, setLoading } = props

  const chainIds = Object.keys(URLS)
  const walletInfo = useSelector(selectWalletInfo)

  const { windowSize } = useWindowSizeHooks()

  const switchWalletConnect = async () => {
    void setLoading(true)
    let isTrue = getActiveChainId(chainIds, walletInfo.network)
    try {
      void metaMask
        .activate(getAddChainParameters(!isTrue ? DEFAULT_CHAINID : walletInfo.network))
        .catch(async (error) => await onConnectError(error))
    } catch (error) {
      let msg = await getErrorMessage(error)
      message.error({
        content: msg,
        className: 'message-global',
      })
      void setLoading(false)
    }
  }

  const onConnectError = async (error: any) => {
    console.log('error', error)
    let msg = await getErrorMessage(error)
    void metaMask.deactivate()
    message.error({
      content: msg,
      className: 'message-global',
    })
    void setLoading(false)
  }

  return (
    <div className="choose-info" onClick={switchWalletConnect}>
      <Image
        height={windowSize.innerWidth >= Adapth5 ? '6rem' : '5rem'}
        width={windowSize.innerWidth >= Adapth5 ? '6rem' : '5rem'}
        src={item.icon}
        preview={false}
      />
      <span className="choose-span">{item.name}</span>
    </div>
  )
})
