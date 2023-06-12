import { useEffect, useState } from 'react'
import { UserInviteeListTypes } from '@/subgraphs/type.d'
import { getAxiosInviteUsersList } from '@/subgraphs/invite'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import moment from 'moment'
import { useBoolean } from 'ahooks'
import BigNumber from 'bignumber.js'

interface Types {
  account: string | undefined
  isRefresh: boolean
}

export const useMarketHooks = ({ account, isRefresh }: Types) => {
  const dataInit: DataTypes = useDataHooks()
  const { fromWeiPowBanlance, fromWeiPowBanlances, constant } = dataInit.data

  const [list, setList] = useState<UserInviteeListTypes[]>([])
  const [loading, setLoading] = useBoolean(false)
  const [earned, setEarned] = useState<string>('0')
  const [earnedTotal, setEarnedTotal] = useState<string>('0')

  useEffect(() => {
    if (account) getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isRefresh])

  const getUsers = async () => {
    try {
      void setLoading.setTrue()
      const earneds = await constant.ContractInvitationRewards.methods.earned(account).call()
      const { userInviteeList, invitationTotal } = await getAxiosInviteUsersList({ account: account as string })
      console.log('userInviteeList', userInviteeList)
      console.log('earneds', earneds, invitationTotal)
      let total = fromWeiPowBanlances({ decimals: '18', balance: new BigNumber(invitationTotal).plus(earneds).toString() })
      let currentEarn = fromWeiPowBanlances({ decimals: '18', balance: earneds })
      setEarnedTotal(total)
      setEarned(currentEarn)
      let lists: UserInviteeListTypes[] = []
      for (let i = 0; i < userInviteeList.length; i++) {
        const element = userInviteeList[i]
        element.amount = fromWeiPowBanlance({ decimals: '18', balance: element.amount })
        //  HH:mm:ss
        element.createAt = moment.unix(Number(element.createAt)).format('YYYY/MM/DD')
        lists.push(element)
      }
      setList(lists)
      void setLoading.setFalse()
    } catch (error) {
      void setLoading.setFalse()
    }
  }

  return { list, loading, earned, earnedTotal }
}
