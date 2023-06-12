import { useState } from 'react'
import { useBoolean } from 'ahooks'
import Icon from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { message, Button, Modal, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { modalLayout } from '@/common/antd.cus'
import { LiquidityTitle, FinanceInfo, GMDModalTitle, GMDModalList, CMDModalBtn, GMDInfos } from '@/pages/Finance/styled'

import useDataHooks from '@/hooks/useDataHooks'
import { amountVerificationNative } from '@/common/verification'
import { ClickNftSvg, SelectNftSvg } from '@/pages/Finance/icon'

import ConnectWallet from '@/components/ConnectWallet'
import { useLiquidityToken } from '@/hooks/useLiquidityToken'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import TOKEN_IMAGE from '@/assets/token-image.svg'

const LiquidityModePage = () => {
  const { windowSize } = useWindowSizeHooks()
  const { t } = useTranslation()
  const [onShow, setOnShow] = useBoolean(false)
  const [onShowUri, setOnShowUri] = useBoolean(false)
  const [isRefresh, setIsRefresh] = useBoolean(false)

  const { isActive, account } = useWeb3React()
  const { constant, web3, liquidityUri, LiquidityStaking, symbolETH } = useDataHooks().data

  const [loading, setLoading] = useBoolean(false)
  const [myNftAcitive, setMyNftActive] = useState<undefined | string>(undefined)
  const { myNftLists, myNftListsLoading, setMyNftListsLoading } = useLiquidityToken({ account, isRefresh })

  const handleLiquidityClcik = async () => {
    try {
      let obj = myNftLists.find((item) => item.tokenId === myNftAcitive)
      if (obj && account) {
        void setLoading.setTrue()
        const { isTrue } = await amountVerificationNative({ web3, account })
        if (!isTrue) return
        handleLiquidityAuthorized(obj.tokenId)
      } else
        message.warning({
          content: t('message.finance.tips8'),
          className: 'message-global',
        })
    } catch (error) {
      void setLoading.setFalse()
    }
  }

  const handleLiquidityAuthorized = async (tokenId: string) => {
    try {
      let approvedAddress = await constant.ContractUniswapLiquidity.methods.getApproved(tokenId).call()
      if (approvedAddress.toLowerCase() === LiquidityStaking.toLowerCase()) {
        handleLiquidityDeposit(tokenId)
        return
      }
      constant.ContractUniswapLiquidity.methods
        .approve(LiquidityStaking, tokenId)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          handleLiquidityDeposit(tokenId)
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setLoading.setFalse()
        })
    } catch (error) {
      console.log('error', error)
      void setLoading.setFalse()
    }
  }

  const handleLiquidityDeposit = async (tokenId: string) => {
    try {
      constant.ContractLiquidityStaking.methods
        .deposit(tokenId)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          void setLoading.setFalse()
          void setOnShow.setFalse()
          message.success({
            content: t('message.finance.tips7'),
            className: 'message-global',
          })
          void setIsRefresh.toggle()
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setLoading.setFalse()
        })
    } catch (error) {
      void setLoading.setFalse()
    }
  }

  const handlePledgeOnShow = async () => {
    if (myNftLists.length === 0) {
      message.warning({
        content: t('finance.general.aitoken.tips'),
        className: 'message-global',
      })
    } else void setOnShow.setTrue()
  }

  return (
    <FinanceInfo className="info-ai-0">
      <div className="title">{t('finance.general.aitoken.title')}</div>
      <ul>
        <li>{t('finance.general.aitoken.tips1')}</li>
        <li>{t('finance.general.aitoken.tips2')}</li>
        <li>{t('finance.general.aitoken.tips3')}</li>
        <LiquidityTitle>
          {t('finance.liquidity.tips1')}
          <span>{t('finance.liquidity.tips2')}</span>
          {t('finance.liquidity.tips3')}
          <span className="a" onClick={() => setOnShowUri.setTrue()}>
            {t('finance.liquidity.link')}
          </span>
          {/* <a href={liquidityUri} target="_black">
            {t('finance.liquidity.link')}
          </a> */}
        </LiquidityTitle>
      </ul>
      {isActive ? (
        <Button className="submit" onClick={handlePledgeOnShow} loading={myNftListsLoading}>
          {myNftListsLoading ? t('app.loading') : t('finance.general.btn.liquidity')}
        </Button>
      ) : (
        <div className="submit-wallet">
          <ConnectWallet isMinWidth="100%" isPosition="ProfileMouldWeb" />
        </div>
      )}
      <Modal
        {...modalLayout}
        width="100%"
        afterClose={() => {
          setMyNftListsLoading(true)
          setTimeout(() => {
            void setIsRefresh.toggle()
          }, 300)
        }}
        destroyOnClose={true}
        visible={onShowUri}
        wrapClassName={!onShowUri ? 'common-modal' : 'common-modal uri-show'}
        onCancel={setOnShowUri.setFalse}
      >
        <div
          style={{
            width: windowSize.innerWidth <= Adapth5 ? `${windowSize.innerWidth}px` : `calc(${windowSize.innerWidth}px - 10%)`,
            height: `calc(${windowSize.innerHeight}px - 10vh)`,
          }}
        >
          <iframe
            title="uniswap"
            id="iframe"
            src={liquidityUri}
            frameBorder="no"
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </div>
      </Modal>
      <Modal
        {...modalLayout}
        width={myNftLists.length <= 2 ? '37.75rem' : '58.5rem'}
        visible={onShow}
        afterClose={() => {
          setMyNftActive(undefined)
          setMyNftListsLoading(true)
          setTimeout(() => {
            void setIsRefresh.toggle()
          }, 300)
        }}
        wrapClassName={!onShow ? 'common-modal' : 'common-modal gmdModal-show'}
        onCancel={setOnShow.setFalse}
      >
        <Spin tip={t('app.loading')} spinning={loading || myNftListsLoading}>
          <GMDModalTitle>{t('finance.general.aitoken.modal.title')}</GMDModalTitle>
          <GMDModalList isNFTLength={windowSize.innerWidth > Adapth5 ? myNftLists.length > 2 : myNftLists.length > 1}>
            {myNftLists.map((item, index) => (
              <GMDInfos
                afterT={`${symbolETH.split('/')[0]}·${item.token0}`}
                beforeT={`${item.token1}·${symbolETH.split('/')[1]}`}
                isActive={myNftAcitive === item.tokenId}
                key={index}
                onClick={() => setMyNftActive(item.tokenId)}
              >
                {myNftAcitive === item.tokenId && <Icon className="info-icon" component={SelectNftSvg} />}
                <h3>{item.name}</h3>
                <h4>{item.fee}</h4>
                <img alt={item.tokenId} className={myNftAcitive === item.tokenId ? 'active' : ''} src={item.image || TOKEN_IMAGE} />
                <div className="info-infos">
                  <div>ID: {item.tokenId}</div>
                  <div>Min Tick: {item.tickLower}</div>
                  <div>Max Tick: {item.tickUpper}</div>
                </div>
              </GMDInfos>
            ))}
          </GMDModalList>
          <CMDModalBtn>
            <Icon component={ClickNftSvg} onClick={handleLiquidityClcik} />
          </CMDModalBtn>
        </Spin>
      </Modal>
    </FinanceInfo>
  )
}

export default LiquidityModePage
