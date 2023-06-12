import { useEffect, useState } from 'react'
import { Button, Spin, Table, Empty, Tooltip } from 'antd'
import type { PaginationProps } from 'antd'
import Icon from '@ant-design/icons'
import { RightIconSvg } from '@/pages/Market/icon'
import {
  SelectGrid,
  LeaderBoardWrapper,
  LeaderBoardH5Title,
  LeaderBoardWebTitle,
  LeaderBoardContent,
  SelectDiv,
  LeaderBoardGrid,
  SelectTitle,
} from '@/pages/Market/styled'
import type { ColumnsType } from 'antd/es/table'
import { useLeaderBoardHooks } from '@/hooks/useLeaderBoardHooks'
import { REACT_APP_ENV } from '@/contracts/chains'

import SelectExpect from './SelectExpect'
import moment from 'moment'
import useDataHooks from '@/hooks/useDataHooks'
import { useTranslation } from 'react-i18next'
import { PaginationBtn } from '@/pages/DAO/styled'
import { LeftSvg, RigthSvg } from '@/pages/DAO/icon'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import type { LeaderBoardListTypes } from '@/hooks/useLeaderBoardHooks'
import { Adapth5, formatStrAddress } from '@/utils'
import { useNavigate, useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { dataIntegerHandling6 } from '@/common'

type Types = {
  isH5?: boolean
  isRefresh: boolean
  returnss: () => void
}

type CommunityListType = {
  value: string
  label: string
  key: string
  lpTotalPeople: number
  lpRadio: number
}

export const CommunityList: CommunityListType[] = [
  { key: '0', value: '2', label: 'market.community.title1', lpTotalPeople: 20, lpRadio: 0.5 },
  { key: '1', value: '3', label: 'market.community.title2', lpTotalPeople: 10, lpRadio: 0.3 },
  { key: '2', value: '4', label: 'market.community.title3', lpTotalPeople: 5, lpRadio: 0.2 },
]

const LeaderBoard = ({ isH5 = false, isRefresh, returnss }: Types) => {
  let navigate = useNavigate()
  const { windowSize } = useWindowSizeHooks()
  const { t } = useTranslation()
  const { fromWeiPowBanlance, fromWeiPowBanlances } = useDataHooks().data
  const [weekId, setWeekId] = useState<string | undefined>(undefined)
  const [currentWeekId, setCurrentWeekId] = useState<string | undefined>(undefined)
  const [currentCommunity, setCurrentCommunity] = useState<string>(CommunityList[0].value)
  const params: any = useParams()

  const { isLoading, listPeriod, scopePeriod, weekCount, leaderBoardList, totalAward } = useLeaderBoardHooks({
    currentWeekId,
    currentCommunity,
    isRefresh,
  })

  useEffect(() => {
    console.log('totalAward', totalAward)
  }, [totalAward])

  useEffect(() => {
    getInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, windowSize.innerWidth, isRefresh])

  useEffect(() => {
    if (listPeriod.length > 0 && scopePeriod.length > 0) getInitSet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPeriod, scopePeriod])

  const getInitSet = () => {
    if (weekId === undefined && currentWeekId === undefined) {
      setWeekId(scopePeriod[scopePeriod.length - 1].value)
      setCurrentWeekId(listPeriod[listPeriod.length - 1].value)
    }
  }

  const getInit = () => {
    if (params?.weekId) {
      setWeekId(params.weekId)
      setCurrentCommunity(CommunityList[0].value)
      if (params?.currentWeekId) setCurrentWeekId(params.currentWeekId)
    } else {
      setWeekId(undefined)
      setCurrentCommunity(CommunityList[0].value)
      setCurrentWeekId(undefined)
    }
  }

  const columns: ColumnsType<LeaderBoardListTypes> = [
    {
      title: t('market.leader.columns.title1'),
      dataIndex: 'key',
      key: 'key',
      width: 120,
      render: (key) => <>{key + 1}</>,
    },
    {
      title: t('market.leader.columns.title2'),
      dataIndex: 'account',
      key: 'account',
      width: 140,
      render: (text) => (
        <Tooltip title={text}>{windowSize.innerWidth >= Adapth5 ? formatStrAddress(6, 4, text) : formatStrAddress(2, 4, text)}</Tooltip>
      ),
    },
    {
      title: t('market.leader.columns.title3'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: windowSize.innerWidth <= Adapth5 ? 180 : 140,
      render: (text) => <>{fromWeiPowBanlance({ balance: text, decimals: '18' })} GMD</>,
    },
    {
      title: t('market.leader.columns.title4'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 140,
      render: (text, record) => {
        let lpTotalPeople = CommunityList.find((item) => item.value === currentCommunity)?.lpTotalPeople || 0
        if (record.key < lpTotalPeople) {
          let balance = fromWeiPowBanlances({ balance: text, decimals: '18' })
          let type: 'primary' | 'intermediate' | 'advanced' =
              currentCommunity === '2' ? 'primary' : currentCommunity === '3' ? 'intermediate' : 'advanced',
            lps = new BigNumber(balance).div(totalAward[type]).toNumber(),
            lpRadio = CommunityList.find((item) => item.value === currentCommunity)?.lpRadio || 0
          let total = dataIntegerHandling6(fromWeiPowBanlances({ balance: weekCount.totalRankingRewards, decimals: '18' })),
            lpTotal = new BigNumber(total).times(lpRadio).toNumber()
          let lpss = new BigNumber(lpTotal).times(lps).toString()
          return <>{dataIntegerHandling6(lpss)} GMD</>
        }
        return '-'
      },
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

  return (
    <LeaderBoardWrapper>
      {isH5 ? (
        <LeaderBoardH5Title>
          <div onClick={returnss}>{t('market.leader.h5.title1')}</div>
          <Icon component={RightIconSvg} />
          <span>{t('market.leader.title')}</span>
        </LeaderBoardH5Title>
      ) : (
        <LeaderBoardWebTitle>{t('market.leader.title')}</LeaderBoardWebTitle>
      )}
      <LeaderBoardContent>
        <SelectDiv>
          <SelectTitle>{t('market.leader.select.title1')}</SelectTitle>
          <SelectGrid>
            <SelectExpect
              list={scopePeriod}
              value={weekId}
              type="Period"
              returnClick={(s) => {
                setWeekId(s)
                setCurrentWeekId(undefined)
                navigate(`/market/${s}`, { replace: true })
              }}
            />
            <SelectExpect
              list={listPeriod.filter((it) => it.key >= (Number(weekId) - 1) * 30 + 1 && it.key <= Number(weekId) * 30)}
              value={currentWeekId}
              type="Community"
              returnClick={(s) => {
                setCurrentWeekId(s)
                navigate(`/market/${weekId}/${s}`, { replace: true })
              }}
            />
          </SelectGrid>
          <Spin spinning={isLoading}>
            <>
              {weekCount.id && currentWeekId ? (
                <>
                  <SelectTitle style={{ color: '#999999' }}>{t('market.leader.select.title2')}</SelectTitle>
                  <div className="times">
                    {REACT_APP_ENV !== 'prd' && (
                      <>
                        {moment.unix(Number(weekCount.startAt)).format('YYYY.MM.DD HH:mm:ss')}~
                        {moment.unix(Number(weekCount.endAt)).format('YYYY.MM.DD HH:mm:ss')}
                        <div>-----------</div>
                      </>
                    )}
                    {weekCount.startBlock}~{weekCount.endBlock}
                  </div>
                </>
              ) : (
                <>
                  <SelectTitle style={{ color: '#999999' }}>{t('market.leader.select.title2')}</SelectTitle>
                  <div className="times">-</div>
                </>
              )}
              <SelectTitle>
                <span>{t('market.leader.select.title3')}</span>
              </SelectTitle>
              <div className="total">
                {weekCount.id && currentWeekId
                  ? dataIntegerHandling6(fromWeiPowBanlances({ balance: weekCount.totalRankingRewards, decimals: '18' }))
                  : 0.0}{' '}
                GMD
              </div>
            </>
          </Spin>
        </SelectDiv>
        <LeaderBoardGrid>
          <div className="tabbars">
            {CommunityList.map((ct, i) => (
              <Button className={currentCommunity === ct.value ? 'active' : ''} onClick={() => setCurrentCommunity(ct.value)} key={i}>
                {t(ct.label)}
              </Button>
            ))}
          </div>
          <Table
            dataSource={leaderBoardList}
            loading={isLoading}
            columns={columns}
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('description')} /> }}
            pagination={{
              position: ['bottomCenter'],
              simple: true,
              defaultPageSize: 10,
              itemRender: windowSize.innerWidth <= Adapth5 ? handleItemRenderH5 : handleItemRender,
            }}
            className="leader-table"
            scroll={{ x: '100%' }}
          />
        </LeaderBoardGrid>
      </LeaderBoardContent>
    </LeaderBoardWrapper>
  )
}

export default LeaderBoard
