import { TopBarWrapper } from './styled'
import { Image, Row, Col } from 'antd'
import { fallbackImage } from '@/common'
import { Link, useLocation } from 'react-router-dom'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import SideMenuH5 from '@/components/SideMenuH5'
import SideMenu from '@/components/SideMenu'
import ConnectWallet from '@/components/ConnectWallet'
import LOGO from '@/assets/logo.svg'
import LOGO_BLACK from '@/assets/logo-brack.svg'
import { useScrollTransparent } from '@/hooks/useScrollTransparent'
import { useCallback } from 'react'

const TopBar = () => {
  const { windowSize } = useWindowSizeHooks()
  const location = useLocation()

  const transparent = useScrollTransparent()

  const LogoImage = useCallback(
    () => (
      <Image
        height={windowSize.innerWidth >= Adapth5 ? '3.25rem' : '2.5rem'}
        width="auto"
        preview={false}
        src={location.pathname === '/home' ? (transparent === 1 ? LOGO_BLACK : LOGO) : LOGO_BLACK}
        fallback={fallbackImage}
        title="logo"
      />
    ),
    [windowSize.innerWidth, location.pathname, transparent],
  )

  return (
    <TopBarWrapper>
      <Row className="topbar-ant-row">
        <Col span={12}>
          <Link to="/home">
            {/* <TopBarTitle>GridMind</TopBarTitle> */}
            <LogoImage />
          </Link>
        </Col>
        <Col span={12} md={{ span: 0 }}>
          <SideMenuH5 />
        </Col>
        <Col span={0} md={{ span: 12 }}>
          <Row>
            <Col span={16}>
              <SideMenu />
            </Col>
            <Col span={8} className="tabbar-right">
              <ConnectWallet />
            </Col>
          </Row>
        </Col>
      </Row>
    </TopBarWrapper>
  )
}

export default TopBar
