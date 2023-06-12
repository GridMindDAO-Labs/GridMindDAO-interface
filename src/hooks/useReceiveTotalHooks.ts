import { useBoolean } from 'ahooks'
import { useEffect, useState } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import { getOrderLatestTime } from '@/subgraphs/invite'
import moment from 'moment'

export interface UserInfoRewardsTypes {
  account: string | undefined
  balance: string
  startTime: string
  timestamp: string
}

const UserInfoRewardsInit: UserInfoRewardsTypes = {
  account: '',
  balance: '0',
  startTime: '',
  timestamp: '',
}

interface Types {
  account: string | undefined
  isRefresh: boolean
}

export const useReceiveTotalHooks = ({ account, isRefresh }: Types) => {
  const { fromWeiPowBanlance, constant, StakingRewards_Address } = useDataHooks().data

  const [total, setTotal] = useState<string>('0')
  const [userInfoLoading, setUserInfoLoading] = useBoolean(false)
  const [totalTimes, setTotalTimes] = useState<string>('-')
  const [userInfoRewards, setUserInfoRewards] = useState<UserInfoRewardsTypes>(UserInfoRewardsInit)

  useEffect(() => {
    setUserInfoRewards(UserInfoRewardsInit)
    getTotal()
    getTotalTimes()
    if (account) getUserinfoRewards()
    return () => {
      setUserInfoRewards(UserInfoRewardsInit)
      setTotal('0')
      setTotalTimes('-')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isRefresh])

  const getTotalTimes = async () => {
    try {
      let periodFinish = await constant.ContractStakingRewards.methods.periodFinish().call()
      let times = Number(periodFinish) === 0 ? '-' : moment.unix(Number(periodFinish)).format('YYYY/MM/DD HH:mm:ss')
      setTotalTimes(times)
      console.log('periodFinish', periodFinish)
    } catch (error) {
      setTotalTimes('-')
    }
  }

  const getTotal = async () => {
    try {
      let totalBalanceOf = await constant.ContractGMDToken.methods.balanceOf(StakingRewards_Address).call()
      setTotal(() => fromWeiPowBanlance({ decimals: '18', balance: totalBalanceOf }))
    } catch (error) {}
  }

  const getUserinfoRewards = async () => {
    try {
      void setUserInfoLoading.setTrue()
      let earneds = await constant.ContractStakingRewards.methods.earned(account).call()
      let { latestAt } = await getOrderLatestTime({ account: account as string })
      setUserInfoRewards({
        account,
        balance: fromWeiPowBanlance({ decimals: '18', balance: earneds }),
        startTime: latestAt === '0' ? '' : moment.unix(Number(latestAt)).format('YYYY/MM/DD HH:mm:ss'),
        timestamp: latestAt === '0' ? '' : latestAt,
      })
      void setUserInfoLoading.setFalse()
    } catch (error) {
      void setUserInfoLoading.setFalse()
    }
  }

  return { userInfoRewards, userInfoLoading, total, totalTimes }
}
