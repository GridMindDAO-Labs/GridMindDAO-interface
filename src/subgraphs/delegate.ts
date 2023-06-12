import { getSubgraphsRequest } from '@/api'
import { DelegatesListTypes, DepositedListTypes, ProposalsListTypes } from './type.d'

export const getAxiosDelegateInfos = async ({
  account,
}: {
  account: string
}): Promise<{
  delegatesList: DelegatesListTypes
  transferVoteLists: any[]
  currentEarning: DepositedListTypes[]
  votingRecords1: ProposalsListTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
      delegatesList(id: "${account.toLowerCase()}") {
        account
        gmdTokenAmount
        delegateAddress
        id
        isDelegate
        totalVotes
        walletVotes
      }
      delegatesLists(
        where: {delegateAddress: "${account.toLowerCase()}", account_not: "${account.toLowerCase()}"}
      ) {
        account
        delegateAddress
      }
      depositedLists(
        where: {account: "${account.toLowerCase()}", isRedeem: false}
        orderBy: createAt
        orderDirection: desc
      ) {
        gmdTokenRevenues
        amount
        createAt
        governanceVotes
        id
        isRedeem
        maturityAt
        orderHash
        token
        account
      }
      proposalsLists(
        where: {forVotes_: {voter: "${account.toLowerCase()}"}}
      ) {
        proposalId
        state
        description
        forVotes {
          weight
          voter
          support
        }
        proposer
        endBlock
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await {
      votingRecords1: data.proposalsLists,
      delegatesList: data.delegatesList,
      currentEarning: data.depositedLists,
      transferVoteLists: data.delegatesLists,
    }
  } catch (error) {
    return await {
      delegatesList: {
        walletVotes: '0',
        totalVotes: '0',
        isDelegate: false,
        id: '0',
        delegateAddress: '',
        gmdTokenAmountAmount: '0',
        account: '',
        votingRecords: [],
        flowabilityAitoken: '0',
      },
      currentEarning: [],
      transferVoteLists: [],
      votingRecords1: [],
    }
  }
}

export const getAxiosVotingRecords = async ({
  account,
}: {
  account: string
}): Promise<{
  votingRecords2: ProposalsListTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
      proposalsLists(
        where: {proposer: "${account.toLowerCase()}"}
      ) {
        proposalId
        state
        description
        forVotes {
          weight
          voter
          support
        }
        proposer
        endBlock
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await { votingRecords2: data.proposalsLists }
  } catch (error) {
    return await { votingRecords2: [] }
  }
}
