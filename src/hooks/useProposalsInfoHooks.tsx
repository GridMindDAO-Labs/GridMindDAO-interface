import { useEffect, useState } from 'react'
import { ProposalsListTyps } from '@/hooks/useProposalsHooks'
import { useBoolean } from 'ahooks'
import { getAxiosProposalsDetails } from '@/subgraphs/dao'
import { ForVotesTypes } from '@/subgraphs/type.d'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { blockToTimestamp, getAwsIpfsDetailsJson, blockToTimestampThree } from '@/common'
import type { AwsStorageClientTypes } from '@/contracts/aws'
import useAwsHooks from '@/hooks/useAwsHooks'
import { ethers } from 'ethers'
import moment from 'moment'

const DetailsInit: ProposalsListTyps = {
  key: undefined,
  id: undefined,
  ProposalsId: '0',
  title: '',
  againstVotes: 0,
  favorVotes: 0,
  isAgainst: false,
  state: 0,
  targets: [],
  values: [],
  calldatas: [],
  descriptionHash: undefined,
}

export const useProposalsInfoHooks = ({ ProposalsId, isRefresh }: { ProposalsId: string; isRefresh: boolean }) => {
  const dataInit: DataTypes = useDataHooks()
  const { constant, fromWeiPowBanlance, web3 } = dataInit.data

  const awsStore: AwsStorageClientTypes = useAwsHooks()
  const { everlandUrl } = awsStore

  const [loading, setLoading] = useBoolean(false)
  const [proposalsDetails, setProposalsDetails] = useState<ProposalsListTyps>(DetailsInit)

  useEffect(() => {
    if (ProposalsId) getDetails()
    return () => setProposalsDetails(DetailsInit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ProposalsId, isRefresh])

  const getDetails = async () => {
    void setLoading.setTrue()
    try {
      let promise = await Promise.all([
        getAxiosProposalsDetails({ proposalId: ProposalsId }),
        constant.ContractGovernance.methods.state(ProposalsId).call(),
      ])
        .then((res) => {
          return {
            data: res[0].dateilsParams.length > 0 ? res[0].dateilsParams[0] : undefined,
            state: res[1],
          }
        })
        .then(async (res) => {
          if (res.data) {
            let state = res.state
            let data = res.data
            let awsIpfsType = data.description.substring(data.description.length - 5)
            let dataIpfs = awsIpfsType === '.json' ? await getAwsIpfsDetailsJson({ url: everlandUrl, str: data.description }) : undefined
            let forList: ForVotesTypes[] = data.forVotes
              .filter((item) => item.support === true)
              .map((item) => {
                return {
                  voter: item.voter,
                  weight: Number(fromWeiPowBanlance({ balance: item.weight, decimals: '18' })).toFixed(0),
                }
              })
            let againstList: ForVotesTypes[] = data.forVotes
              .filter((item) => item.support !== true)
              .map((item) => {
                return {
                  voter: item.voter,
                  weight: Number(fromWeiPowBanlance({ balance: item.weight, decimals: '18' })).toFixed(0),
                }
              })
            let queueTime = undefined
            if (Number(state) === 5) queueTime = await proposalEta()
            return {
              key: '0',
              id: '0',
              ProposalsId,
              title: dataIpfs?.isSuccess ? dataIpfs.values.proposalTitle : data.description,
              againstVotes: againstList.length,
              favorVotes: forList.length,
              isAgainst: state === '1' ? true : false,
              state: Number(state) as any,
              forVoters: forList,
              againstVoters: againstList,
              votingStart: await blockToTimestamp(web3, data.startBlock),
              votingEnd: await blockToTimestamp(web3, data.endBlock),
              executionEvent: dataIpfs?.isSuccess ? dataIpfs.values.tips : data.calldatas,
              details: dataIpfs?.isSuccess ? dataIpfs.values.proposalContent : data.description,
              proposerAddress: data.proposer,
              calldatas: data.calldatas,
              descriptionHash: ethers.utils.id(data.description),
              values: data.values,
              targets: data.targets,
              queueTime,
              endBlockTimes: (await blockToTimestampThree(web3, data.endBlock)) as any,
              startBlockTimes: (await blockToTimestampThree(web3, data.startBlock)) as any,
            }
          } else return undefined
        })
      console.log('details', promise)
      if (promise) setProposalsDetails(promise)
      void setLoading.setFalse()
    } catch (error) {
      console.log(error)
      void setLoading.setFalse()
    }
  }

  const proposalEta = async () => {
    let data = await constant.ContractGovernance.methods.proposalEta(ProposalsId).call()
    return moment.unix(data).format('YYYY-MM-DD HH:mm:ss')
  }

  return { loading, proposalsDetails, setProposalsDetails }
}
