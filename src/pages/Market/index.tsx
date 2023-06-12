import { useEffect, useRef } from 'react'
import { Image, Row, Col, Button, Modal, Skeleton, message, Spin, Empty, Divider } from 'antd'
import Icon from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import {
  MarketWrapper,
  MarketTabbar,
  MarketInvite,
  MarketModalContent,
  InvitationDetails,
  InvitationDetailsInfo,
  MarketContent,
  MarketGrid,
  MarketGridButton,
  MarketGridH3,
  MarketGridH5,
  TableWrapper,
  Table,
  MarketTips,
} from './styled'
// import moment from 'moment'
import { UserSvg, VectorSvg } from './icon'
import { modalLayout } from '@/common/antd.cus'

import MARKET_SHIELD from '@/assets/market-shield.png'
import Footer from '@/components/Footer'
import { Adapth5, formatStrAddress } from '@/utils'
import { useBoolean } from 'ahooks'
import QRCode from 'qrcode.react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { useUserInfoHooks } from '@/hooks/useUserInfoHooks'
import { useMarketHooks } from '@/hooks/useMarketHooks'
import { useLevelHooks } from '@/hooks/useLevelHooks'
import ModalReceive from '@/pages/Finance/components/Modal'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'

import LeaderBoard from '@/pages/Market/components/LeaderBoard'
// import axios from 'axios'

const MarketPage = () => {
  let navigate = useNavigate()
  const { fromWeiPowBanlances } = useDataHooks().data
  const modalRef = useRef<any>(null)
  const { t } = useTranslation()
  const { isActive, account } = useWeb3React()
  const uriText = `${window.location.origin}${window.location.pathname}#/invite/${account}`

  const [isRefresh, setIsRefresh] = useBoolean(false)
  const [show, setShow] = useBoolean(false)
  const [currentEarneds, setCurrentEarneds] = useState<string>('0')

  const { users, currentAdditiveRate } = useUserInfoHooks({ account })
  const { levels } = useLevelHooks({ account })
  const { list, loading, earned, earnedTotal } = useMarketHooks({ account, isRefresh })

  const [onShow, setOnShow] = useBoolean(false)
  const [text, setText] = useState<string>('')
  const [earnedLoading, setEarnedLoading] = useBoolean(false)

  const [onRankingShow, setOnRankingShow] = useBoolean(false)
  const { windowSize } = useWindowSizeHooks()
  const [isRefreshOnRanking, setIsRefreshOnRanking] = useBoolean(false)

  const dataInit: DataTypes = useDataHooks()
  // web3,InvitationRewards_Address
  const { constant } = dataInit.data

  const params: any = useParams()

  useEffect(() => {
    if (onRankingShow) getBodyOverflow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRankingShow, windowSize.innerWidth])

  const getBodyOverflow = () => {
    if (windowSize.innerWidth >= Adapth5) document.body.style.overflow = 'hidden'
    else {
      document.body.style.overflow = 'auto'
    }
  }

  // useEffect(() => {
  //   getCommunityLevelUpdated()
  // }, [account])

  // const getCommunityLevelUpdated = async () => {
  //   let startAts = await (await web3.eth.getBlock(29521031)).timestamp
  //   let startTimes = moment.unix(Number(startAts)).format('YYYY.MM.DD HH:mm:ss')
  //   console.log('startTimes', startTimes)
  //   console.log('startAts', startAts)

  //   if (!account) return
  //   let topic0 = await web3.utils.sha3(
  //     'CommunityLevelUpdated(address,uint256,uint256)',
  //   )
  //   const { data } = await axios.get(`https://api-testnet.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&address=${InvitationRewards_Address}&topic0=${topic0}&apikey=366TDMB1M11NCFABM78212QFUM81INYK1C`)
  //   let result = data.result
  //   let list = []
  //   for (let i = 0; i < result.length; i++) {
  //     const element = result[i];
  //     let blockNumber = web3.utils.hexToNumber(element.blockNumber)
  //     let timestamp = await (await web3.eth.getBlock(blockNumber)).timestamp
  //     let parameters = web3.eth.abi.decodeParameters(['uint256', 'uint256'], element.data)
  //     let data: any = {
  //       user: `0x${element.topics[1].substring(26, element.topics[1].length)}`,
  //       oldLevel: parameters[0],
  //       newLevel: parameters[1],
  //       blockNumber,
  //       timestamp,
  //       times: moment.unix(Number(timestamp)).format('YYYY.MM.DD HH:mm:ss'),
  //     }
  //     list.push(data)
  //   }
  //   console.log('userLearn::::',list.filter(item => item.user.toLowerCase() === account.toLowerCase()))

  // }

  useEffect(() => {
    if (params?.weekId) handleParams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, windowSize.innerWidth])

  const handleParams = () => {
    if (!onRankingShow && params.weekId) {
      setOnRankingShow.setTrue()
    }
  }

  const handleQrCode = async () => {
    setText(uriText)
    void setOnShow.setTrue()
  }

  const handleQrCodeUpload = () => {
    const canvas = document.getElementById('qrCode') as HTMLCanvasElement
    const imageDataURL = canvas.toDataURL('image/png')
    const downloadLink = document.createElement('a')
    downloadLink.href = imageDataURL
    downloadLink.download = `${formatStrAddress(6, 4, account || '')}.png`
    downloadLink.click()
  }

  const handleCopy = async () => {
    let aux = document.createElement('input')
    aux.setAttribute('value', uriText)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
    message.success({
      content: t('market.copy.success'),
      className: 'message-global',
    })
  }

  const handleRewardBtn = async () => {
    try {
      const earneds = await constant.ContractInvitationRewards.methods.earned(account).call()
      if (Number(earneds) === 0) {
        message.warning({
          content: t('market.reward.tip1'),
          className: 'message-global',
        })
        return
      }
      setCurrentEarneds(fromWeiPowBanlances({ decimals: '18', balance: earneds }))
      void setShow.setTrue()
    } catch (error) {
      setCurrentEarneds('0')
    }
  }

  const hanleRewardImplement = async () => {
    const earneds = await constant.ContractInvitationRewards.methods.earned(account).call()
    try {
      void setEarnedLoading.setTrue()
      constant.ContractInvitationRewards.methods
        .claimRewards(earneds)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          message.success({
            content: t('market.reward.tip2'),
            className: 'message-global',
          })
          void setIsRefresh.toggle()
          void setEarnedLoading.setFalse()
          void setShow.setFalse()
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setEarnedLoading.setFalse()
          void setShow.setFalse()
        })
    } catch (error) {
      console.log('error', error)
      void setEarnedLoading.setFalse()
      void setShow.setFalse()
    }
  }

  return (
    <MarketWrapper>
      {isActive && (
        <>
          {windowSize.innerWidth < Adapth5 && onRankingShow ? (
            <LeaderBoard
              isH5={true}
              isRefresh={isRefreshOnRanking}
              returnss={() => {
                void setIsRefreshOnRanking.toggle()
                void setOnRankingShow.setFalse()
                navigate('/market', { replace: true })
              }}
            />
          ) : (
            <>
              <MarketTabbar>
                <Image src={MARKET_SHIELD} preview={false} />
                <h3>{t('market.tabbar.title')}</h3>
              </MarketTabbar>
              <Row>
                <Col span={24} lg={{ span: 8 }} xxl={{ span: 8 }}>
                  <InvitationDetails>
                    <div className="titles">{t('market.title')}</div>
                    <Spin spinning={loading}>
                      <InvitationDetailsInfo>
                        <div className="top">
                          <Icon component={UserSvg} />
                          {users.communityLevel !== '0' && (
                            <div className="spans">
                              {users.communityLevel === '1' && t('market.level', { msg: t('market.direct.info0') })}
                              {users.communityLevel === '2' && t('market.level', { msg: t('market.direct.info1') })}
                              {users.communityLevel === '3' && t('market.level', { msg: t('market.direct.info2') })}
                              {users.communityLevel === '4' && t('market.level', { msg: t('market.direct.info3') })}
                            </div>
                          )}
                        </div>
                        <div className="top">
                          <h4>{t('market.invitees')}</h4>
                          <div className="spans">{users.invitedUsers}</div>
                        </div>
                        <div className="top">
                          <h4>{t('market.team')}</h4>
                          <div className="spans">
                            ≈{Number(users.teamPerformance).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}{' '}
                            {t('market.usd')}
                          </div>
                        </div>
                        <div className="top">
                          <h4>{t('market.direct.push')}</h4>
                        </div>
                        <div className="direct-info">
                          <span>{t('market.direct.info1')}</span>
                          <span>{levels.juniorCommunities}</span>
                        </div>
                        <div className="direct-info">
                          <span>{t('market.direct.info2')}</span>
                          <span>{levels.intermediateCommunities}</span>
                        </div>
                        <div className="direct-info">
                          <span>{t('market.direct.info3')}</span>
                          <span>{levels.seniorCommunities}</span>
                        </div>
                        <div className="top" style={{ marginTop: '0.94rem' }}>
                          <h4>{t('market.usd.info1')}</h4>
                          <div className="spans">{users.valueWei}</div>
                        </div>
                        <div className="top">
                          <h4>{t('market.usd.info2')}</h4>
                          <div className="spans">{Number(currentAdditiveRate).toFixed(2)}%</div>
                        </div>
                      </InvitationDetailsInfo>
                      <InvitationDetailsInfo>
                        <div
                          className="top"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            void setOnRankingShow.setTrue()
                            window.scrollTo(0, 0)
                          }}
                        >
                          <h4>{t('market.community.ranking')}</h4>
                          <Icon component={VectorSvg} />
                        </div>
                      </InvitationDetailsInfo>
                    </Spin>
                  </InvitationDetails>
                </Col>
                <Col span={24} lg={{ span: 16 }} xxl={{ span: 16 }}>
                  <MarketContent>
                    <div className="titles">{t('market.invitation')}</div>
                  </MarketContent>
                  <MarketInvite ref={modalRef}>
                    <div className="market-title">
                      <span className="spans">
                        {window.location.origin}
                        {window.location.pathname}#/invite/{formatStrAddress(6, 4, account || '')}
                      </span>
                      <div className="ssssibtn">
                        <div className="ibtn">
                          <Button type="text" onClick={handleCopy}>
                            {t('market.copy.title')}
                          </Button>
                          <div className="line">|</div>
                          <Button type="text" onClick={handleQrCode}>
                            {t('market.copy.code')}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Col span={0} md={{ span: 24 }}>
                      <Divider plain style={{ borderTopColor: '#d9d9d9' }}>
                        <MarketTips>{t('market.invitation.tips')}</MarketTips>
                      </Divider>
                    </Col>
                    <Col span={24} md={{ span: 0 }}>
                      <MarketTips style={{ textAlign: 'center', margin: '0.94rem 0' }}>{t('market.invitation.tips')}</MarketTips>
                    </Col>
                    <Col span={24} md={{ span: 0 }}>
                      <MarketInvite style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="ibtn">
                          <Button type="text" onClick={handleCopy}>
                            {t('market.copy.title')}
                          </Button>
                          <div className="line">|</div>
                          <Button type="text" onClick={handleQrCode}>
                            {t('market.copy.code')}
                          </Button>
                        </div>
                      </MarketInvite>
                    </Col>
                    <Spin spinning={loading}>
                      <MarketGrid>
                        <MarketGridH3>{t('market.reward.total')}</MarketGridH3>
                        <MarketGridH5>{earnedTotal} GMD</MarketGridH5>
                        <div className="gard-web"></div>
                        <MarketGridH3>{t('market.reward.current')}</MarketGridH3>
                        <MarketGridH5>{earned} GMD</MarketGridH5>
                        <div className="gard-h5"></div>

                        <MarketGridButton>
                          <button onClick={handleRewardBtn}>{t('market.reward.btn')}</button>
                        </MarketGridButton>
                      </MarketGrid>
                    </Spin>
                  </MarketInvite>
                  <MarketContent className="market-lines">
                    <div className="info">
                      <div className="info-title">{t('market.consensus.title')}</div>
                      <p style={{ textIndent: '2em' }}>{t('market.consensus.content1')}</p>
                      <p>{t('market.consensus.content2')}</p>
                      <p style={{ textIndent: '2em' }}>{t('market.consensus.content3')}</p>
                      <p style={{ textIndent: '2em' }}>{t('market.consensus.content4')}</p>
                      <p style={{ textIndent: '2em' }}>{t('market.consensus.content5')}</p>
                      <p style={{ textIndent: '2em' }}>{t('market.consensus.content6')}</p>
                      <p>{t('market.consensus.content7')}</p>
                    </div>
                  </MarketContent>
                  <MarketContent>
                    <div className="info">
                      <div className="info-title">{t('market.list.title')}</div>
                    </div>
                  </MarketContent>
                  <TableWrapper>
                    <Spin tip={t('app.loading')} spinning={loading}>
                      <Table>
                        <thead>
                          <tr>
                            <th>{t('market.list.title1')}</th>
                            <th>{t('market.list.title2')}</th>
                            <th>{t('market.list.title3')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((item, index) => (
                            <tr key={index}>
                              <td>{formatStrAddress(6, 4, item.account)}</td>
                              <td>{item.createAt}</td>
                              <td>
                                {item.amount} <span>USD</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className="table-no">
                        {!loading && list.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('description')} />}
                      </div>
                    </Spin>
                  </TableWrapper>
                </Col>

                <Col span={24} className="market-footer">
                  <Footer />
                </Col>
              </Row>
              <Modal {...modalLayout} getContainer={modalRef.current} width="21.25rem" visible={onShow} onCancel={setOnShow.setFalse}>
                <h3>{t('market.copy.code')}</h3>
                <MarketModalContent>
                  <QRCode id="qrCode" value={text} size={146} fgColor="#000000" />
                  <div className="save" onClick={handleQrCodeUpload}>
                    {t('market.copy.save')}
                  </div>
                </MarketModalContent>
              </Modal>
            </>
          )}
        </>
      )}
      {!isActive && (
        <>
          <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
          <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
        </>
      )}
      <ModalReceive
        show={show}
        type="4"
        setShow={(s) => (s ? void setShow.setTrue() : void setShow.setFalse())}
        setIsRefresh={() => void setIsRefresh.toggle()}
        balance={currentEarneds}
        loading={earnedLoading}
        clickBtn={() => {
          hanleRewardImplement()
        }}
      />
      {windowSize.innerWidth >= Adapth5 && (
        <Modal
          {...modalLayout}
          getContainer={modalRef.current}
          width="61rem"
          afterClose={() => {
            console.log('afterClose')
            void setIsRefreshOnRanking.toggle()
            navigate('/market', { replace: true })
            document.body.style.overflow = 'auto'
          }}
          wrapClassName="common-modal common-modal-ranking"
          visible={onRankingShow}
          onCancel={setOnRankingShow.setFalse}
        >
          <LeaderBoard isRefresh={isRefreshOnRanking} returnss={() => {}} />
        </Modal>
      )}
    </MarketWrapper>
  )
}

export default MarketPage
