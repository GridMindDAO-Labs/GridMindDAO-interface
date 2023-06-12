import { useEffect, useState } from 'react'
import { useBoolean } from 'ahooks'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'

interface Types {
  account: string | undefined
}

export const useCreateProposalHook = ({ account }: Types) => {
  const [isSubmitProposal, setIsSubmitProposal] = useBoolean(false)
  const [proposalMinVotes, setProposalMinVotes] = useState<number>(0)
  const [currentProposalVotes, setCurrentProposalVotes] = useState<number>(0)

  const dataInit: DataTypes = useDataHooks()
  const { constant, fromWeiPowBanlance } = dataInit.data

  useEffect(() => {
    console.log('account', account)
    if (account) getIsSubmitProposal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const getIsSubmitProposal = async () => {
    try {
      let minVoteData = await constant.ContractGovernance.methods.proposalThreshold().call()
      let getVotesData = await constant.ContractLPToken.methods.getVotes(account).call()
      let minVotes = Number(fromWeiPowBanlance({ balance: minVoteData, decimals: '18' }))
      let getVotes = Number(fromWeiPowBanlance({ balance: getVotesData, decimals: '18' }))
      console.log(minVotes, getVotes)
      setProposalMinVotes(minVotes)
      setCurrentProposalVotes(getVotes)
      getVotes >= minVotes ? void setIsSubmitProposal.setTrue() : void setIsSubmitProposal.setFalse()
    } catch (error) {
      console.log('getVotes', error)
    }
  }

  const getOnShowSubmitProposal = async (): Promise<boolean> => {
    try {
      let minVoteData = await constant.ContractGovernance.methods.proposalThreshold().call()
      let getVotesData = await constant.ContractLPToken.methods.getVotes(account).call()
      let minVotes = Number(fromWeiPowBanlance({ balance: minVoteData, decimals: '18' }))
      let getVotes = Number(fromWeiPowBanlance({ balance: getVotesData, decimals: '18' }))
      setProposalMinVotes(minVotes)
      setCurrentProposalVotes(getVotes)
      getVotes >= minVotes ? void setIsSubmitProposal.setTrue() : void setIsSubmitProposal.setFalse()
      return getVotes >= minVotes
    } catch (error) {
      return false
    }
  }

  return { isSubmitProposal, proposalMinVotes, getOnShowSubmitProposal, currentProposalVotes }
}
