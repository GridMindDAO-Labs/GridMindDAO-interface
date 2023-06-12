import { useEffect, useState } from 'react'
import { DaoWrapper, DaoTarBarBtn, DaoTarBarBtnH5 } from './styled'
import { Col, Row } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useBoolean } from 'ahooks'
import { useWeb3React } from '@web3-react/core'
import { useDAOHooks } from '@/hooks/useDAOHooks'
import { useAccountDetails } from '@/hooks/useAccountDetails'
import ProfileMouldModules from './components/ProfileMouldModules'
import DelegatesModules from './components/DelegatesModules'
import ProposalsModules from './components/ProposalsModules'
import Footer from '@/components/Footer'
import { useTranslation } from 'react-i18next'

const DaoPage = () => {
  const { t } = useTranslation()
  const { isActive, account } = useWeb3React()
  const params: any = useParams()

  useEffect(() => {
    handleMountParams()
  }, [params])
  let navigate = useNavigate()

  const [isRefresh, setIsRefresh] = useBoolean(false)

  const { profileList } = useAccountDetails({ isActive, account, isRefresh })
  const { delegatesList, loading } = useDAOHooks({ isActive, account, isRefresh })
  const [tabBar, setTabBar] = useState<'Delegates' | 'Proposals'>('Delegates')

  const handleMountParams = () => {
    if (params.type) {
      if (params.type === 'delegates') {
        setTabBar('Delegates')
      }
      if (params.type === 'pelegates') {
        setTabBar('Proposals')
      }
    }
  }

  return (
    <DaoWrapper>
      <Row>
        <Col span={0} xl={{ span: 6 }} md={{ span: 8 }}>
          <ProfileMouldModules returns={() => setIsRefresh.toggle()} profileList={profileList} />
        </Col>
        <Col span={24} xl={{ span: 18 }} md={{ span: 16 }}>
          <Row className="dao-content">
            <Col span={0} md={{ span: 24 }} className="tabbar-s">
              <DaoTarBarBtn
                className={tabBar === 'Delegates' ? 'btn-one btn-actives' : 'btn-one'}
                onClick={() => navigate('/dao/delegates', { replace: true })}
              >
                {t('dao.tabbar.title1')}
              </DaoTarBarBtn>
              <DaoTarBarBtn
                className={tabBar === 'Proposals' ? 'btn-actives' : ''}
                onClick={() => navigate('/dao/pelegates', { replace: true })}
              >
                {t('dao.tabbar.title2')}
              </DaoTarBarBtn>
            </Col>
            <Col span={24} md={{ span: 0 }}>
              <DaoTarBarBtnH5
                type={tabBar !== 'Delegates' ? 'text' : 'default'}
                className={tabBar === 'Delegates' ? 'btn-actives-h5' : ''}
                onClick={() => navigate('/dao/delegates', { replace: true })}
              >
                {t('dao.delegates.title')}
              </DaoTarBarBtnH5>
              <DaoTarBarBtnH5
                type={tabBar !== 'Proposals' ? 'text' : 'default'}
                className={tabBar === 'Proposals' ? 'btn-actives-h5' : ''}
                onClick={() => navigate('/dao/pelegates', { replace: true })}
              >
                {t('dao.proposals.title')}
              </DaoTarBarBtnH5>
            </Col>
            <Col span={24}>
              {tabBar === 'Delegates' && (
                <DelegatesModules returns={() => setIsRefresh.toggle()} delegatesList={delegatesList} loading={loading} />
              )}
              {tabBar === 'Proposals' && <ProposalsModules />}
            </Col>
            <Col span={24}>
              <Footer />
            </Col>
          </Row>
        </Col>
      </Row>
    </DaoWrapper>
  )
}

export default DaoPage
