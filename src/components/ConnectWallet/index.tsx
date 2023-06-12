import { useRef, useEffect, useState } from 'react'
import { ConnectWalletWrapper, AddressTitle, Leran, LeranLink, AddressBtn, AddressBtnH5, AddressBtnWeb } from './styled'
import { Button, Modal, Col, Spin, message } from 'antd'
import { useBoolean } from 'ahooks'
import { ModalContentRow } from '@/common/styled'
import { modalLayout } from '@/common/antd.cus'
import { WALLETS } from '@/contracts/wallets'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import { useSelector, useDispatch } from 'react-redux'
import { SaveIsLogin, SaveWallet } from '@/store/wallet'
import { SaveAddress, selectAddress } from '@/store/user'
import { useWeb3React } from '@web3-react/core'
import { DownArrowSvg, HeadPortraitSvg, DownArrowSvgWhite } from '@/common/icon'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons'
import { formatStrAddress, Adapth5 } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import MetaMaskPage from '@/components/ConnectWallet/metaMask'
import WalletConnectPage from '@/components/ConnectWallet/walletConnect'
import { getErrorMessage } from '@/hooks/useErrorHooks'
import { hooks as hooksMetamask, metaMask } from '@/connectors/metaMask'
import { hooks as hooksWalletConnect, walletConnect } from '@/connectors/walletConnect'
import { ChainIdNotAllowedError } from '@web3-react/store'
import { useCountDown, useInterval, useMount } from 'ahooks'
import { UseWatchWalletConnectConnect, UseWatchInjectedConnect } from '@/hooks/useWeb3ProviderHooks'
import { UserSvg, LogoutSvg } from '@/components/ConnectWallet/icon'
import { useLocation } from 'react-router-dom'
import { useAccountDetails } from '@/hooks/useAccountDetails'

import ProfileMouldWallet from './ProfileMouldWallet'
import { useTranslation } from 'react-i18next'
import { useScrollTransparent } from '@/hooks/useScrollTransparent'

interface OnConnectType {
  connector: MetaMask | WalletConnect
  status: 'Injected' | 'WalletConnect' | string
}

const initInterval = 1200

const DownArrowIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={DownArrowSvg} {...props} />
const DownArrowIconWhite = (props: Partial<CustomIconComponentProps>) => <Icon component={DownArrowSvgWhite} {...props} />

const HeadPortraitIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={HeadPortraitSvg} {...props} />

const UsreIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={UserSvg} {...props} />

interface Types {
  isPosition?: string
  isMinWidth?: string
}

const ConnectWalletPages = ({ isPosition, isMinWidth }: Types) => {
  const { t } = useTranslation()
  const { isActive, connector, account } = useWeb3React()
  const { windowSize } = useWindowSizeHooks()
  // @ts-ignore
  const { ethereum } = window
  const dispatch = useDispatch()
  const myAddress = useSelector(selectAddress)

  const [onShow, setOnShow] = useBoolean(false)
  const [loading, setLoading] = useBoolean(false)
  const modalRef = useRef<any>(null)

  const daoData = useAccountDetails({ isActive, account, isRefresh: false })
  const [onShowDetails, setonShowDetails] = useBoolean(false)

  let location = useLocation()

  const transparent = useScrollTransparent()

  const [loyoutMouseShow, setLoyoutMouseShow] = useBoolean(false)

  const errorWallet = hooksWalletConnect.useError()
  const isActiveWallet = hooksWalletConnect.useIsActive()

  const errorMetamask = hooksMetamask.useError()

  const [interval, setInterval] = useState<number | undefined>(undefined)

  const walletConnectClose = () => {
    void walletConnect.deactivate()
    void setLoading.setFalse()
    void setOnShow.setFalse()
    setInterval(undefined)
  }

  const [isWalletDome, setIsWalletDome] = useState<boolean>(false)
  const clearInterval = useInterval(() => {
    const walletconnectDom = document.getElementById('walletconnect-wrapper')
    if (walletconnectDom && !isWalletDome) setIsWalletDome(true)
    if (walletconnectDom === null && isWalletDome) {
      if (isActive) {
        void clearInterval
        setInterval(undefined)
        return false
      }
      void walletConnectClose()
      message.error({
        content: t('wallet.tips.error1'),
        className: 'message-global',
      })
      void clearInterval
    }
  }, interval)

  const [targetDate, setTargetDate] = useState<number>()
  // eslint-disable-next-line
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      void walletConnectClose()
      void clearInterval
    },
  })

  useMount(() => {
    const walletconnectDom = document.getElementById('walletconnect-wrapper')
    if (walletconnectDom !== null) setInterval(initInterval)
    else {
      void clearInterval
      setInterval(undefined)
    }
  })

  useEffect(() => {
    if (isActive) {
      connector instanceof MetaMask && onConnectSuccess({ connector, status: 'Injected' })
      connector instanceof MetaMask && UseWatchInjectedConnect({ dispatch })
      connector instanceof WalletConnect && onConnectSuccess({ connector, status: 'WalletConnect' })
      connector instanceof WalletConnect && UseWatchWalletConnectConnect({ provider: connector.provider, dispatch })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  useEffect(() => {
    isActiveWallet && setTargetDate(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveWallet])

  useEffect(() => {
    errorMetamask && loginErrorMetamask()
    errorWallet && loginErrorWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMetamask, errorWallet])

  const loginErrorWallet = async () => {
    console.log('errorWallet', errorWallet)
    void clearInterval
    setInterval(undefined)
    let msg = await getErrorMessage(errorWallet)
    if (errorWallet instanceof ChainIdNotAllowedError) {
      message.warning({
        content: t('wallet.tips.error2', { msg }),
        className: 'message-global',
      })
      setTargetDate(Date.now() + 10000)
    } else {
      message.warning({
        content: msg,
        className: 'message-global',
      })
      void walletConnectClose()
    }
  }

  const loginErrorMetamask = async () => {
    console.log('errorMetamask', errorMetamask)
    let msg = await getErrorMessage(errorMetamask)
    if (msg === 'MetaMask: Disconnected from chain. Attempting to connect.') {
      void metaMask.connectEagerly()
      return false
    }
    void metaMask.deactivate()
    message.error({
      content: msg,
      className: 'message-global',
    })
    void setLoading.setFalse()
  }

  const loginOut = async () => {
    void connector.deactivate()
    dispatch(SaveIsLogin(false))
    dispatch(SaveAddress(''))
    dispatch(SaveWallet('NetWork'))
    localStorage.removeItem('isLogin')
    localStorage.removeItem('wallet')
    message.info({
      content: t('wallet.logout.title'),
      className: 'message-global',
    })
    void setLoyoutMouseShow.setFalse()
  }

  const onConnectSuccess = async ({ status }: OnConnectType) => {
    void setLoading.setFalse()
    dispatch(SaveIsLogin(true))
    dispatch(SaveWallet(status))
    localStorage.setItem('wallet', status)
    localStorage.setItem('isLogin', 'true')
    if (!onShow) return
    message.success({
      content: t('wallet.login.title'),
      className: 'message-global',
    })
    void setOnShow.setFalse()
    void setLoyoutMouseShow.setFalse()
  }

  const ConnectWalletListPages = () => (
    <ModalContentRow isTrue={true}>
      <Col span={24}>
        <ModalContentRow
          className="wallet-list"
          isTrue={
            WALLETS.filter((item) => {
              if (!ethereum) return item.name !== 'Metamask'
              return true
            }).length === 2
          }
        >
          {WALLETS.filter((item) => {
            if (!ethereum) return item.name !== 'Metamask'
            return true
          }).map((item, index) => (
            <div key={index}>
              {item.link === 'Injected' && (
                <MetaMaskPage item={item} setLoading={(s) => (!s ? void setLoading.setFalse() : void setLoading.setTrue())} />
              )}
              {item.link === 'WalletConnect' && (
                <WalletConnectPage
                  item={item}
                  setLoading={(s) => {
                    if (!s) {
                      void setLoading.setFalse()
                      void clearInterval
                      setInterval(undefined)
                    } else {
                      void setLoading.setTrue()
                      setInterval(initInterval)
                    }
                  }}
                />
              )}
            </div>
          ))}
        </ModalContentRow>
      </Col>
      <Col span={24} className="chose-link">
        <Leran>{t('wallet.login.modal.tips')}</Leran>
        <LeranLink href="https://ethereum.org/en/wallets/" target="_blank" rel="noopener noreferrer">
          {t('wallet.login.modal.learn')}
        </LeranLink>
      </Col>
    </ModalContentRow>
  )

  return (
    <>
      {isActive && windowSize.innerWidth >= Adapth5 && isPosition === 'ProfileMouldWeb' && (
        <AddressBtnWeb>
          <Col span={18} className="address-btn-web-left">
            <UsreIcon />
            <span className="text">{formatStrAddress(6, 4, myAddress)}</span>
          </Col>
          <Col span={6} className="address-btn-web-right">
            <Icon component={LogoutSvg} onClick={loginOut} />
          </Col>
        </AddressBtnWeb>
      )}

      <ConnectWalletWrapper>
        {!isActive && (
          <>
            {windowSize.innerWidth >= Adapth5 ? (
              <>
                {isPosition === 'ProfileMouldWeb' ? (
                  <Button className="wallet-connect-btn-web-profile" style={{ minWidth: isMinWidth }} onClick={setOnShow.toggle}>
                    {t('wallet.login.btns')}
                  </Button>
                ) : (
                  <Button
                    className={location.pathname === '/home' && transparent < 1 ? 'wallet-connect-btn-home-web' : 'wallet-connect-btn'}
                    onClick={setOnShow.toggle}
                  >
                    {t('wallet.login.btns')}
                  </Button>
                )}
              </>
            ) : (
              <div className="wallet-connect-h5-div">
                <Button type="primary" style={{ minWidth: isMinWidth }} className="wallet-connect-btn-h5" onClick={setOnShow.toggle}>
                  {t('wallet.login.btns')}
                </Button>
              </div>
            )}
          </>
        )}
        {isActive && windowSize.innerWidth >= Adapth5 && isPosition !== 'ProfileMouldWeb' && (
          <AddressBtn onMouseEnter={() => void setLoyoutMouseShow.setTrue()} onMouseLeave={() => void setLoyoutMouseShow.setFalse()}>
            <AddressTitle type="text" icon={<HeadPortraitIcon />} isHomeTran={location.pathname === '/home' && transparent < 1}>
              <span>{formatStrAddress(6, 4, myAddress)}</span>
              {location.pathname === '/home' && transparent < 1 ? <DownArrowIconWhite /> : <DownArrowIcon />}
              {loyoutMouseShow && (
                <div className="address-logout" onClick={loginOut}>
                  {t('wallet.login.logout.tips')}
                </div>
              )}
            </AddressTitle>
          </AddressBtn>
        )}
        <Modal {...modalLayout} visible={onShow} getContainer={modalRef.current} onCancel={setOnShow.setFalse}>
          <Spin tip={t('app.loading')} spinning={loading}>
            <h3>{t('wallet.login.modal.title')}</h3>
            <ConnectWalletListPages />
          </Spin>
        </Modal>
      </ConnectWalletWrapper>
      {isActive && windowSize.innerWidth < Adapth5 && (
        <div style={{ width: '100%' }}>
          <AddressBtnH5>
            <Col span={12} className="address-btn-h5-left">
              <UsreIcon />
              <span className="text">{formatStrAddress(6, 4, myAddress)}</span>
            </Col>
            <Col span={12} className="address-btn-h5-right">
              {location.pathname === '/dao' || location.pathname.substring(0, 5) === '/dao/' ? (
                <Button className="right-details" onClick={() => void setonShowDetails.setTrue()}>
                  {t('wallet.login.details')}
                </Button>
              ) : (
                <Button className="right-logout" onClick={loginOut}>
                  {t('wallet.login.logout.tips')}
                </Button>
              )}
            </Col>
          </AddressBtnH5>
        </div>
      )}
      <Modal
        {...modalLayout}
        wrapClassName=" wallet-profile-modal common-modal"
        visible={onShowDetails}
        onCancel={setonShowDetails.setFalse}
      >
        <Spin tip={t('app.loading')} spinning={daoData.loading}>
          <ProfileMouldWallet profileList={daoData.profileList} returns={() => void setonShowDetails.setFalse()} />
        </Spin>
      </Modal>
    </>
  )
}

export default ConnectWalletPages
