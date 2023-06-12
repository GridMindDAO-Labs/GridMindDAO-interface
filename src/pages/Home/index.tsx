/* eslint-disable */
import { memo } from 'react'
import { Image, message } from 'antd'
import Icon from '@ant-design/icons'
import { HomeLogoIcon, DataIconSvg1, DataIconSvg2, DataIconSvg3 } from './icon'
import { infoIcon1, infoIcon2, infoIcon3, infoIcon4, infoIcon6 } from './icon'
import {
  HomeWrapper,
  HomeContent,
  HomeButter,
  TradeNowBtn,
  HomeDataDiv,
  HomeDataList,
  HomeTitel,
  HomeUsedDiv,
  HomeUsedList,
  HomeGovernanceDiv,
} from './styled'
import Footer from '@/components/Footer'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import HOME_USED1 from '@/assets/home-used1.png'
import HOME_USED2 from '@/assets/home-used2.png'
import HOME_USED3 from '@/assets/home-used3.png'
import HOME_USED4 from '@/assets/home-used4.png'
import { useTranslation } from 'react-i18next'

const INFOICON: {
  value: string
  label: JSX.Element
}[] = [
  { value: 'https://twitter.com/gridmind_dao', label: <Icon component={infoIcon1} /> },
  { value: '', label: <Icon component={infoIcon2} /> },
  { value: 'https://t.me/GridMindDAOChannel', label: <Icon component={infoIcon3} /> },
  { value: '', label: <Icon component={infoIcon4} /> },
  { value: '', label: <Icon component={infoIcon6} /> },
]

const HomePages = () => {
  const { t, i18n } = useTranslation()

  const { windowSize } = useWindowSizeHooks()

  const handleHomeTips = async () => {
    try {
      message.info({
        content: t('home.tipss'),
        className: 'message-global',
      })
    } catch (error) {}
  }

  return (
    <>
      <HomeButter isH5={windowSize.innerWidth < Adapth5}>
        <div className="butter-right">
          <div className="titles">{t('home.banner.title')}</div>
          <p>{t('home.banner.tips1')}</p>
        </div>
      </HomeButter>
      <HomeWrapper>
        <HomeContent>
          <HomeDataDiv className={windowSize.innerWidth < Adapth5 ? 'data-h5' : ''}>
            <Icon component={HomeLogoIcon} />
            <div className="titles">{t('home.most.title')}</div>
            <a href={window.location.origin + '/#/finance'} rel="noopener noreferrer">
              {t('home.most.link')}
            </a>
            <HomeDataList>
              <div className="info">
                <h3>{t('home.most.list1.title', { num: 426 })}</h3>
                <h4>{t('home.most.list1.subtitle')}</h4>
                <h5>{t('home.most.list1.tips')}</h5>
                <Icon component={DataIconSvg1} />
              </div>
              <div className="info">
                <h3>{t('home.most.list2.title', { num: 1213 })}</h3>
                <h4>{t('home.most.list2.subtitle')}</h4>
                <h5>{t('home.most.list2.tips')}</h5>
                <Icon component={DataIconSvg2} />
              </div>
              <div className="info">
                <h3>{t('home.most.list3.title', { num: 286698 })}</h3>
                <h4>{t('home.most.list3.subtitle')}</h4>
                <h5>{t('home.most.list3.tips')}</h5>
                <Icon component={DataIconSvg3} />
              </div>
            </HomeDataList>
          </HomeDataDiv>
          <HomeUsedDiv>
            <HomeTitel>{t('home.used.title1')}</HomeTitel>
            <HomeTitel className="used-title">{t('home.used.title2')}</HomeTitel>
            <HomeUsedList>
              <div className="info">
                <h4>{t('home.used.list1.title')}</h4>
                <span>{t('home.used.list1.tips')}</span>
                <a href="" target="_blank" rel="noopener noreferrer">
                  {t('home.used.list1.a')}
                </a>
                {windowSize.innerWidth < Adapth5 && (
                  <div className="info-h5-img">
                    <Image src={HOME_USED1} preview={false} width="4.75rem" />
                  </div>
                )}
              </div>
              <div className={windowSize.innerWidth < Adapth5 ? 'info info-other info-rights' : 'info info-other'}>
                <h4>{t('home.used.list2.title')}</h4>
                <span>{t('home.used.list2.tips')}</span>
                {windowSize.innerWidth < Adapth5 && (
                  <div className="info-h5-img">
                    <Image src={HOME_USED2} preview={false} width="6.75rem" />
                  </div>
                )}
              </div>
            </HomeUsedList>
            {windowSize.innerWidth >= Adapth5 && (
              <HomeUsedList className="used-list2">
                <div className={windowSize.innerWidth < Adapth5 ? 'info info-other info-rights' : 'info info-other'}>
                  <h4>{t('home.used.list3.title')}</h4>
                  <span>{t('home.used.list3.tips')}</span>
                  {windowSize.innerWidth < Adapth5 && (
                    <div className="info-h5-img">
                      <Image src={HOME_USED3} preview={false} width="6.75rem" />
                    </div>
                  )}
                </div>
                <div className="info">
                  <h4>{t('home.used.list4.title')}</h4>
                  <span>{t('home.used.list4.tips')}</span>
                  {windowSize.innerWidth < Adapth5 && (
                    <div className="info-h5-img">
                      <Image src={HOME_USED4} preview={false} width="6.13rem" />
                    </div>
                  )}
                </div>
              </HomeUsedList>
            )}
            {windowSize.innerWidth < Adapth5 && (
              <HomeUsedList className="used-list2">
                <div className="info">
                  <h4>{t('home.used.list4.title')}</h4>
                  <span>{t('home.used.list4.tips')}</span>
                  {windowSize.innerWidth < Adapth5 && (
                    <div className="info-h5-img">
                      <Image src={HOME_USED4} preview={false} width="6.13rem" />
                    </div>
                  )}
                </div>
                <div className={windowSize.innerWidth < Adapth5 ? 'info info-other info-rights' : 'info info-other'}>
                  <h4>{t('home.used.list3.title')}</h4>
                  <span>{t('home.used.list3.tips')}</span>
                  {windowSize.innerWidth < Adapth5 && (
                    <div className="info-h5-img">
                      <Image src={HOME_USED3} preview={false} width="6.75rem" />
                    </div>
                  )}
                </div>
              </HomeUsedList>
            )}
          </HomeUsedDiv>
          <HomeGovernanceDiv>
            <HomeTitel>{t('home.dao.title')}</HomeTitel>
            <div className="title">{t('home.dao.subtitle')}</div>
            <div className="list">
              <div className="info">
                <h3>{t('home.dao.list1.title')}</h3>
                <p>{t('home.dao.list1.tips')}</p>
                <div className="info-icon">
                  {INFOICON.map((icon, index) => (
                    <a
                      href={icon.value === '' ? 'javascript:;' : icon.value}
                      key={index}
                      target={icon.value !== '' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (icon.value === '') handleHomeTips()
                      }}
                    >
                      {icon.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="info">
                <h3>{t('home.dao.list2.title')}</h3>
                <p>{t('home.dao.list2.tips')}</p>
                <a
                  href={
                    i18n.language === 'zh-TW'
                      ? 'https://gridminddao.gitbook.io/document/yong-hu-shou-ce/dao-zhi-li'
                      : 'https://gridminddao.gitbook.io/document/v/english/user-manual/dao-governance'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('home.dao.list2.a')}
                </a>
              </div>
              <div className="info">
                <h3>{t('home.dao.list3.title')}</h3>
                <p>{t('home.dao.list3.tips')}</p>
                <a
                  href={
                    i18n.language === 'zh-TW'
                      ? 'https://gridminddao.gitbook.io/document/chang-jian-wen-ti'
                      : 'https://gridminddao.gitbook.io/document/v/english/common-problem'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('home.dao.list3.a')}
                </a>
              </div>
            </div>
          </HomeGovernanceDiv>
          <Footer />
        </HomeContent>
      </HomeWrapper>
    </>
  )
}

export default memo(HomePages)
