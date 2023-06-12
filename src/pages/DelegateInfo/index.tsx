import { useMount, useBoolean } from 'ahooks'
import { Row, Col, message, Button, Spin, Skeleton } from 'antd'
import Icon from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { VotingBtn } from '@/pages/DAO/styled'
import {
  DelegateInfoWrapper,
  DelegateInfoTabbar,
  DelegateInfoUsers,
  DelegateInfoNums,
  DelegateInfoVotingHistoryInfo,
  DelegateInfoVotingHistoryTitle,
} from './styled'
import { useParams } from 'react-router-dom'
import { useAccountDetails, votingListState } from '@/hooks/useAccountDetails'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { useNavigate } from 'react-router-dom'
import { formatStrAddress } from '@/utils'
import { RightArrawSvg, UserSvg, CopySvg, AgainstSvg, InFavoSvg } from './icon'
import { useDelegateInfoHooks } from '@/hooks/useDelegateInfoHooks'

import Footer from '@/components/Footer'
import ProfileMouldModules from '@/pages/DAO/components/ProfileMouldModules'
import { useTranslation } from 'react-i18next'

const DelegateInfoPages = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  const { isActive, account } = useWeb3React()
  const dataInit: DataTypes = useDataHooks()
  const { web3, constant } = dataInit.data
  const [delegateLoading, setDelegateLoading] = useBoolean(false)

  const [isRefresh, setIsRefresh] = useBoolean(false)

  const params: any = useParams()
  const { profileList } = useAccountDetails({ isActive, account, isRefresh })
  const { details, loading } = useDelegateInfoHooks({ pAddress: params.address, isRefresh })

  useMount(() => {
    handleMountParams()
  })

  const handleMountParams = async () => {
    try {
      if (!params.address) {
        hanledLink()
        return false
      }
      let isAddress = await web3.utils.isAddress(params.address)
      if (!isAddress) {
        hanledLink()
        return false
      }
    } catch (error) {
      console.error(error)
      navigate('/dao/delegates', { replace: true })
    }
  }

  const hanledLink = () => {
    navigate('/dao/delegates', { replace: true })
    message.error({
      content: t('details.delegate.wrong'),
      className: 'message-global',
    })
  }

  const handleDelegateClick = async () => {
    if (!params.address) return
    void setDelegateLoading.setTrue()
    try {
      constant.ContractLPToken.methods
        .delegate(params.address)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          message.success({
            content: t('message.dao.tips1'),
            className: 'message-global',
          })
          void setDelegateLoading.setFalse()
          void setIsRefresh.toggle()
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setDelegateLoading.setFalse()
        })
    } catch (error) {
      void setDelegateLoading.setFalse()
    }
  }

  const handleCopy = (address: string) => {
    let aux = document.createElement('input')
    aux.setAttribute('value', address)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
    message.success({
      content: t('message.dao.tips2'),
      className: 'message-global',
    })
  }

  return (
    <DelegateInfoWrapper>
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
                          navigate('/dao/delegates', { replace: true })
                        }}
                      >
                        {t('details.delegate.top')}
                      </h3>
                      <Icon component={RightArrawSvg} />
                      <span className="span">{formatStrAddress(6, 4, params.address)}</span>
                    </div>
                  </DelegateInfoTabbar>
                </Col>
                <Col span={24} xl={{ span: 10 }}>
                  <DelegateInfoUsers>
                    <div className="info-users">
                      <Icon component={UserSvg} />
                      <span className="info-users-address">{formatStrAddress(6, 4, details.account)}</span>
                      <Icon component={CopySvg} className="icon-copys" onClick={() => handleCopy(details.account)} />
                    </div>
                    <Button
                      loading={delegateLoading}
                      onClick={handleDelegateClick}
                      className={params.address.toLowerCase() === account?.toLowerCase() ? 'users-delegate-disabled' : 'users-delegate'}
                      disabled={params.address.toLowerCase() === account?.toLowerCase() ? true : false}
                    >
                      {t('details.delegate.btn1')}
                    </Button>
                  </DelegateInfoUsers>
                </Col>
                <Col span={24} xl={{ span: 14 }}>
                  <DelegateInfoNums>
                    <div className="nums">
                      <span>{t('details.delegate.liquidity')}</span>
                      <h4>{Number(details.flowabilityAitoken).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}</h4>
                    </div>
                    <div className="nums">
                      <span>{t('details.delegate.votes')}</span>
                      <h4>{Number(details.totalVotes).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}</h4>
                    </div>
                    <div className="nums">
                      <span>{t('details.delegate.total')}</span>
                      <h4>{Number(details.transferVotes).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}</h4>
                    </div>
                  </DelegateInfoNums>
                </Col>
                <Col span={24}>
                  <DelegateInfoVotingHistoryTitle>{t('details.delegate.voting')}</DelegateInfoVotingHistoryTitle>
                </Col>
                <Col span={24}>
                  {details.votingRecords?.map((vh, key) => (
                    <DelegateInfoVotingHistoryInfo key={key}>
                      <div className="info-left">
                        <p>{vh.description}</p>
                        <VotingBtn className={`voting-btn-${Number(vh.state)}`}>
                          {t(votingListState.find((item, i) => i === Number(vh.state)) || '')}
                        </VotingBtn>
                      </div>
                      <div className="info-right">
                        <span className="span">
                          {Number(
                            vh.forVotes.find((is) => is.voter.toLowerCase() === details.account?.toLowerCase())?.weight || '0',
                          ).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}
                          &nbsp;&nbsp;{t('details.delegate.votes.unit')}
                        </span>
                        <span className={!vh.isSuccess ? 'against span' : 'favor span'}>
                          {!vh.isSuccess ? t('details.proposals.against') : t('details.proposals.favor1')}
                        </span>
                        {!vh.isSuccess ? <Icon component={AgainstSvg} /> : <Icon component={InFavoSvg} />}
                      </div>
                    </DelegateInfoVotingHistoryInfo>
                  ))}
                </Col>
                <Col span={24}>
                  <Footer />
                </Col>
              </Row>
            </Spin>
          ) : (
            <>
              <Skeleton className="dao-skeleton" avatar paragraph={{ rows: 2 }} />
              <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
              <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
            </>
          )}
        </Col>
      </Row>
    </DelegateInfoWrapper>
  )
}

export default DelegateInfoPages
