import { Modal } from 'antd'
import { modalLayout } from '@/common/antd.cus'
import { useTranslation } from 'react-i18next'
import BigNumber from 'bignumber.js'
import { Tooltip } from 'antd'
import { GMDModalTitle, ReceiveModalContent, ReceiveButtonContainer } from '@/pages/Finance/styled'

type Types = {
  type: string
  show: boolean
  setShow: (s: boolean) => void
  setIsRefresh: () => void
  balance: string
  loading: boolean
  clickBtn: () => void
}

const ModalPages = ({ show, setIsRefresh, setShow, balance, loading, clickBtn, type }: Types) => {
  const { t } = useTranslation()

  return (
    <Modal
      {...modalLayout}
      width={type === '4' ? '39.005rem' : '33.88rem'}
      visible={show}
      afterClose={() => {
        setTimeout(() => {
          setIsRefresh()
        }, 300)
      }}
      wrapClassName={!show ? 'common-modal' : 'common-modal gmdModal-show'}
      onCancel={() => setShow(false)}
    >
      <GMDModalTitle style={{ marginTop: '1.5rem' }}>{t(`finance.receive.modal.title${type}`)}</GMDModalTitle>
      {type === '4' && (
        <>
          <ReceiveModalContent>
            <Tooltip title={t('finance.receive.modal.span1')}>
              <div className="span">{t('finance.receive.modal.span1')}</div>
            </Tooltip>
            <Tooltip title={`≈ ${balance}GMD`}>
              <span>≈ {balance}GMD</span>
            </Tooltip>
            <Tooltip title={t('finance.receive.modal.span2')}>
              <div className="span">{t('finance.receive.modal.span2')}</div>
            </Tooltip>
            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.15)).toString()}GMD`}>
              <span>≈ {Number(new BigNumber(balance).times(0.15)).toString()}GMD</span>
            </Tooltip>
            <Tooltip title={t('finance.receive.modal.span3')}>
              <div className="span">{t('finance.receive.modal.span3')}</div>
            </Tooltip>
            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.2)).toString()}GMD`}>
              <span>≈ {Number(new BigNumber(balance).times(0.2)).toString()}GMD</span>
            </Tooltip>
          </ReceiveModalContent>
          <ReceiveModalContent style={{ background: 'transparent' }}>
            <Tooltip title={t('finance.receive.modal.span4')}>
              <div className="spans">{t('finance.receive.modal.span4')}</div>
            </Tooltip>
            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.65)).toString()}GMD`}>
              <h5>≈ {Number(new BigNumber(balance).times(0.65)).toString()}GMD</h5>
            </Tooltip>
          </ReceiveModalContent>
        </>
      )}
      {(type === '1' || type === '2') && (
        <>
          <ReceiveModalContent>
            <Tooltip title={t('finance.receive.modal.span1')}>
              <div className="span">{t('finance.receive.modal.span1')}</div>
            </Tooltip>
            <Tooltip title={`≈ ${Number(Number(balance).toFixed(6))}GMD`}>
              <span>≈ {Number(Number(balance).toFixed(6))}GMD</span>
            </Tooltip>

            <Tooltip title={t('finance.receive.modal.span2')}>
              <div className="span">{t('finance.receive.modal.span2')}</div>
            </Tooltip>

            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.15)).toString()}GMD`}>
              <span>≈ {Number(new BigNumber(balance).times(0.15)).toString()}GMD</span>
            </Tooltip>

            <Tooltip title={t('finance.receive.modal.span3')}>
              <div className="span">{t('finance.receive.modal.span3')}</div>
            </Tooltip>

            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.2)).toString()}GMD`}>
              <span>≈ {Number(new BigNumber(balance).times(0.2)).toString()}GMD</span>
            </Tooltip>
          </ReceiveModalContent>
          <ReceiveModalContent style={{ background: 'transparent' }}>
            <Tooltip title={t('finance.receive.modal.span4')}>
              <div className="spans">{t('finance.receive.modal.span4')}</div>
            </Tooltip>
            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.65)).toString()}GMD`}>
              <h5>≈ {Number(Number(new BigNumber(balance).times(0.65)).toFixed(6))}GMD</h5>
            </Tooltip>
          </ReceiveModalContent>
        </>
      )}
      {type === '3' && (
        <>
          <ReceiveModalContent>
            <Tooltip title={t('finance.receive.modal.span1')}>
              <div className="span">{t('finance.receive.modal.span1')}</div>
            </Tooltip>

            <Tooltip title={`≈ ${Number(Number(balance).toFixed(6))}GMD`}>
              <span>≈ {Number(Number(balance).toFixed(6))}GMD</span>
            </Tooltip>

            <Tooltip title={t('finance.receive.modal.span2')}>
              <div className="span">{t('finance.receive.modal.span2')}</div>
            </Tooltip>

            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.15)).toString()}GMD`}>
              <span>≈ {Number(new BigNumber(balance).times(0.15)).toString()}GMD</span>
            </Tooltip>
          </ReceiveModalContent>
          <ReceiveModalContent style={{ background: 'transparent' }}>
            <Tooltip title={t('finance.receive.modal.span4_1')}>
              <div className="spans">{t('finance.receive.modal.span4_1')}</div>
            </Tooltip>

            <Tooltip title={`≈ ${Number(new BigNumber(balance).times(0.85)).toString()}GMD`}>
              <h5>≈ {Number(Number(new BigNumber(balance).times(0.85)).toFixed(6))}GMD</h5>
            </Tooltip>
          </ReceiveModalContent>
        </>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ReceiveButtonContainer className="btns" loading={loading} type="primary" onClick={() => clickBtn()}>
          {t('finance.receive.btn')}
        </ReceiveButtonContainer>
      </div>
    </Modal>
  )
}

export default ModalPages
