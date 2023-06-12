import { useBoolean } from 'ahooks'
import { useEffect, useState } from 'react'
import { ProposalsListTyps } from '@/hooks/useProposalsHooks'
import { getAxiosDelegatesList } from '@/subgraphs/dao'
import BigNumber from 'bignumber.js'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { dataIntegerHandling } from '@/common'

export interface ProfileListTypes {
  value: string
  label: string
}

export interface DelegatesListTypes {
  key?: string | undefined
  id?: string | undefined
  rankAddress: string
  proposalsVoted: string
  voteWeight: string
  totalVotes: string
  isDelegates: boolean
  votingHistory?: ProposalsListTyps[]
  liquidityStakeAiToken?: string
  entrustedTotal?: string
}

export const votingListState = ['Wait', 'Active', 'Canceled', 'Failed', 'Passed', 'Queued', 'Expired', 'Executed']

const ProfileListInit: ProfileListTypes[] = [
  { label: 'Wallet votes', value: '0' },
  { label: 'Received votes', value: '0' },
  { label: 'Total votes', value: '0' },
  { label: 'Proportion of voting rights', value: '0.000' },
]

interface Types {
  isActive: boolean
  account: string | undefined
  isRefresh: boolean
}

export const useAccountDetails = ({ isActive, account, isRefresh }: Types) => {
  const dataInit: DataTypes = useDataHooks()
  const { fromWeiPowBanlance } = dataInit.data

  const [profileList, setProfileList] = useState<ProfileListTypes[]>(ProfileListInit)
  const [loading, setLoading] = useBoolean(false)

  useEffect(() => {
    setProfileList(ProfileListInit)
    if (isActive && account) getDelegatesList()
    return () => {
      setProfileList(ProfileListInit)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, account, isRefresh])

  const getDelegatesList = async () => {
    void setLoading.setTrue()
    try {
      const { GMDCount, delegatesLists } = await getAxiosDelegatesList()

      let totalVotes = Number(
        new BigNumber(GMDCount?.totalLiquidityValidNewVotes || 0).minus(GMDCount?.totalLiquidityValidNOldVotes || 0),
      ).toString()
      totalVotes = dataIntegerHandling(Number(fromWeiPowBanlance({ decimals: '18', balance: totalVotes })))
      let ownDelegatesDetails = delegatesLists.find((item) => item.account.toLowerCase() === account?.toLowerCase())
      if (ownDelegatesDetails) {
        ownDelegatesDetails.totalVotes = Math.floor(
          Number(fromWeiPowBanlance({ decimals: '18', balance: ownDelegatesDetails.totalVotes })),
        ).toString()
        ownDelegatesDetails.walletVotes = Math.floor(
          Number(fromWeiPowBanlance({ decimals: '18', balance: ownDelegatesDetails.walletVotes })),
        ).toString()
        setProfileList([
          { label: 'Wallet votes', value: ownDelegatesDetails.walletVotes },
          {
            label: 'Received votes',
            value: new BigNumber(ownDelegatesDetails.totalVotes).minus(ownDelegatesDetails.walletVotes).toString(),
          },
          { label: 'Total votes', value: ownDelegatesDetails.totalVotes },
          {
            label: 'Proportion of voting rights',
            value: totalVotes === '0' ? '0.000' : new BigNumber(ownDelegatesDetails.totalVotes).div(totalVotes).times(100).toFixed(3),
          },
        ])
      }
      void setLoading.setFalse()
    } catch (error) {
      console.log(error)
      void setLoading.setFalse()
    }
  }

  return { profileList, loading }
}
