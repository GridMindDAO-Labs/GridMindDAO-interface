import { useBoolean } from 'ahooks'
import { useEffect, useState } from 'react'
import { RateUpdatedTypes } from '@/subgraphs/type'
import { getAxiosCurrentInterestRate, getAxiosFinanceTimeList } from '@/subgraphs/finance'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import moment from 'moment'
import { TimesDatas } from '@/utils'

export interface FinanceTimeListTypes {
  times: string
  value: string | number
}

interface Types {
  onShow: boolean
  isActive: boolean
  account: string | undefined
  period: 'Week' | 'Month' | 'Year'
  currentToken: string
}

export const useFinanceHooks = ({ isActive, onShow, account, period, currentToken }: Types) => {
  const dataInit: DataTypes = useDataHooks()
  const { fromWeiPowBanlance } = dataInit.data
  const [financeTimeList, setFinanceTimeList] = useState<FinanceTimeListTypes[]>([])
  const [loading, setLoading] = useBoolean(false)
  const [currentInterestRate, setCurrentInterestRate] = useState<RateUpdatedTypes[]>([])

  useEffect(() => {
    setFinanceTimeList([])
    if (onShow) getFinanceTimeList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isActive, period, onShow, currentToken])

  useEffect(() => {
    getCurrentInterestRate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFinanceTimeList = async () => {
    void setLoading.setTrue()
    try {
      console.log('currentToken', currentToken)
      const { currentRate } = await getAxiosFinanceTimeList({
        token: currentToken,
      })
      const lists = setCalculateData({ list: currentRate })
      let list = lists.map((item) => {
        let newRate = fromWeiPowBanlance({ balance: item.value, decimals: '18' })
        let s = (Math.floor(Number(newRate) * 10000) / 100).toFixed(2)
        return {
          times: item.times,
          value: Number(s).toString(),
        }
      })

      setFinanceTimeList(list)
      void setLoading.setFalse()
    } catch (error) {
      void setLoading.setFalse()
    }
  }

  const getCurrentInterestRate = async () => {
    try {
      const { currentRate } = await getAxiosCurrentInterestRate()
      // console.log('currentRate', currentRate)
      let list: RateUpdatedTypes[] = []
      for (let i = 0; i < currentRate.length; i++) {
        const element = currentRate[i]
        let newRate = fromWeiPowBanlance({ balance: element.newRate, decimals: '18' })
        let s = (Math.floor(Number(newRate) * 10000) / 100).toFixed(2)
        list.push({
          ...element,
          newRate: Number(s).toString(),
        })
      }
      console.log('currentRatelist', list)
      setCurrentInterestRate(list)
    } catch (error) {}
  }

  const setCalculateData = ({ list }: { list: RateUpdatedTypes[] }): { times: string; value: string }[] => {
    try {
      let isNoTrue = false
      list.sort((a, b) => Number(a.date) - Number(b.date))
      let days = period === 'Week' ? 7 : period === 'Month' ? 90 : 365
      let OldestTimes = moment().subtract(days, 'days').format('X')
      let listFilter = list.filter((item) => Number(item.date) >= Number(OldestTimes))
      if (listFilter.length === 0 && list.length !== 0) {
        listFilter = list.filter((item, i) => i === list.length - 1)
        isNoTrue = true
      }
      console.log('listFilter', listFilter)
      let times = listFilter.map((item) => moment.unix(item.date as any).format('YYYY-MM-DD'))
      times.push(moment().format('YYYY-MM-DD'))
      const newArr = Array.from(new Set(times))
      let resultTimes = TimesDatas(newArr)
      let newLists: { times: string; value: string }[] = []
      resultTimes.forEach((item) => {
        let newRate =
          listFilter.find((ite) => {
            let dates = moment.unix(ite.date as any).format('YYYY-MM-DD')
            if (Number(moment(dates).format('X')) === Number(moment(item).format('X'))) {
              return true
            } else return false
          })?.newRate || '0'
        newLists.push({
          times: item,
          value: newRate,
        })
      })
      newLists.forEach((element) => {
        if (element.value === '0') {
          let values = newLists.find((item) => item.value !== '0')?.value || '0'
          element.value = values
        }
      })
      if (isNoTrue) return newLists.slice(newLists.length - days, newLists.length)
      return newLists
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return { loading, financeTimeList, currentInterestRate }
}
