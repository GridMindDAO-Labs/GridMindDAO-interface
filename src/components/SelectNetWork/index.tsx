import { memo, useState, useEffect } from 'react'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import NETWORK_DEFAULT from '@/assets/svg/network_default.svg'
import { Adapth5 } from '@/utils'
import { SelectNetWorkWrapper, customStyles, MenusList, NoChainIdTips, DrawerListInfo } from './styled'
import Select, { components } from 'react-select'
import { useBoolean } from 'ahooks'
import { message, Button, Drawer, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import { NTTWORKS } from '@/contracts/networks'
import { URLS } from '@/contracts/chains'
import { useSelector, useDispatch } from 'react-redux'
import { selectWalletInfo, SaveNetwork } from '@/store/wallet'
import { CaretDownOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons'
import { DEFAULT_CHAINID, getActiveChainId } from '@/contracts/constant'
import { metaMask } from '@/connectors/metaMask'
import { getAddChainParameters } from '@/contracts/chains'
import { getErrorMessage } from '@/hooks/useErrorHooks'

interface listType {
  label: string
  value: string
  icon: string
  backgroundImage: string
  img: string
  fullName: string
}

export default memo(function SelectNetWorkPage() {
  const { t, i18n } = useTranslation()
  // @ts-ignore
  const { ethereum } = window
  const dispatch = useDispatch()

  const { windowSize } = useWindowSizeHooks()
  const [isMaskOptions, setIsMaskOptions] = useBoolean(false)
  const [optionsActive, setOptionsActive] = useState<listType[]>(() => {
    let list: listType[] = []
    NTTWORKS.forEach((item) => {
      list.push({
        value: item.chainId,
        label: item.name,
        icon: item.icon,
        backgroundImage: item.backgroundImage,
        img: item.image,
        fullName: item.fullName,
      })
    })
    return list
  })

  const walletInfo = useSelector(selectWalletInfo)
  const chainIds = Object.keys(URLS)
  const [active, setActive] = useState<boolean>(() => getActiveChainId(chainIds, walletInfo.network))
  const [moveSwitch, setMoveSwitch] = useBoolean(false)
  const [isNetWork, setIsNetWork] = useState<boolean>(() => getActiveChainId(chainIds, walletInfo.network))

  useEffect(() => {
    getOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NTTWORKS])

  useEffect(() => {
    let isTrue = getActiveChainId(chainIds, walletInfo.network)
    setActive(isTrue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletInfo.network])

  useEffect(() => {
    setIsNetWork(getActiveChainId(chainIds, walletInfo.network))
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletInfo.network])

  const getOptions = () => {
    let list: listType[] = []
    NTTWORKS.forEach((item) => {
      list.push({
        value: item.chainId,
        label: item.name,
        icon: item.icon,
        backgroundImage: item.backgroundImage,
        img: item.image,
        fullName: item.fullName,
      })
    })
    setOptionsActive(list)
  }

  const switchNetWorksChange = (objChainId: any) => {
    if (!ethereum) {
      let currentChainIds = NTTWORKS.find((item) => item.chainId === Number(objChainId))?.chainId
      dispatch(SaveNetwork(currentChainIds))
      localStorage.setItem('chainId', currentChainIds.toString())
    }
    void setIsMaskOptions.setFalse()
    void setMoveSwitch.setFalse()
    ethereum && ethereum.isMetaMask && switchNetWorksChangeInjected(objChainId)
  }

  const switchNetWorksChangeInjected = (objChainId: string | number) =>
    changeInjectedNetwork(objChainId)
      .then(async () => console.log('success'))
      .catch((error) =>
        message.error({
          content: error.message,
          className: 'message-global',
        }),
      )

  const changeInjectedNetwork = (objChainId: any) =>
    new Promise(async (resolve: any, reject) => {
      let obj = NTTWORKS.find((item) => item.chainId === Number(objChainId))
      console.log('obj', obj)
      if (ethereum && ethereum.isMetaMask && obj) {
        void metaMask
          .activate(getAddChainParameters(obj.chainId))
          .then(() => setTimeout(resolve, 500))
          .catch((error) => reject(error))
      } else {
        let currentChainIds = NTTWORKS.find((item) => item.chainId === Number(objChainId))?.chainId
        dispatch(SaveNetwork(currentChainIds))
        localStorage.setItem('chainId', currentChainIds.toString())
        void setIsMaskOptions.setFalse()
        reject()
      }
    })

  const switchNetWorkChange = () =>
    metaMask.activate(getAddChainParameters(DEFAULT_CHAINID)).catch(async (error) => {
      void metaMask.deactivate()
      let msg = await getErrorMessage(error)
      message.error({
        content: msg,
        className: 'message-global',
      })
    })

  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      {/* <CaretDownOutlined style={{ color: '#5F6469' }} /> */}
      <DownOutlined style={{ color: '#fff' }} />
    </components.DropdownIndicator>
  )

  const MenuList = (props: any) => {
    return (
      <components.MenuList {...props}>
        {optionsActive.map((item, i) => (
          <MenusList
            key={i}
            onClick={() => switchNetWorksChange(item.value)}
            className={item.value === walletInfo.network ? 'menu-active-wallet' : ''}
          >
            <img src={item.icon} alt="" />
            <div className="network-content">
              <h3>{item.label}</h3>
              <div className="span">{item.fullName}</div>
            </div>
          </MenusList>
        ))}
      </components.MenuList>
    )
  }

  const Control = ({ children, ...props }: any) => {
    return (
      <div
        style={{
          borderRadius: 4,
          backgroundImage: optionsActive.find((item) => item.value === walletInfo.network)?.backgroundImage,
        }}
        className={!active ? 'noactive' : 'noactive'}
      >
        <components.Control {...props}>
          {optionsActive.find((item) => item.value === walletInfo.network) && (
            <img src={optionsActive.find((item) => item.value === walletInfo.network)?.icon} alt="" className="bjLogo" />
          )}
          {children}
        </components.Control>
      </div>
    )
  }

  const PandaImg = (props: any) => (
    <Button
      type="primary"
      className="wallet-login"
      style={{
        borderColor: active ? 'transparent' : 'none',
        backgroundImage: optionsActive.find((item) => item.value === walletInfo.network)?.backgroundImage,
      }}
      onClick={() => setMoveSwitch.setTrue()}
      icon={
        <img {...props} alt="" src={active ? optionsActive.find((item) => item.value === walletInfo.network)?.icon : NETWORK_DEFAULT} />
      }
    >
      <CaretDownOutlined style={{ color: '#5F6469', marginLeft: '0.31rem' }} />
    </Button>
  )

  return (
    <SelectNetWorkWrapper>
      {windowSize.innerWidth >= Adapth5 && (
        <Select
          menuIsOpen={isMaskOptions}
          styles={customStyles}
          isSearchable={false}
          options={optionsActive}
          onMenuOpen={() => setIsMaskOptions.setTrue()}
          onMenuClose={() => setIsMaskOptions.setFalse()}
          placeholder={i18n.language === 'en' ? 'Change Network' : '更换网络'}
          value={active ? optionsActive.filter((item) => item.value === walletInfo.network)[0] : ''}
          components={{ DropdownIndicator, MenuList, Control }}
        />
      )}
      {windowSize.innerWidth < Adapth5 && <PandaImg className="wallet-btn-active-img" />}
      {!isNetWork && !active && ethereum && ethereum.isMetaMask && (
        <NoChainIdTips>
          <span>{t('app.no.chainid.tips')}</span>
          <Button className="no-network-btns" onClick={switchNetWorkChange}>
            {t('app.no.chainid.btn')}
          </Button>
        </NoChainIdTips>
      )}
      <Drawer
        key="h5"
        placement="bottom"
        title={t('app.chainid.drawer.title')}
        onClose={() => setMoveSwitch.setFalse()}
        visible={moveSwitch}
        className="drawer-mask"
        height="60%"
        closeIcon={<CloseOutlined style={{ color: 'black' }} />}
      >
        {optionsActive.map((item, index) => (
          <DrawerListInfo
            onClick={() => switchNetWorksChange(item.value)}
            key={index}
            className={item.value === walletInfo.network ? 'active-info' : ''}
          >
            <Image src={item.icon} preview={false} />
            <div className="network-content">
              <h3>{item.label}</h3>
              <span>{item.fullName}</span>
            </div>
          </DrawerListInfo>
        ))}
      </Drawer>
    </SelectNetWorkWrapper>
  )
})
