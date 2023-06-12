import { useState, useEffect } from 'react'
import { useBoolean } from 'ahooks'
import useDataHooks from '@/hooks/useDataHooks'
import { getAxiosProposalsList } from '@/subgraphs/dao'
import { getAwsIpfsDetailsJson } from '@/common'
import type { AwsStorageClientTypes } from '@/contracts/aws'
import useAwsHooks from '@/hooks/useAwsHooks'
import BigNumber from 'bignumber.js'

export interface ForAgainstVotersTypes {
  support?: boolean
  voter: string
  weight: string
}

export interface ProposalsListTyps {
  key?: string | undefined
  id?: string | undefined
  ProposalsId: string
  title: string
  againstVotes?: any
  favorVotes?: any
  isAgainst?: boolean
  state: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  forVoters?: ForAgainstVotersTypes[]
  againstVoters?: ForAgainstVotersTypes[]
  votingStart?: string
  votingEnd?: string
  executionEvent?: string[]
  details?: string
  proposerAddress?: string
  targets: any[]
  values: number[]
  calldatas: any[]
  descriptionHash: string | undefined
  queueTime?: string
  startBlockTimes?: string
  endBlockTimes?: string
}

interface Types {
  isActive: boolean
  page: number
}

export const useProposalsHooks = ({ isActive, page }: Types) => {
  const { constant } = useDataHooks().data

  const awsStore: AwsStorageClientTypes = useAwsHooks()
  const { everlandUrl } = awsStore

  const [loading, setLoading] = useBoolean(false)
  const [proposalsListTotal, setProposalsListTotal] = useState<number>(0)
  const [proposalsList, setProposalsList] = useState<ProposalsListTyps[]>([])

  useEffect(() => {
    if (isActive) getProposalsList()
    else setProposalsList([])
    return () => setProposalsList([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, page])

  const getProposalsList = async () => {
    void setLoading.setTrue()
    try {
      let skip = page === 1 ? 0 : Number(new BigNumber(page).minus(1).times(10))
      let promise = await Promise.all([getAxiosProposalsList({ skip })]).then((res) => {
        const { proposals, governance } = res[0]
        return {
          total: Number(governance.totalProposal),
          list: proposals.map(async (item, i) => {
            let data = item
            let state = await constant.ContractGovernance.methods.state(data.proposalId).call()
            let awsIpfsType = data.description.substring(data.description.length - 5)
            let dataIpfs = awsIpfsType === '.json' ? await getAwsIpfsDetailsJson({ url: everlandUrl, str: data.description }) : undefined
            return {
              key: (Number(governance.totalProposal) - skip - i).toString(),
              id: (Number(governance.totalProposal) - skip - i).toString(),
              ProposalsId: data.proposalId,
              title: dataIpfs?.isSuccess ? dataIpfs.values.proposalTitle : data.description,
              state: Number(state),
            }
          }),
        }
      })
      setProposalsListTotal(promise.total)
      let list: any[] = await Promise.all(promise.list)
      setProposalsList(list)
      void setLoading.setFalse()
    } catch (error) {
      console.log(error)
      void setLoading.setFalse()
    }
  }

  return { loading, proposalsList, proposalsListTotal }
}
