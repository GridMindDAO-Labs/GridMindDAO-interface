import { useBoolean, useMount, useInterval } from 'ahooks'
import Icon from '@ant-design/icons'
import { message, Row, Col, Modal, Skeleton, Spin } from 'antd'
import { ProposalsInfoWrapper, ProposalsInfoTitle, ProposalsInfoTabbar, FovorBtn, AgainstBtn, ProposalsInfoDetails } from './styled'
import { DelegateInfoTabbar } from '@/pages/DelegateInfo/styled'
import { useParams, useNavigate } from 'react-router-dom'
import { useAccountDetails, votingListState } from '@/hooks/useAccountDetails'
import { useWeb3React } from '@web3-react/core'
import { RightArrawSvg } from '@/pages/DelegateInfo/icon'
import { VotingBtn } from '@/pages/DAO/styled'
import { useProposalsInfoHooks } from '@/hooks/useProposalsInfoHooks'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { Adapth5, formatStrAddress } from '@/utils'
import { amountVerificationNative } from '@/common/verification'

import Footer from '@/components/Footer'
import ProfileMouldModules from '@/pages/DAO/components/ProfileMouldModules'
import ProposalsInfoForAgainstDivs from './components/ProposalsInfoForAgainstDivs'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

const ProposalsInfoPage = () => {
  const { t, i18n } = useTranslation()
  const dataInit: DataTypes = useDataHooks()
  const { blockExplorerUrl, constant, web3 } = dataInit.data

  const { windowSize } = useWindowSizeHooks()

  const [interval, setInterval] = useState<number | undefined>(undefined)

  let navigate = useNavigate()
  const params: any = useParams()
  const { isActive, account } = useWeb3React()

  const [isRefresh, setIsRefresh] = useBoolean(false)
  const [isLoadingState, setIsLoadingState] = useBoolean(false)
  const [cancelLoading, setCancelLoading] = useBoolean(false)

  const { profileList } = useAccountDetails({ isActive, account, isRefresh })
  const { loading, proposalsDetails, setProposalsDetails } = useProposalsInfoHooks({ ProposalsId: params.id, isRefresh })
  const [isSupportType, setIsSupportType] = useState<1 | 2 | 0 | undefined>(undefined)

  useMount(() => {
    handleMountParams()
    setInterval(undefined)
  })

  useEffect(() => {
    if (proposalsDetails.ProposalsId) {
      const currentTimes = moment().format('X')
      setInterval(undefined)
      if (Number(currentTimes) < Number(proposalsDetails.endBlockTimes)) {
        setInterval(1000)
      }
    }
  }, [proposalsDetails])

  const clearInterval = useInterval(() => {
    handleWatchState()
  }, interval)

  const handleWatchState = async () => {
    try {
      const currentTimes = moment().format('X')
      // console.log(currentTimes,'开始', proposalsDetails.startBlockTimes,'结束',proposalsDetails.endBlockTimes)

      if (
        Number(currentTimes) >= Number(proposalsDetails.startBlockTimes) &&
        Number(currentTimes) < Number(new BigNumber(proposalsDetails.startBlockTimes as any).plus(40))
      ) {
        let state = await constant.ContractGovernance.methods.state(proposalsDetails.ProposalsId).call()
        console.log('任务开始', 'state', state)
        setProposalsDetails((vs) => {
          vs.isAgainst = state === '1' ? true : false
          vs.state = Number(state) as any
          return vs
        })
        return
      }
      if (
        Number(currentTimes) >= Number(proposalsDetails.endBlockTimes) &&
        Number(currentTimes) < Number(new BigNumber(proposalsDetails.endBlockTimes as any).plus(40))
      ) {
        let state = await constant.ContractGovernance.methods.state(proposalsDetails.ProposalsId).call()
        console.log('任务结束', 'state', state)
        setProposalsDetails((vs) => {
          vs.isAgainst = state === '1' ? true : false
          vs.state = Number(state) as any
          if (state !== '1') {
            setInterval(undefined)
            void clearInterval
          }
          return vs
        })
        return
      }
    } catch (error) {
      setInterval(undefined)
      void clearInterval
    }
  }

  const handleMountParams = async () => {
    try {
      if (!params.id) {
        hanledLink()
        return false
      }
    } catch (error) {
      console.error(error)
      navigate('/dao/pelegates', { replace: true })
    }
  }

  const hanledLink = () => {
    navigate('/dao/pelegates', { replace: true })
    message.error({
      content: t('details.proposals.wrong'),
      className: 'message-global',
    })
  }

  const handleCancelClick = async () => {
    const isBalance = await amountVerificationNative({ web3, account: account || '' })
    if (isBalance.isTrue) {
      void setCancelLoading.setTrue()
      try {
        constant.ContractGovernance.methods
          .cancel(proposalsDetails.targets, proposalsDetails.values, proposalsDetails.calldatas, proposalsDetails.descriptionHash)
          .send({
            from: account,
          })
          .on('transactionHash', function (hash: any) {
            console.log(hash)
          })
          .on('receipt', function (receipt: any) {
            message.success({
              content: t('message.dao.tips3'),
              className: 'message-global',
            })
            void setCancelLoading.setFalse()
            void setIsRefresh.toggle()
          })
          .on('error', function (error: any, receipt: any) {
            console.log(receipt)
            message.error({
              content: t('message.dao.tips4'),
              className: 'message-global',
            })
            void setCancelLoading.setFalse()
          })
      } catch (error) {
        void setCancelLoading.setFalse()
      }
    }
  }

  const handleCastVoteClick = async (support: 0 | 1 | 2) => {
    try {
      let isHasVoted = await constant.ContractGovernance.methods.hasVoted(params.id, account).call()
      if (isHasVoted) {
        message.info({
          content: t('message.dao.tips5'),
          className: 'message-global',
        })
        return false
      }
      const isBalance = await amountVerificationNative({ web3, account: account || '' })
      if (isBalance.isTrue) {
        setIsSupportType(support)
        void setIsLoadingState.setTrue()
        constant.ContractGovernance.methods
          .castVote(params.id, support)
          .send({ from: account })
          .on('transactionHash', function (hash: any) {
            console.log(hash)
          })
          .on('receipt', function (receipt: any) {
            message.success({
              content: t('message.dao.tips6', { msg: support === 0 ? t('message.dao.tips.1') : t('message.dao.tips.2') }),
              className: 'message-global',
            })
            void setIsLoadingState.setFalse()
            void setIsRefresh.toggle()
            setIsSupportType(undefined)
          })
          .on('error', function (error: any, receipt: any) {
            console.log(receipt)
            message.error({
              content: t('message.dao.tips7', { msg: support === 0 ? t('message.dao.tips.1') : t('message.dao.tips.2') }),
              className: 'message-global',
            })
            void setIsLoadingState.setFalse()
            setIsSupportType(undefined)
          })
      }
    } catch (error) {
      setIsSupportType(undefined)
      void setIsLoadingState.setFalse()
    }
  }

  const handleAddQueueClick = async () => {
    try {
      const isBalance = await amountVerificationNative({ web3, account: account || '' })
      if (isBalance.isTrue) {
        void setIsLoadingState.setTrue()
        constant.ContractGovernance.methods
          .queue(proposalsDetails.targets, proposalsDetails.values, proposalsDetails.calldatas, proposalsDetails.descriptionHash)
          .send({ from: account })
          .on('transactionHash', function (hash: any) {
            console.log(hash)
          })
          .on('receipt', function (receipt: any) {
            message.success({
              content: t('message.dao.tips8'),
              className: 'message-global',
            })
            void setIsLoadingState.setFalse()
            void setIsRefresh.toggle()
          })
          .on('error', function (error: any, receipt: any) {
            console.log(receipt)
            message.error({
              content: t('message.dao.tips9'),
              className: 'message-global',
            })
            void setIsLoadingState.setFalse()
          })
      }
    } catch (error) {
      void setIsLoadingState.setFalse()
    }
  }

  const handleToExecutedClick = async () => {
    try {
      const isBalance = await amountVerificationNative({ web3, account: account || '' })
      if (isBalance.isTrue) {
        const isWhitelistedAccount = await constant.ContractGovernance.methods.whitelisted(account).call()
        console.log('isWhitelistedAccount', isWhitelistedAccount)
        if (isWhitelistedAccount) handleToExecutedImplement()
        else
          message.info({
            content: t('message.dao.tips10'),
            className: 'message-global',
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleToExecutedImplement = async () => {
    void setIsLoadingState.setTrue()
    try {
      Modal.confirm({
        title: t('message.dao.tips11'),
        content: (
          <div>
            <p>
              {t('message.dao.tips12')}
              {proposalsDetails.queueTime}
            </p>
          </div>
        ),
        okText: t('message.earning.tips6'),
        cancelText: t('message.earning.tips7'),
        onOk: async () => {
          constant.ContractGovernance.methods
            .execute(proposalsDetails.targets, proposalsDetails.values, proposalsDetails.calldatas, proposalsDetails.descriptionHash)
            .send({ from: account })
            .on('transactionHash', function (hash: any) {
              console.log(hash)
            })
            .on('receipt', function (receipt: any) {
              message.success({
                content: t('message.dao.tips13'),
                className: 'message-global',
              })
              void setIsLoadingState.setFalse()
              void setIsRefresh.toggle()
            })
            .on('error', function (error: any, receipt: any) {
              console.log(receipt)
              message.error({
                content: t('message.dao.tips14'),
                className: 'message-global',
              })
              void setIsLoadingState.setFalse()
            })
        },
        onCancel() {
          void setIsLoadingState.setFalse()
        },
      })
    } catch (error) {
      void setIsLoadingState.setFalse()
    }
  }

  return (
    <ProposalsInfoWrapper>
      <Row>
        <Col span={0} xl={{ span: 6 }} md={{ span: 8 }}>
          <ProfileMouldModules returns={() => setIsRefresh.toggle()} profileList={profileList} />
        </Col>
        <Col span={24} xl={{ span: 18 }} md={{ span: 16 }}>
          {isActive ? (
            <Spin tip={t('app.loading')} spinning={loading}>
              <Row className="dao-content">
                <Col span={24}>
                  <DelegateInfoTabbar>
                    <div className="tannrs">
                      <h3
                        onClick={() => {
                          navigate('/dao/pelegates', { replace: true })
                        }}
                      >
                        {t('details.proposals.btn')}
                      </h3>
                      <Icon component={RightArrawSvg} />
                      <span className="span">{t('details.proposalss', { msg: formatStrAddress(6, 4, params.id) })}</span>
                    </div>
                    <VotingBtn style={{ marginLeft: '1.56rem' }} className={`voting-btn-${proposalsDetails.state}`}>
                      {t(votingListState.find((item, i) => i === proposalsDetails.state) || '')}
                    </VotingBtn>
                  </DelegateInfoTabbar>
                </Col>
                <ProposalsInfoTabbar span={24}>
                  <div className="tabbar-left">
                    <ProposalsInfoTitle>{proposalsDetails.title}</ProposalsInfoTitle>
                    <span>
                      {proposalsDetails.state === 0
                        ? t('details.proposals.started', {
                            msg:
                              i18n.language === 'zh-TW'
                                ? moment(proposalsDetails.votingStart).format('YYYY年MM月DD日 HH:mm')
                                : moment(proposalsDetails.votingStart).format('YYYY-MM-DD HH:mm'),
                          })
                        : t('details.proposals.ended', {
                            msg:
                              i18n.language === 'zh-TW'
                                ? moment(proposalsDetails.votingEnd).format('YYYY年MM月DD日 HH:mm')
                                : moment(proposalsDetails.votingEnd).format('YYYY-MM-DD HH:mm'),
                          })}
                    </span>
                  </div>
                  {proposalsDetails.state === 1 && (
                    <div className="tabar-right">
                      <FovorBtn loading={isLoadingState && isSupportType === 1} onClick={() => handleCastVoteClick(1)}>
                        {t('details.proposals.favor')}
                      </FovorBtn>
                      <AgainstBtn loading={isLoadingState && isSupportType === 0} onClick={() => handleCastVoteClick(0)}>
                        {t('details.proposals.against')}
                      </AgainstBtn>
                    </div>
                  )}
                  {proposalsDetails.state === 0 && proposalsDetails.proposerAddress?.toLowerCase() === account?.toLowerCase() && (
                    <div className="tabar-right">
                      <AgainstBtn onClick={handleCancelClick} loading={cancelLoading}>
                        {t('details.proposals.cancel')}
                      </AgainstBtn>
                    </div>
                  )}
                  {proposalsDetails.state === 6 && proposalsDetails.proposerAddress?.toLowerCase() === account?.toLowerCase() && (
                    <div className="tabar-right">
                      <AgainstBtn onClick={handleCancelClick} loading={cancelLoading}>
                        {t('details.proposals.cancel')}
                      </AgainstBtn>
                    </div>
                  )}
                  {proposalsDetails.state === 4 && (
                    <div className="tabar-right">
                      {proposalsDetails.proposerAddress?.toLowerCase() === account?.toLowerCase() && (
                        <AgainstBtn style={{ marginRight: '1.25rem' }} onClick={handleCancelClick} loading={cancelLoading}>
                          {t('details.proposals.cancel')}
                        </AgainstBtn>
                      )}

                      <FovorBtn loading={isLoadingState} onClick={handleAddQueueClick}>
                        {t('details.proposals.queue')}
                      </FovorBtn>
                    </div>
                  )}
                  {proposalsDetails.state === 5 && (
                    <div className="tabar-right">
                      {proposalsDetails.proposerAddress?.toLowerCase() === account?.toLowerCase() && (
                        <AgainstBtn style={{ marginRight: '1.25rem' }} onClick={handleCancelClick} loading={cancelLoading}>
                          {t('details.proposals.cancel')}
                        </AgainstBtn>
                      )}

                      {moment() >= moment(proposalsDetails.queueTime) && (
                        <FovorBtn loading={isLoadingState} onClick={handleToExecutedClick}>
                          {t('details.proposals.execute')}
                        </FovorBtn>
                      )}
                    </div>
                  )}
                </ProposalsInfoTabbar>
                <Col span={24}>
                  <Row gutter={18}>
                    <Col span={24} md={{ span: 12 }}>
                      <ProposalsInfoForAgainstDivs titles="For" proposalsDetails={proposalsDetails} />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <ProposalsInfoForAgainstDivs titles="Against" proposalsDetails={proposalsDetails} />
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <ProposalsInfoTitle style={{ marginTop: '1.25rem' }}>{t('details.proposals.details')}</ProposalsInfoTitle>
                  <div className="details-executioned">
                    {windowSize.innerWidth >= Adapth5 ? (
                      <>
                        {proposalsDetails.executionEvent?.map((item, i) => (
                          <p key={i}>{`${i + 1}: ${item}`}</p>
                        ))}
                      </>
                    ) : (
                      <>
                        {proposalsDetails.executionEvent?.map((item, i) => (
                          <p key={i}>{item}</p>
                        ))}
                      </>
                    )}
                  </div>
                </Col>
                <ProposalsInfoDetails span={24}>
                  <ProposalsInfoTitle>{proposalsDetails.title}</ProposalsInfoTitle>
                  <div className="htmls" dangerouslySetInnerHTML={{ __html: proposalsDetails.details || '' }}></div>
                </ProposalsInfoDetails>
                <Col span={24}>
                  <ProposalsInfoTitle>{t('details.proposals.proposer')}</ProposalsInfoTitle>
                  <a
                    className="proposer-link"
                    href={`${blockExplorerUrl}/address/${proposalsDetails.proposerAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proposalsDetails.proposerAddress}
                  </a>
                </Col>
                <Col span={24}>
                  <Footer />
                </Col>
              </Row>
            </Spin>
          ) : (
            <>
              <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
              <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
            </>
          )}
        </Col>
      </Row>
    </ProposalsInfoWrapper>
  )
}

export default ProposalsInfoPage
