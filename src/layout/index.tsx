import { memo } from 'react'
import { Row, Col } from 'antd'
import { LayoutWrapper, LayoutContent, LayoutTopBar, H5Wrapper, H5Mask, Content, H5Wrappers } from './styled'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import TopBar from '@/components/TopBar'
import ConnectWallet from '@/components/ConnectWallet'
import { useScrollTransparent } from '@/hooks/useScrollTransparent'

export default memo(() => {
  let location = useLocation()

  const transparent = useScrollTransparent()

  return (
    <LayoutWrapper>
      <LayoutTopBar style={{ background: location.pathname === '/home' ? `rgba(255,255,255,${transparent})` : 'white' }}>
        <TopBar />
      </LayoutTopBar>
      <LayoutContent isHome={location.pathname === '/home'}>
        <Outlet />
        {location.pathname !== '/create' && (
          <Row style={{ position: 'relative', zIndex: 99 }}>
            <Col span={24} md={{ span: 0 }}>
              <H5Wrappers></H5Wrappers>
              <H5Wrapper>
                <H5Mask></H5Mask>
                <Content>
                  <ConnectWallet />
                </Content>
              </H5Wrapper>
            </Col>
          </Row>
        )}
      </LayoutContent>
    </LayoutWrapper>
  )
})
