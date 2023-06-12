import { useCallback, useRef, useState } from 'react'
import { FinanceTitle, FinanceSubtitle, FinanceList, FinanceTobbars, FinanceLines } from '@/pages/Finance/styled'
import { Modal, Spin, Radio } from 'antd'
import { modalLayout } from '@/common/antd.cus'

import { useBoolean } from 'ahooks'
import { useWeb3React } from '@web3-react/core'
import { useFinanceHooks } from '@/hooks/useFinanceHooks'

import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { useTranslation } from 'react-i18next'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'

import Line from './Line'
import UniversalMode from './UniversalMode'
import ReceiveMode from './ReceiveMode'
import LiquidityMode from './LiquidityMode'

const FinanceInfoPages = () => {
  const dataInit: DataTypes = useDataHooks()
  const { tokenSelectOptions } = dataInit.data

  const { t } = useTranslation()
  const { windowSize } = useWindowSizeHooks()
  const ModalClassRef: any = document.getElementsByClassName('finance-modal')
  const modalRef = useRef<any>(null)

  const { isActive, account } = useWeb3React()
  const [onShow, setOnShow] = useBoolean(false)

  const [isRefreshOut, setIsRefreshOut] = useBoolean(false)

  const [period, setPeriod] = useState<'Week' | 'Month' | 'Year'>('Week')
  const [currentClassify, setCurrentClassify] = useState<'AiToken' | 'General'>('General')
  const [currentToken, setCurrentToken] = useState<string>(tokenSelectOptions[0].address)

  const { loading, financeTimeList, currentInterestRate } = useFinanceHooks({
    onShow,
    isActive,
    account,
    period,
    currentToken,
  })

  const handleOnShowClick = ({ type, tokens }: { type: 'AiToken' | 'General'; tokens: string }) => {
    try {
      setCurrentToken(tokens)
      setCurrentClassify(type)
      setPeriod('Week')
      void setOnShow.setTrue()
    } catch (error) {}
  }

  const handleRadioPeriodChange = (values: any) => setPeriod(values)

  const LineECharts = useCallback(() => {
    let widths = ModalClassRef.length > 0 && ModalClassRef[0].offsetWidth
    return <Line data={financeTimeList} widths={widths} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.innerWidth, onShow, financeTimeList, ModalClassRef])

  return (
    <>
      <FinanceTitle>{t('finance.general.title')}</FinanceTitle>
      <FinanceSubtitle>{t('finance.general.subtitle')}</FinanceSubtitle>
      <FinanceLines />
      <FinanceList ref={modalRef} isBlack={onShow}>
        <UniversalMode
          handleIsRefreshOut={() => void setIsRefreshOut.toggle()}
          handleOnShowClick={handleOnShowClick}
          currentInterestRate={currentInterestRate}
        />
        <div className="receive-web">
          <ReceiveMode isRefreshOut={isRefreshOut} />
        </div>
        <LiquidityMode />
        <div className="receive-h5">
          <ReceiveMode isRefreshOut={isRefreshOut} />
        </div>
      </FinanceList>
      <Modal
        {...modalLayout}
        getContainer={modalRef.current}
        width="59.75rem"
        className="finance-modal"
        visible={onShow}
        wrapClassName={!onShow ? 'common-modal finance-modals' : 'common-modal'}
        onCancel={setOnShow.setFalse}
      >
        <Spin tip={t('app.loading')} spinning={loading}>
          {currentClassify === 'AiToken' ? (
            <h3>
              {t('finance.general.aitoken.title')} - {`28 ${t('finance.general.days')}`}
            </h3>
          ) : (
            <h3>
              {t('finance.title.1')} - {`28 ${t('finance.general.days')}`}
            </h3>
          )}
          <FinanceTobbars>
            <Radio.Group defaultValue={period} value={period} buttonStyle="solid" onChange={(e) => handleRadioPeriodChange(e.target.value)}>
              <Radio.Button value="Week">{t('finance.modal.type.week')}</Radio.Button>
              <Radio.Button value="Month">{t('finance.modal.type.month')}</Radio.Button>
              <Radio.Button value="Year">{t('finance.modal.type.year')}</Radio.Button>
            </Radio.Group>
          </FinanceTobbars>
          <LineECharts />
        </Spin>
      </Modal>
    </>
  )
}

export default FinanceInfoPages
