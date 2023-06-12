import { useEffect, useState } from 'react'
import { DelegatesListTypes } from '@/subgraphs/type'
import { useBoolean } from 'ahooks'
import { getAxiosDelegateInfos, getAxiosVotingRecords } from '@/subgraphs/delegate'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { getAwsIpfsDetailsJson } from '@/common'
import type { AwsStorageClientTypes } from '@/contracts/aws'
import useAwsHooks from '@/hooks/useAwsHooks'
import BigNumber from 'bignumber.js'
import { unique } from '@/utils'

interface Types {
  pAddress: string
  isRefresh: boolean
}

const DetailsInit: DelegatesListTypes = {
  walletVotes: '0',
  transferVotes: 0,
  totalVotes: '0',
  isDelegate: false,
  id: '0',
  delegateAddress: '',
  gmdTokenAmountAmount: '0',
  account: '',
  votingRecords: [],
  flowabilityAitoken: '0',
}

export const useDelegateInfoHooks = ({ pAddress, isRefresh }: Types) => {
  const dataInit: DataTypes = useDataHooks()
  const { constant, fromWeiPowBanlance, web3 } = dataInit.data

  const awsStore: AwsStorageClientTypes = useAwsHooks()
  const { everlandUrl } = awsStore

  const [loading, setLoading] = useBoolean(false)
  const [details, setDetails] = useState<DelegatesListTypes>(DetailsInit)

  useEffect(() => {
    if (pAddress) getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pAddress, isRefresh])

  const getDetails = async () => {
    void setLoading.setTrue()
    try {
      const { delegatesList, transferVoteLists, currentEarning, votingRecords1 } = await getAxiosDelegateInfos({ account: pAddress })
      const { votingRecords2 } = await getAxiosVotingRecords({ account: pAddress })
      let votingRecords = [...votingRecords1, ...votingRecords2]
      votingRecords = unique(votingRecords, 'proposalId')
      let flowabilityAitokens = '0'
      for (let i = 0; i < votingRecords.length; i++) {
        const element = votingRecords[i],
          currentBlock = (await web3.eth.getBlockNumber()) as number,
          currentBlockDiff = new BigNumber(currentBlock).minus(20),
          isCurrentBlock = Number(currentBlockDiff) >= Number(element.endBlock) ? element.endBlock : currentBlockDiff.toString()
        let quorum = await constant.ContractGovernance.methods.quorum(Number(isCurrentBlock)).call(),
          quorumWei = fromWeiPowBanlance({ decimals: '18', balance: quorum })
        // console.log('quorumWei', Number(quorumWei))
        let state = await constant.ContractGovernance.methods.state(element.proposalId).call()
        element.state = state
        let awsIpfsType = element.description.substring(element.description.length - 5)
        let dataIpfs = awsIpfsType === '.json' ? await getAwsIpfsDetailsJson({ url: everlandUrl, str: element.description }) : undefined
        element.description = dataIpfs?.isSuccess ? dataIpfs.values.proposalTitle : element.description
        let successList: any[] = element.forVotes.filter((o) => o.support)
        let errorList: any[] = element.forVotes.filter((o) => !o.support)
        // console.log(successList, 'err', errorList)
        successList.forEach((items) => {
          items.weight = Number(fromWeiPowBanlance({ decimals: '18', balance: items.weight })).toFixed(0)
        })
        errorList.forEach((items) => {
          items.weight = Number(fromWeiPowBanlance({ decimals: '18', balance: items.weight })).toFixed(0)
        })
        element.isSuccessVotes = successList.length === 0 ? 0 : successList.map((ite) => ite.weight).reduce((n, m) => Number(n) + Number(m))
        element.isErrorVotes = errorList.length === 0 ? 0 : errorList.map((ite) => ite.weight).reduce((n, m) => Number(n) + Number(m))
        element.isSuccess = Number(element.isSuccessVotes) >= Number(quorumWei)
      }
      for (let i = 0; i < currentEarning.length; i++) {
        const element = currentEarning[i]
        let amounts = fromWeiPowBanlance({ decimals: '18', balance: element.amount.toString() })
        flowabilityAitokens = new BigNumber(flowabilityAitokens).plus(amounts).toString()
      }
      let obj: DelegatesListTypes = {
        ...delegatesList,
        transferVotes: transferVoteLists.length as any,
        votingRecords: votingRecords,
        flowabilityAitoken: Number(flowabilityAitokens).toFixed(6),
      }
      obj.walletVotes = Math.floor(Number(fromWeiPowBanlance({ decimals: '18', balance: obj.walletVotes }))).toString()
      obj.totalVotes = Math.floor(Number(fromWeiPowBanlance({ decimals: '18', balance: obj.totalVotes }))).toString()
      console.log('obgk', obj)
      setDetails(obj)
      void setLoading.setFalse()
    } catch (error) {
      console.log(';e', error)
      void setLoading.setFalse()
    }
  }

  return { details, loading }
}
