import { Radio, Row, Col, Skeleton } from 'antd'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { FinanceWrapper, FinanceTobbar } from './styled'

import Footer from '@/components/Footer'
import FinanceInfos from './components/FinanceInfo'
import EarningsInfos from './components/EarningsInfo'
import { useTranslation } from 'react-i18next'

const FinancePage = () => {
  const { isActive } = useWeb3React()
  const { t } = useTranslation()
  const [type, setType] = useState<'Finance' | 'Earnings'>('Finance')

  const handleRadioChange = (values: any) => {
    setType(values)
  }

  return (
    <FinanceWrapper>
      <FinanceTobbar>
        <Radio.Group defaultValue={type} value={type} buttonStyle="solid" onChange={(e) => handleRadioChange(e.target.value)}>
          <Radio.Button value="Finance">{t('finance.tabber.title1')}</Radio.Button>
          <Radio.Button value="Earnings">{t('finance.tabber.title2')}</Radio.Button>
        </Radio.Group>
      </FinanceTobbar>
      {type === 'Finance' ? (
        <FinanceInfos />
      ) : (
        <>
          {isActive ? (
            <EarningsInfos />
          ) : (
            <>
              <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
              <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
            </>
          )}
        </>
      )}
      <Row>
        <Col span={24} className="finance-footer">
          <Footer />
        </Col>
      </Row>
    </FinanceWrapper>
  )
}

export default FinancePage
