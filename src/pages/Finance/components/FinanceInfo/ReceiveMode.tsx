import { useMemo } from 'react'
import { useBoolean } from 'ahooks'
import { message, Spin } from 'antd'
import { useReceiveTotalHooks } from '@/hooks/useReceiveTotalHooks'
import {
  ReceiveContainer,
  ReceiveHeading4,
  ReceiveHeading5,
  ReceiveText,
  ReceiveSubText,
  ReceiveSubTitle,
  ReceiveButtonContainer,
  ReceiveEarnings,
  ReceiveButton,
} from '@/pages/Finance/styled'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import useDataHooks from '@/hooks/useDataHooks'
import ConnectWallet from '@/components/ConnectWallet'
import ModalReceive from '@/pages/Finance/components/Modal'

type Types = {
  isRefreshOut: boolean
}

const ReceiveMode = ({ isRefreshOut }: Types) => {
  const { t } = useTranslation()
  const { account, isActive } = useWeb3React()
  const { constant } = useDataHooks().data

  const [show, setShow] = useBoolean(false)
  const [isRefresh, setIsRefresh] = useBoolean(false)
  const [receiveLoading, setReceiveLoading] = useBoolean(false)

  useMemo(() => {
    void setIsRefresh.toggle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshOut])

  const { userInfoLoading, userInfoRewards, total, totalTimes } = useReceiveTotalHooks({ account, isRefresh })

  const handleReceiveClick = async () => {
    try {
      let earneds = await constant.ContractStakingRewards.methods.earned(account).call()
      if (Number(earneds) === 0) {
        message.warning({
          content: t('finance.receive.tip1'),
          className: 'message-global',
        })
        return
      }
      if (Number(total) < Number(userInfoRewards.balance)) {
        message.warning({
          content: t('finance.receive.tip3'),
          className: 'message-global',
        })
        return
      }
      void setShow.setTrue()
    } catch (error) {}
  }

  const handleReceiveImplement = async () => {
    try {
      constant.ContractStakingRewards.methods
        .claimRewards()
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          message.success({
            content: t('finance.receive.tip2'),
            className: 'message-global',
          })
          void setIsRefresh.toggle()
          void setReceiveLoading.setFalse()
          void setShow.setFalse()
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setReceiveLoading.setFalse()
          void setShow.setFalse()
        })
    } catch (error) {
      void setReceiveLoading.setFalse()
      void setShow.setFalse()
    }
  }

  return (
    <>
      <Spin tip={t('app.loading')} spinning={userInfoLoading}>
        <ReceiveContainer>
          <ReceiveHeading4>{t('finance.receive.title1')}</ReceiveHeading4>
          <ReceiveHeading5>{t('finance.receive.title2')}</ReceiveHeading5>
          <ReceiveText>{totalTimes}</ReceiveText>
          <ReceiveSubText>
            <ReceiveSubTitle>{t('finance.receive.title.total')}</ReceiveSubTitle>
            <h3>{total} GMD</h3>
            <ReceiveButton>
              {isActive ? (
                <ReceiveButtonContainer type="primary" onClick={handleReceiveClick}>
                  {t('finance.receive.btn')}
                </ReceiveButtonContainer>
              ) : (
                <ConnectWallet isMinWidth="100%" isPosition="ProfileMouldWeb" />
              )}
            </ReceiveButton>
          </ReceiveSubText>
          <ReceiveHeading5>{t('finance.receive.usd.title')}</ReceiveHeading5>
          <ReceiveEarnings>{userInfoRewards.balance} GMD</ReceiveEarnings>
        </ReceiveContainer>
      </Spin>
      <ModalReceive
        show={show}
        type="1"
        setShow={(s) => (s ? void setShow.setTrue() : void setShow.setFalse())}
        setIsRefresh={() => void setIsRefresh.toggle()}
        balance={userInfoRewards.balance}
        loading={receiveLoading}
        clickBtn={() => {
          void setReceiveLoading.setTrue()
          handleReceiveImplement()
        }}
      />
    </>
  )
}

export default ReceiveMode
