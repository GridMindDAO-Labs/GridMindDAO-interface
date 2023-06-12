import { useCallback, useEffect, useState } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import BigNumber from 'bignumber.js'

export type UsersTypes = {
  communityLevel: string
  earned: string
  hasStaked: boolean
  invitedUsers: string
  lastTeamPerformance: string
  lastUpdateTime: string
  liquidity: string
  periodFinish: string
  referrer: string
  stakedAmount: string
  teamPerformance: string
  value: string
  valueWei: string
}

const UsersInit: UsersTypes = {
  communityLevel: '0',
  earned: '0',
  hasStaked: false,
  invitedUsers: '0',
  lastTeamPerformance: '0',
  lastUpdateTime: '0',
  liquidity: '0',
  periodFinish: '0',
  referrer: '0',
  stakedAmount: '',
  teamPerformance: '0',
  value: '0',
  valueWei: '0',
}

export function useUserInfoHooks({ account }: { account: string | undefined }) {
  const { constant, web3, fromWeiPowBanlance, toWeiPowBanlance } = useDataHooks().data

  const [minUsdAmount, setMinUsdAmount] = useState<number>(10)
  const [users, setUsers] = useState<UsersTypes>(UsersInit)
  const [currentAdditiveRate, setCurrentAdditiveRate] = useState<string>('0.00')

  const userss = useCallback(async () => {
    if (!account) return
    let usersInfo = await constant.ContractInvitationRewards.methods.users(account).call()
    usersInfo.teamPerformance = fromWeiPowBanlance({ decimals: '18', balance: usersInfo.teamPerformance })
    usersInfo.valueWei = fromWeiPowBanlance({ decimals: '18', balance: usersInfo.value })
    setUsers(usersInfo)
  }, [account, constant.ContractInvitationRewards.methods, fromWeiPowBanlance])
  useEffect(() => {
    userss()
  }, [userss])

  useEffect(() => {
    getMinUsdAmount()
  }, [])

  useEffect(() => {
    if (Number(users.communityLevel) > 0) getCurrentAdditiveRate()
    else setCurrentAdditiveRate('0.00')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, userss])

  const getCurrentAdditiveRate = async () => {
    try {
      // console.log('')
      // console.log('')
      // console.log('-------------')
      // console.log('users.communityLevel',users.communityLevel)
      let maxRates = await constant.ContractInvitationRewards.methods
        .rewardPercentageLimits(new BigNumber(users.communityLevel).minus(1).toString())
        .call()
      let maxRate = new BigNumber(maxRates).div(10000).toNumber()
      // console.log('maxRate',maxRate)
      let rate = await constant.ContractInvitationRewards.methods.rate().call()
      // console.log('rate',rate)
      let maxAmount = toWeiPowBanlance({ decimals: '18', balance: new BigNumber(rate).times(100).times(maxRate).toString() })
      let valuesWei = web3.utils.fromWei(users.value)
      let maxAmountWei = web3.utils.fromWei(maxAmount)
      // console.log('maxAmount',maxAmount)
      // console.log('users.value <= maxAmount',Number(valuesWei) <= Number(maxAmountWei), 'users.value', users.value,
      // 'maxAmount',maxAmount)
      // console.log('valuesWei',valuesWei)
      // console.log('maxAmountWei',maxAmountWei)
      let lv =
        Number(valuesWei) <= Number(maxAmountWei)
          ? new BigNumber(users.value).div(toWeiPowBanlance({ decimals: '18', balance: new BigNumber(rate).toString() })).toString()
          : (Math.floor(Number(maxRate) * 10000) / 100).toString()
      lv = (Math.floor(Number(lv) * 100) / 100).toString()
      // console.log('currentRate', lv)
      // console.log('-------------')
      // console.log('')
      // console.log('')
      setCurrentAdditiveRate(lv)
    } catch (error) {
      setCurrentAdditiveRate('0.00')
      console.log('err', error)
    }
  }

  const getMinUsdAmount = async () => {
    try {
      let minStaking = await constant.ContractFinancing.methods.minStaking().call()
      let minStakings = fromWeiPowBanlance({ decimals: '18', balance: minStaking })
      setMinUsdAmount(Number(minStakings))
    } catch (error) {}
  }

  return { users, currentAdditiveRate, minUsdAmount }
}
