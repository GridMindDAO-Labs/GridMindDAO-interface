import { useEffect, useState } from 'react'
import { getAxiosWeekTotals } from '@/subgraphs/market'
import { CommunityList } from '@/pages/Market/components/LeaderBoard'
import useDataHooks from './useDataHooks'
import BigNumber from 'bignumber.js'

export type ScopePeriodTypes = {
  key: number
  value: string
  min: number
  max: number
}

export type WeekCountTypes = {
  endAt: string
  id: string | undefined
  startAt: string
  totalRankingRewards: string
  weekType: string
  startBlock: string
  endBlock: string
}

type Types = {
  currentWeekId: string | undefined
  currentCommunity: string | undefined
}

export type LeaderBoardListTypes = {
  key: number
  weekType: string
  rankingRewards: string
  inviter: string
  id: string
  currentCommunity: string
  createAt: string
  amount: string
  account: string
}

const WeekCountInit: WeekCountTypes = {
  endAt: '0',
  id: undefined,
  startAt: '0',
  totalRankingRewards: '0',
  weekType: '0',
  startBlock: '0',
  endBlock: '0',
}

type TotalAwardTypes = {
  primary: number
  intermediate: number
  advanced: number
}

let TotalAwardInit: TotalAwardTypes = {
  primary: 0,
  intermediate: 0,
  advanced: 0,
}

export function useLeaderBoardHooks({ currentWeekId, currentCommunity, isRefresh }: Types & { isRefresh: boolean }) {
  const [scopePeriod, setScopePeriod] = useState<ScopePeriodTypes[]>([])
  const [listPeriod, setListPeriod] = useState<ScopePeriodTypes[]>([])
  const [weekCount, setWeekCount] = useState<WeekCountTypes>(WeekCountInit)
  const [leaderBoardList, setLeaderBoardList] = useState<LeaderBoardListTypes[]>([])
  const [totalLoading, setTotalLoading] = useState<boolean>(false)

  const { fromWeiPowBanlances } = useDataHooks().data

  const [totalAward, setTotalAward] = useState<TotalAwardTypes>(TotalAwardInit)

  useEffect(() => {
    setWeekCount(WeekCountInit)
    setLeaderBoardList([])
    getTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh, currentWeekId, currentCommunity])

  const getTotal = async () => {
    setTotalLoading(true)
    const { total, weekCount, childLists } = await getAxiosWeekTotals({
      currentWeekId,
      currentCommunity,
      currentWeekIds: currentWeekId ? (Number(currentWeekId) - 1).toString() : '0',
    })
    if (total) getPeriod(total.toString())
    if (weekCount) setWeekCount(weekCount)
    if (childLists) getChildLists(childLists)
    setTimeout(() => {
      setTotalLoading(false)
    }, 100)
  }

  const getChildLists = (childLists: any[]) => {
    let list: LeaderBoardListTypes[] = []
    for (let i = 0; i < childLists.length; i++) {
      const element = childLists[i]
      list.push({
        key: i,
        ...element,
      })
    }
    let lpTotalPeople = CommunityList.find((c) => c.value === currentCommunity)?.lpTotalPeople || 0
    let lists = list.filter((lt, is) => is < lpTotalPeople)
    let total =
      lists.length === 0
        ? 0
        : lists
            .map((lt) => {
              let num = fromWeiPowBanlances({ decimals: '18', balance: lt.amount })
              return Number(num)
            })
            .reduce((a, b) => a + b)
    let type: 'primary' | 'intermediate' | 'advanced' =
      currentCommunity === '2' ? 'primary' : currentCommunity === '3' ? 'intermediate' : 'advanced'
    getTotalAwards(total, type)

    setLeaderBoardList(list)
  }

  const getTotalAwards = (total: number, type: 'primary' | 'intermediate' | 'advanced') =>
    setTotalAward(() => {
      return {
        ...TotalAwardInit,
        [type]: total,
      }
    })

  const getPeriod = (total: string) => {
    let totals = Number(total)
    if (totals === 0) return
    let scopePeriods: ScopePeriodTypes[] = [],
      listPeriods: ScopePeriodTypes[] = []
    for (let i = 1; i <= Math.ceil(totals / 30); i++) {
      let label = i * 30 > totals ? { min: (i - 1) * 30 + 1, max: totals } : { min: (i - 1) * 30 + 1, max: i * 30 }
      scopePeriods.push({
        key: i,
        value: i.toString(),
        ...label,
      })
    }
    for (let i = 1; i <= totals; i++) {
      listPeriods.push({
        key: i,
        value: i.toString(),
        min: 0,
        max: i,
      })
    }
    setListPeriod(listPeriods)
    setScopePeriod(scopePeriods)
  }

  return { scopePeriod, listPeriod, isLoading: totalLoading, weekCount, leaderBoardList, totalAward }
}
