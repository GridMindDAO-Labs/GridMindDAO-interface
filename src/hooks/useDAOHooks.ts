import { useBoolean } from 'ahooks'
import { useEffect, useState } from 'react'
import { ProposalsListTyps } from '@/hooks/useProposalsHooks'
import { getAxiosDelegatesList, getAxiosVotes1, getAxiosVotes2 } from '@/subgraphs/dao'
import BigNumber from 'bignumber.js'
import { unique } from '@/utils'
import { dataIntegerHandling } from '@/common'
import useDataHooks from '@/hooks/useDataHooks'

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

interface Types {
  isActive: boolean
  account: string | undefined
  isRefresh: boolean
}

export const useDAOHooks = ({ isActive, account, isRefresh }: Types) => {
  const { fromWeiPowBanlance } = useDataHooks().data

  const [loading, setLoading] = useBoolean(false)
  const [delegatesList, setDelegatesList] = useState<DelegatesListTypes[]>([])

  useEffect(() => {
    setDelegatesList([])
    if (isActive && account) getDelegatesList()
    return () => {
      setDelegatesList([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, account, isRefresh])

  const getDelegatesList = async () => {
    void setLoading.setTrue()
    try {
      const promise = await Promise.all([getAxiosDelegatesList()])
        .then((res) => {
          const { GMDCount, delegatesLists } = res[0]
          let totalVotes = Number(
            new BigNumber(GMDCount?.totalLiquidityValidNewVotes || 0).minus(GMDCount?.totalLiquidityValidNOldVotes || 0),
          ).toString()

          return {
            delegatesLists: delegatesLists.filter((item) => item.totalVotes !== '0'),
            totalVotes: dataIntegerHandling(Number(fromWeiPowBanlance({ decimals: '18', balance: totalVotes }))),
          }
        })
        .then((res) => {
          let votingRecords = res.delegatesLists.map(async (item) => {
            const { votingRecords1 } = await getAxiosVotes1({ account: item.account }),
              { votingRecords2 } = await getAxiosVotes2({ account: item.account })
            return await {
              account: item.account,
              list: unique([...votingRecords1, ...votingRecords2], 'proposalId'),
            }
          })
          return {
            ...res,
            votingRecords,
          }
        })
        .then((res) => {
          return {
            list: res.delegatesLists.map((item, i) => {
              item.totalVotes = dataIntegerHandling(Number(fromWeiPowBanlance({ decimals: '18', balance: item.totalVotes })))
              let voteWeight = res.totalVotes === '0' ? new BigNumber(0) : new BigNumber(item.totalVotes).div(res.totalVotes).times(100)
              return {
                key: i.toString(),
                id: item.id,
                rankAddress: item.account,
                proposalsVoted: '0',
                totalVotes: item.totalVotes.toString(),
                voteWeight: voteWeight.toFixed(3),
                isDelegates: item.account.toLowerCase() === account?.toLowerCase() ? false : true,
              }
            }),
            votingRecords: res.votingRecords,
          }
        })
      for (let i = 0; i < promise.list.length; i++) {
        let item = promise.list[i],
          votingRecords = await Promise.all(promise.votingRecords)
        let lists = votingRecords.find((items) => items.account.toLowerCase() === item.id?.toLowerCase())?.list || []
        item.proposalsVoted = lists.length.toString()
      }
      console.log('list', promise.list)
      setDelegatesList(promise.list)
      void setLoading.setFalse()
    } catch (error) {
      console.log(error)
      void setLoading.setFalse()
    }
  }

  return { delegatesList, loading }
}
