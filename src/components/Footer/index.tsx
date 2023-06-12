import { Col, Row, Image, Collapse, message } from 'antd'
import Icon, { PlusOutlined } from '@ant-design/icons'
import { FooterList, MenuListInit } from '@/common'
import { Adapth5 } from '@/utils'
import { useTranslation } from 'react-i18next'
import { FooterWrapper, FooterLeftList, LeftListTitle, MenuTitle, CollapseH5A } from './styled'
import { IconSvg1, IconSvg2, IconSvg3, IconSvg4, IconSvg6, ArrowSvg } from './icon'
import SwitchLanguage from '@/components/SwitchLanguage'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import LOGO from '@/assets/logo-footer.svg'
import { localeList } from '@/utils/i18n'
import { useLocation } from 'react-router-dom'

const IconSvg: {
  lable: any
  value: string
}[] = [
  { lable: IconSvg6, value: '' },
  { lable: IconSvg4, value: '' },
  { lable: IconSvg3, value: 'https://t.me/GridMindDAOChannel' },
  { lable: IconSvg2, value: '' },
  { lable: IconSvg1, value: 'https://twitter.com/gridmind_dao' },
]

const { Panel } = Collapse

const FooterPage = () => {
  const handleHomeTips = async () => {
    try {
      message.info({
        content: t('home.tipss'),
        className: 'message-global',
      })
    } catch (error) {}
  }

  let location = useLocation()
  const { i18n, t } = useTranslation()
  const { windowSize } = useWindowSizeHooks()

  return (
    <FooterWrapper>
      <Row>
        {windowSize.innerWidth >= Adapth5 && (
          <Col span={24} xl={{ span: 10 }} className="lists">
            {FooterList.map((f, i) => (
              <FooterLeftList key={i}>
                <LeftListTitle>{t(f.name)}</LeftListTitle>
                {f.childer.map((c, is) => (
                  <a href={i18n.language === 'zh-TW' ? (c.zh_url ? c.zh_url : c.url) : c.url} key={is} rel="noopener noreferrer">
                    {t(c.name)}
                  </a>
                ))}
              </FooterLeftList>
            ))}
          </Col>
        )}

        <Col span={0} xl={{ span: 14 }}>
          <Row className="footer-right">
            <Col span={24} className="footer-right-icon">
              {IconSvg.filter((i, key) => key !== IconSvg.length - 1).map((i, key) => (
                <a
                  href={i.value === '' ? 'javascript:;' : i.value}
                  rel="noopener noreferrer"
                  target={i.value !== '' ? '_blank' : '_self'}
                  key={key}
                  onClick={() => {
                    if (i.value === '') handleHomeTips()
                  }}
                >
                  <Icon component={i.lable} />
                </a>
              ))}
              {IconSvg.filter((i, key) => key === IconSvg.length - 1).map((i, key) => (
                <a
                  href={i.value === '' ? 'javascript:;' : i.value}
                  rel="noopener noreferrer"
                  target={i.value !== '' ? '_blank' : '_self'}
                  key={key}
                  onClick={() => {
                    if (i.value === '') handleHomeTips()
                  }}
                >
                  <span className="footer-language">
                    <Icon component={i.lable} />
                    <div className="footer-switch">
                      {' '}
                      <SwitchLanguage />
                    </div>
                  </span>
                </a>
              ))}
            </Col>
          </Row>
        </Col>
        {windowSize.innerWidth >= Adapth5 && (
          <Col span={24} xl={{ span: 0 }} style={{ marginTop: '1.25rem' }}>
            <Row className="footer-right footer-right-xl">
              <Col span={12}>
                <SwitchLanguage />
              </Col>
              <Col span={12} className="footer-right-icon">
                {IconSvg.map((i, key) => (
                  <a
                    href={i.value === '' ? 'javascript:;' : i.value}
                    rel="noopener noreferrer"
                    target={i.value !== '' ? '_blank' : '_self'}
                    key={key}
                    onClick={() => {
                      if (i.value === '') handleHomeTips()
                    }}
                  >
                    <Icon component={i.lable} />
                  </a>
                ))}
              </Col>
            </Row>
          </Col>
        )}

        {/* h5 */}
        {windowSize.innerWidth < Adapth5 && (
          <>
            <Col span={24}>
              <Row className="footer-menu">
                <Col span={12} className="footer-menu-info">
                  <Image src={LOGO} preview={false} height="2rem" width="auto" />
                  <Icon component={ArrowSvg} className="arrow-info" />
                  <MenuTitle>
                    {MenuListInit.filter((it) => it.url === location.pathname).map(
                      (item: any) => item[localeList.find((c) => c.locale === i18n.language)?.value || 'enUs'],
                    )}
                  </MenuTitle>
                </Col>
                <Col span={12} className="footer-menu-language">
                  <SwitchLanguage />
                </Col>
              </Row>
            </Col>
            <Col span={24} className="footer-collapse">
              <Collapse expandIconPosition="right" ghost expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 45 : 0} />}>
                {FooterList.map((f, key) => (
                  <Panel key={key} header={t(f.name)}>
                    <CollapseH5A>
                      {f.childer.map((c, i) => (
                        <a href={i18n.language === 'zh-TW' ? (c.zh_url ? c.zh_url : c.url) : c.url} key={i} rel="noopener noreferrer">
                          {t(c.name)}
                        </a>
                      ))}
                    </CollapseH5A>
                  </Panel>
                ))}
              </Collapse>
            </Col>
            <Col span={24} className="footer-icons">
              {IconSvg.map((i, key) => (
                <a
                  href={i.value === '' ? 'javascript:;' : i.value}
                  rel="noopener noreferrer"
                  target={i.value !== '' ? '_blank' : '_self'}
                  key={key}
                  onClick={() => {
                    if (i.value === '') handleHomeTips()
                  }}
                >
                  <Icon component={i.lable} />
                </a>
              ))}
            </Col>
          </>
        )}
      </Row>
    </FooterWrapper>
  )
}

export default FooterPage
