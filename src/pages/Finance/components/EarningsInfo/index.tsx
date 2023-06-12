import { useEffect, useState } from 'react'
import { Table, Row, Col, Pagination, Space, message, Modal, Spin, Empty } from 'antd'
import type { PaginationProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Adapth5 } from '@/utils'
import Icon from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { PaginationBtn } from '@/pages/DAO/styled'
import {
  RenewalBtn,
  FinanceTitle,
  // FinanceSubtitle,
  EarningsInfoContent,
  RedeemBtn,
  ReceiveEarningsBtn,
  EarningsInfoBottonTitle,
  EarningsInfoBottonNum,
  RedeemBtnText,
  EarningsInfoTableH5,
  EarningsInfoTableH5Info,
  EarningsInfoTableH5No,
  EarningH5Spin,
  AiReceiveButton,
} from '@/pages/Finance/styled'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { LeftSvg, RigthSvg } from '@/pages/DAO/icon'
import { useEarningsHooks, EarningsTableTypes, arraysEqual } from '@/hooks/useEarningsHooks'
import { useTranslation } from 'react-i18next'
import useDataHooks from '@/hooks/useDataHooks'
import { useBoolean } from 'ahooks'
import { handleLastestPriceEarnings } from '@/pages/Finance/utils'
import ModalReceive from '@/pages/Finance/components/Modal'

const EarningsInfoPage = () => {
  const { constant, Tether_Address, toWeiPowBanlance, fromWeiPowBanlance, LiquidityStaking, GMDToken_Address, Financing_Address } =
    useDataHooks().data
  const { t } = useTranslation()
  const { isActive, account } = useWeb3React()
  const { windowSize } = useWindowSizeHooks()

  const [isRefresh, setIsRefresh] = useBoolean(false)

  const [earnPage, setEarnPage] = useState<number>(1)
  const [earnAiPage, setEarnAiPage] = useState<number>(1)
  const [liquiditesReceiveLoading, setlLiquiditesReceiveLoading] = useBoolean(false)

  const { loading, earningList, historyCount, liquiditesCurrent, getData, setEarningList } = useEarningsHooks({
    isActive,
    account,
    isRefresh,
  })
  const [receiveLoading, setReceiveLoading] = useBoolean(false)
  const [redeemLoading, setRedeemLoading] = useBoolean(false)
  const [renewalLoading, setRenewalLoading] = useBoolean(false)
  const [currentOrderHash, setCurrentOrderHash] = useState<string | undefined>(undefined)

  const blockNumber = useDataHooks().blockNumber

  const [type, setType] = useState<'2' | '3'>('2')
  const [currentUsd, setCurrentUsd] = useState<string>('0')
  const [show, setShow] = useBoolean(false)

  useEffect(() => {
    if (blockNumber && !loading) handleBlockBumberWatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber, loading])

  const handleBlockBumberWatch = async () => {
    try {
      const { list } = await getData()
      let isEqual = arraysEqual(list, earningList)
      if (!isEqual) setEarningList(list)
    } catch (error) {}
  }

  document.addEventListener(
    'visibilitychange',
    (event) => {
      if (document.visibilityState === 'visible') void setIsRefresh.toggle()
    },
    false,
  )

  const handleReceive = async (obj: EarningsTableTypes) => {
    let earned = await constant.ContractFinancing.methods.earned(obj.orderHash).call()
    console.log('currentEarned', earned)
    if (earned === '0') {
      message.info({
        content: t('message.earning.tips1'),
        className: 'message-global',
      })
      return
    }
    setCurrentOrderHash(obj.orderHash)
    let values = fromWeiPowBanlance({ balance: earned.toString(), decimals: '18' })
    console.log('values', values)
    const { usd } = await handleLastestPriceEarnings({
      value: Number(values),
      GMDToken_Address,
      fromWeiPowBanlance,
      Tether_Address,
      constant,
    })
    try {
      setType('2')
      setCurrentUsd(usd.toString())
      void setShow.setTrue()
    } catch (error) {
      setCurrentUsd('0')
      setCurrentOrderHash(undefined)
      void setReceiveLoading.setFalse()
    }
  }

  const handleReceiveImplement = async ({ orderHash }: { orderHash: string }) => {
    constant.ContractFinancing.methods
      .claim(orderHash)
      .send({
        from: account,
      })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', function (receipt: any) {
        message.success({
          content: t('message.earning.tips8'),
          className: 'message-global',
        })
        setCurrentOrderHash(undefined)
        void setReceiveLoading.setFalse()
        void setIsRefresh.toggle()
        void setShow.setFalse()
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt)
        message.error({
          content: t('message.earning.tips9'),
          className: 'message-global',
        })
        setCurrentOrderHash(undefined)
        void setReceiveLoading.setFalse()
        void setShow.setFalse()
      })
  }

  const handleliquiditesRedeemClick = async (obj: EarningsTableTypes) => {
    console.log('obj', obj)
    try {
      let AuthorizedAmount = await constant.ContractLPToken.methods.allowance(account, LiquidityStaking).call()
      if (Number(AuthorizedAmount) < Number(obj.amountSocial || '0')) {
        setCurrentOrderHash(obj.orderHash)
        void setRedeemLoading.setTrue()
        constant.ContractLPToken.methods
          .approve(LiquidityStaking, obj.amountSocial)
          .send({
            from: account,
          })
          .on('transactionHash', function (hash: any) {
            console.log(hash)
          })
          .on('receipt', async (receipt: any) => {
            handleliquiditesRedeemImplement({ orderHash: obj.orderHash })
          })
          .on('error', function (error: any, receipt: any) {
            message.error({
              content: error.message,
              className: 'message-global',
            })
            setCurrentOrderHash(undefined)
            void setRedeemLoading.setFalse()
          })
      } else handleliquiditesRedeemImplement({ orderHash: obj.orderHash })
    } catch (error) {}
  }

  const handleliquiditesRedeemImplement = async ({ orderHash }: { orderHash: string }) => {
    try {
      setCurrentOrderHash(orderHash)
      void setRedeemLoading.setTrue()
      constant.ContractLiquidityStaking.methods
        .withdraw(orderHash)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          message.success({
            content: t('message.earning.tips10'),
            className: 'message-global',
          })
          setCurrentOrderHash(undefined)
          void setRedeemLoading.setFalse()
          void setIsRefresh.toggle()
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt)
          message.error({
            content: t('message.earning.tips11'),
            className: 'message-global',
          })
          setCurrentOrderHash(undefined)
          void setRedeemLoading.setFalse()
        })
    } catch (error) {
      setCurrentOrderHash(undefined)
      void setRedeemLoading.setFalse()
    }
  }

  const handleRenewal = async (obj: EarningsTableTypes) => {
    try {
      setCurrentOrderHash(obj.orderHash)
      void setRenewalLoading.setTrue()
      constant.ContractFinancing.methods
        .updateUserPeriodFinish(obj.orderHash)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          setCurrentOrderHash(undefined)
          message.success({
            content: t('message.earning.tips12'),
            className: 'message-global',
          })
          void setRenewalLoading.setFalse()
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: t('message.earning.tips13'),
            className: 'message-global',
          })
          setCurrentOrderHash(undefined)
          void setRenewalLoading.setFalse()
        })
    } catch (error) {
      void setRenewalLoading.setFalse()
      setCurrentOrderHash(undefined)
    }
  }

  const handleRedeemClick = async (obj: EarningsTableTypes) => handleRedeemImplement({ orderHash: obj.orderHash })

  const handleRedeemImplement = async ({ orderHash }: { orderHash: string }) => {
    try {
      setCurrentOrderHash(orderHash)
      void setRedeemLoading.setTrue()
      constant.ContractFinancing.methods
        .withdraw(orderHash)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          message.success({
            content: t('message.earning.tips10'),
            className: 'message-global',
          })
          setCurrentOrderHash(undefined)
          void setRedeemLoading.setFalse()
          void setIsRefresh.toggle()
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt)
          message.error({
            content: t('message.earning.tips11'),
            className: 'message-global',
          })
          setCurrentOrderHash(undefined)
          void setRedeemLoading.setFalse()
        })
    } catch (error) {
      setCurrentOrderHash(undefined)
      void setRedeemLoading.setFalse()
    }
  }

  const handleliquiditesReceiveClick = async () => {
    try {
      let contractBanlanceOf = await constant.ContractGMDToken.methods.balanceOf(LiquidityStaking).call()
      console.log('contractBanlanceOf', contractBanlanceOf)
      let earned = await constant.ContractLiquidityStaking.methods.earned(account).call()
      console.log('earned', earned)
      if (
        Number(fromWeiPowBanlance({ balance: contractBanlanceOf, decimals: '18' })) <
        Number(
          fromWeiPowBanlance({
            balance: earned,
            decimals: '18',
          }),
        )
      ) {
        message.info({
          content: t('message.earning.tips0'),
          className: 'message-global',
        })
        return
      }
      if (earned === '0') {
        message.info({
          content: t('message.earning.tips1'),
          className: 'message-global',
        })
        return
      }
      let earneds = fromWeiPowBanlance({ decimals: '18', balance: earned })
      setType('3')
      setCurrentUsd(earneds.toString())
      void setShow.setTrue()
    } catch (error) {
      setCurrentUsd('0')
    }
  }

  const handleliquiditesReceiveImplement = async () => {
    try {
      void setlLiquiditesReceiveLoading.setTrue()
      constant.ContractLiquidityStaking.methods
        .claimRewards()
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          message.success({
            content: t('message.earning.tips8'),
            className: 'message-global',
          })
          void setlLiquiditesReceiveLoading.setFalse()
          void setIsRefresh.toggle()
          void setShow.setFalse()
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt)
          message.error({
            content: t('message.earning.tips9'),
            className: 'message-global',
          })
          void setlLiquiditesReceiveLoading.setFalse()
          void setShow.setFalse()
        })
    } catch (error) {
      void setShow.setFalse()
      void setlLiquiditesReceiveLoading.setFalse()
    }
  }

  const columns: ColumnsType<EarningsTableTypes> = [
    {
      title: t('finance.earning.columns.title2'),
      dataIndex: 'currency',
      key: 'currency',
      width: 140,
      align: 'center',
    },
    {
      title: t('finance.earning.columns.title3'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: 140,
      render: (text) => <>{Number(text)}</>,
    },
    {
      title: t('finance.earning.columns.title4'),
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
      width: 180,
    },
    {
      title: t('finance.earning.columns.title8'),
      dataIndex: 'earnings_deadline',
      key: 'earnings_deadline',
      align: 'center',
      width: 180,
    },
    {
      title: t('finance.earning.columns.title5'),
      dataIndex: 'usd',
      key: 'usd',
      align: 'center',
      width: 140,
    },
    {
      title: t('finance.earning.columns.title6'),
      dataIndex: 'gmd_token',
      key: 'gmd_token',
      align: 'center',
      width: 240,
    },
    {
      title: t('finance.earning.columns.title7'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 200,
      fixed: windowSize.innerWidth > 1200 ? undefined : 'right',
      render: (text, obj) =>
        text ? (
          <Space style={{ display: 'flex', alignItems: 'flex-start' }}>
            <ReceiveEarningsBtn onClick={() => handleReceive(obj)}>{t('finance.earning.columns.btn3')}</ReceiveEarningsBtn>
            <RedeemBtn loading={redeemLoading && currentOrderHash === obj.orderHash} onClick={() => handleRedeemClick(obj)}>
              {t('finance.earning.columns.btn2')}
            </RedeemBtn>
            <RenewalBtn loading={renewalLoading && currentOrderHash === obj.orderHash} onClick={() => handleRenewal(obj)} type="text">
              {t('finance.earning.columns.btn4')}
            </RenewalBtn>
          </Space>
        ) : (
          <Space style={{ display: 'flex', alignItems: 'flex-start' }}>
            <ReceiveEarningsBtn onClick={() => handleReceive(obj)}>{t('finance.earning.columns.btn3')}</ReceiveEarningsBtn>
            <RedeemBtn loading={redeemLoading && currentOrderHash === obj.orderHash} onClick={() => handleRedeemClick(obj)}>
              {t('finance.earning.columns.btn2')}
            </RedeemBtn>
          </Space>
        ),
    },
  ]

  const columnsAi: ColumnsType<EarningsTableTypes> = [
    {
      title: t('finance.earning.columns.ai.title2'),
      dataIndex: 'voting_rights',
      key: 'voting_rights',
      width: 240,
      align: 'center',
    },
    {
      title: t('finance.earning.columns.ai.title8'),
      dataIndex: 'nft_token_id',
      key: 'nft_token_id',
      align: 'center',
      width: 140,
    },
    {
      title: t('finance.earning.columns.ai.title9'),
      dataIndex: 'liquidites_amount',
      key: 'liquidites_amount',
      align: 'center',
      width: 140,
      render: (text) => <>{Number(text)}</>,
    },
    {
      title: t('finance.earning.columns.ai.title4'),
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
      width: 180,
    },
    {
      title: t('finance.earning.columns.ai.title7'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 180,
      fixed: windowSize.innerWidth > 1200 ? undefined : 'right',
      render: (text, obj) =>
        text ? (
          <RedeemBtnText type="text">{t('finance.earning.columns.btn1')}</RedeemBtnText>
        ) : (
          <RedeemBtn loading={redeemLoading && currentOrderHash === obj.orderHash} onClick={() => handleliquiditesRedeemClick(obj)}>
            {t('finance.earning.columns.btn2')}
          </RedeemBtn>
        ),
    },
  ]

  const handleItemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <PaginationBtn>{t('dao.delegate.prev')}</PaginationBtn>
    }
    if (type === 'next') {
      return <PaginationBtn>{t('dao.delegate.next')}</PaginationBtn>
    }
    return originalElement
  }

  const handleItemRenderH5: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <Icon component={LeftSvg} />
    }
    if (type === 'next') {
      return <Icon component={RigthSvg} />
    }
    return originalElement
  }

  const handlePaginationOnChange = (page: number, pageSize: number) => setEarnPage(page)
  const handlePaginationAiOnChange = (page: number, pageSize: number) => setEarnAiPage(page)

  return (
    <>
      <Row>
        <Col span={0} md={{ span: 24 }}>
          <EarningsInfoContent>
            <FinanceTitle>{t('finance.earning.title')}</FinanceTitle>
            {/* <FinanceSubtitle>{t('finance.earning.subtitle')}</FinanceSubtitle> */}
            <Table
              dataSource={earningList.filter((item) => item.token.toLowerCase() !== LiquidityStaking.toLowerCase())}
              loading={loading}
              columns={columns}
              locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('description')} /> }}
              pagination={{
                position: ['bottomCenter'],
                simple: true,
                defaultPageSize: 5,
                itemRender: windowSize.innerWidth <= Adapth5 ? handleItemRenderH5 : handleItemRender,
              }}
              className="earnings-table"
              bordered
              scroll={{ x: '100%' }}
            />
            <Row className="earn-bottom">
              <Col span={4} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle>{t('finance.earning.total')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={20} className="earn-bottom-rights">
                <EarningsInfoBottonNum>
                  {historyCount.totalStaticFinancialRevenue} {t('finance.earning.unit')}
                </EarningsInfoBottonNum>
              </Col>
            </Row>
          </EarningsInfoContent>
          <EarningsInfoContent>
            <FinanceTitle>{t('finance.earning.ai.title')}</FinanceTitle>
            <Table
              dataSource={earningList.filter((item) => item.token.toLowerCase() === LiquidityStaking.toLowerCase())}
              loading={loading}
              columns={columnsAi}
              locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('description')} /> }}
              pagination={{
                position: ['bottomCenter'],
                simple: true,
                defaultPageSize: 5,
                itemRender: windowSize.innerWidth <= Adapth5 ? handleItemRenderH5 : handleItemRender,
              }}
              className="earnings-table"
              bordered
              scroll={{ x: '100%' }}
            />
            <Row className="earn-bottom">
              <Col span={4} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle>{t('finance.earning.ai.general')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={20} className="earn-bottom-rights">
                <EarningsInfoBottonNum>{historyCount.totalLiquidityVotes}</EarningsInfoBottonNum>
              </Col>
              <Col span={4} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle>{t('finance.earning.total')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={20} className="earn-bottom-rights">
                <EarningsInfoBottonNum>
                  {historyCount.totalLiquidityRevenue} {t('finance.earning.unit')}
                </EarningsInfoBottonNum>
              </Col>
              <Col span={4} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle>{t('finance.receive.usd.title')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={20} className="earn-bottom-rights">
                <EarningsInfoBottonNum style={{ alignItems: 'center' }}>
                  {liquiditesCurrent} {t('finance.earning.unit')}
                  <AiReceiveButton loading={liquiditesReceiveLoading} type="primary" onClick={handleliquiditesReceiveClick}>
                    {t('finance.earning.btnsss')}
                  </AiReceiveButton>
                </EarningsInfoBottonNum>
              </Col>
            </Row>
          </EarningsInfoContent>
        </Col>
        <Col span={24} md={{ span: 0 }}>
          <EarningsInfoContent>
            <FinanceTitle style={{ fontSize: '0.88rem' }}>{t('finance.earning.title')}</FinanceTitle>
            {/* <FinanceSubtitle style={{ fontSize: '0.75rem' }}>{t('finance.earning.subtitle')}</FinanceSubtitle> */}
            <Row className="earn-bottom">
              <Col span={12} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle style={{ lineHeight: '1.81rem' }}>{t('finance.earning.total')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={12} className="earn-bottom-rights">
                <EarningsInfoBottonNum>
                  {historyCount.totalStaticFinancialRevenue} {t('finance.earning.unit')}
                </EarningsInfoBottonNum>
              </Col>
            </Row>
            {loading ? (
              <EarningH5Spin>
                <Spin tip={t('app.loading')} />
              </EarningH5Spin>
            ) : (
              <>
                {earningList.length === 0 ? (
                  <EarningsInfoTableH5No>
                    <p>{t('finance.earning.no.tips')}</p>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      {t('finance.earning.no.tips.link')}
                    </a>
                  </EarningsInfoTableH5No>
                ) : (
                  <EarningsInfoTableH5>
                    {earningList
                      .filter((item) => item.token.toLowerCase() !== LiquidityStaking.toLowerCase())
                      .filter((item, i) => i >= (earnPage - 1) * 3 && i < earnPage * 3)
                      .map((item, i) => (
                        <EarningsInfoTableH5Info key={i}>
                          <div className="item">
                            <h4>
                              {t('finance.types')}
                              <p>({item.currency})</p>
                            </h4>
                          </div>
                          <div className="item">
                            {item.status ? (
                              <Space>
                                <ReceiveEarningsBtn onClick={() => handleReceive(item)}>
                                  {t('finance.earning.columns.btn3')}
                                </ReceiveEarningsBtn>

                                <RedeemBtn
                                  loading={redeemLoading && currentOrderHash === item.orderHash}
                                  onClick={() => handleRedeemClick(item)}
                                >
                                  {t('finance.earning.columns.btn2')}
                                </RedeemBtn>
                                <RenewalBtn
                                  loading={renewalLoading && currentOrderHash === item.orderHash}
                                  onClick={() => handleRenewal(item)}
                                  type="text"
                                >
                                  {t('finance.earning.columns.btn4')}
                                </RenewalBtn>
                              </Space>
                            ) : (
                              <Space>
                                <ReceiveEarningsBtn onClick={() => handleReceive(item)}>
                                  {t('finance.earning.columns.btn3')}
                                </ReceiveEarningsBtn>
                                <RedeemBtn
                                  loading={redeemLoading && currentOrderHash === item.orderHash}
                                  onClick={() => handleRedeemClick(item)}
                                >
                                  {t('finance.earning.columns.btn2')}
                                </RedeemBtn>
                              </Space>
                            )}
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.title3')}</h4>
                            <p>{item.amount}</p>
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.title4')}</h4>
                            <p>{item.duration}</p>
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.title5')}</h4>
                            <p>{item.usd}</p>
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.title8')}</h4>
                            <p>{item.earnings_deadline}</p>
                          </div>
                          <div className="item"></div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.title6')}</h4>
                            <p>{item.gmd_token}</p>
                          </div>
                        </EarningsInfoTableH5Info>
                      ))}
                    {earningList.filter((item) => item.token.toLowerCase() !== LiquidityStaking.toLowerCase()).length > 0 && (
                      <div className="h5-pagination">
                        <Pagination
                          total={earningList.filter((item) => item.token.toLowerCase() !== LiquidityStaking.toLowerCase()).length}
                          defaultCurrent={earnPage}
                          current={earnPage}
                          defaultPageSize={3}
                          simple={true}
                          itemRender={handleItemRenderH5}
                          onChange={handlePaginationOnChange}
                        />
                      </div>
                    )}
                  </EarningsInfoTableH5>
                )}
              </>
            )}
          </EarningsInfoContent>
          <EarningsInfoContent>
            <FinanceTitle style={{ fontSize: '0.88rem' }}>{t('finance.earning.ai.title')}</FinanceTitle>
            {/* <Row className="earn-bottom">
            <Col span={12} className="earn-bottom-lefts">
              <EarningsInfoBottonTitle style={{ lineHeight: '1.81rem' }}>{t('finance.earning.total')}</EarningsInfoBottonTitle>
            </Col>
            <Col span={12} className="earn-bottom-rights">
              <EarningsInfoBottonNum>
                {historyCount.totalLiquidityRevenue} {t('finance.earning.unit')}
              </EarningsInfoBottonNum>
            </Col>
          </Row> */}
            <Row className="earn-bottom">
              <Col span={8} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle>{t('finance.earning.ai.general')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={16} className="earn-bottom-rights">
                <EarningsInfoBottonNum>{historyCount.totalLiquidityVotes}</EarningsInfoBottonNum>
              </Col>
              <Col span={8} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle>{t('finance.earning.total')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={16} className="earn-bottom-rights">
                <EarningsInfoBottonNum>
                  {historyCount.totalLiquidityRevenue} {t('finance.earning.unit')}
                </EarningsInfoBottonNum>
              </Col>
              <Col span={8} className="earn-bottom-lefts">
                <EarningsInfoBottonTitle>{t('finance.receive.usd.title')}</EarningsInfoBottonTitle>
              </Col>
              <Col span={16} className="earn-bottom-rights">
                <EarningsInfoBottonNum style={{ alignItems: 'flex-start' }}>
                  {liquiditesCurrent} {t('finance.earning.unit')}
                  <AiReceiveButton loading={liquiditesReceiveLoading} type="primary" onClick={handleliquiditesReceiveClick}>
                    {t('finance.earning.btnsss')}
                  </AiReceiveButton>
                </EarningsInfoBottonNum>
              </Col>
            </Row>
            {loading ? (
              <EarningH5Spin>
                <Spin tip={t('app.loading')} />
              </EarningH5Spin>
            ) : (
              <>
                {earningList.filter((item) => item.token.toLowerCase() === LiquidityStaking.toLowerCase()).length === 0 ? (
                  <EarningsInfoTableH5No>
                    <p>{t('finance.earning.no.tips')}</p>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      {t('finance.earning.no.tips.link')}
                    </a>
                  </EarningsInfoTableH5No>
                ) : (
                  <EarningsInfoTableH5>
                    {earningList
                      .filter((item) => item.token.toLowerCase() === LiquidityStaking.toLowerCase())
                      .filter((item, i) => i >= (earnAiPage - 1) * 3 && i < earnAiPage * 3)
                      .map((item, i) => (
                        <EarningsInfoTableH5Info key={i}>
                          <div className="item">{/* <h4>{t('finance.types')}</h4> */}</div>
                          <div className="item">
                            {item.status ? (
                              <Space>
                                <RedeemBtnText type="text">{t('finance.earning.columns.btn1')}</RedeemBtnText>
                              </Space>
                            ) : (
                              <Space>
                                <RedeemBtn
                                  loading={redeemLoading && currentOrderHash === item.orderHash}
                                  onClick={() => handleRedeemClick(item)}
                                >
                                  {t('finance.earning.columns.btn2')}
                                </RedeemBtn>
                              </Space>
                            )}
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.ai.title2')}</h4>
                            <p>{item.voting_rights}</p>
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.ai.title9')}</h4>
                            <p>{item.liquidites_amount}</p>
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.ai.title8')}</h4>
                            <p>{item.nft_token_id}</p>
                          </div>
                          <div className="item">
                            <h4>{t('finance.earning.columns.ai.title4')}</h4>
                            <p>{item.duration}</p>
                          </div>
                        </EarningsInfoTableH5Info>
                      ))}
                    {earningList.filter((item) => item.token.toLowerCase() === LiquidityStaking.toLowerCase()).length > 0 && (
                      <div className="h5-pagination">
                        <Pagination
                          total={earningList.filter((item) => item.token.toLowerCase() === LiquidityStaking.toLowerCase()).length}
                          defaultCurrent={earnAiPage}
                          current={earnAiPage}
                          defaultPageSize={3}
                          simple={true}
                          itemRender={handleItemRenderH5}
                          onChange={handlePaginationAiOnChange}
                        />
                      </div>
                    )}
                  </EarningsInfoTableH5>
                )}
              </>
            )}
          </EarningsInfoContent>
        </Col>
      </Row>
      <ModalReceive
        type={type}
        balance={currentUsd}
        show={show}
        setShow={(s) => (s ? void setShow.setTrue() : void setShow.setFalse())}
        setIsRefresh={() => void setIsRefresh.toggle()}
        loading={type === '2' ? receiveLoading : liquiditesReceiveLoading}
        clickBtn={() => {
          if (type === '2') {
            void setReceiveLoading.setTrue()
            handleReceiveImplement({ orderHash: currentOrderHash as any })
          } else {
            void setlLiquiditesReceiveLoading.setTrue()
            handleliquiditesReceiveImplement()
          }
        }}
      />
    </>
  )
}

export default EarningsInfoPage
