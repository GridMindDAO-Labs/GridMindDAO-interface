import { getSubgraphsRequest } from '@/api'
import { ProposalsListTypes, GovernanceTotalTypes, DelegatesListTypes, DelegatesListCountTypes } from './type.d'

export type AxiosProposalsListTypes = {
  proposals: ProposalsListTypes[]
  governance: GovernanceTotalTypes
}
export const getAxiosProposalsList = async ({ skip }: { skip: number }): Promise<AxiosProposalsListTypes> => {
  try {
    let query = `
    query MyQuery {
      gmdcount(id: "0") {
        totalProposal
      }
      proposalsLists(orderBy: blockNumber, orderDirection: desc, first: 10, skip: ${skip}) {
        forVotes {
          support
          voter
          weight
        }
        proposalId
        proposer
        startBlock
        targets
        transactionHash
        id
        calldatas
        description
        endBlock
        state
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await {
      proposals: data.proposalsLists,
      governance: data.gmdcount == null ? { totalProposal: '0' } : data.gmdcount,
    }
  } catch (error) {
    return await { proposals: [], governance: { totalProposal: '0' } }
  }
}

export const getAxiosProposalsDetails = async ({
  proposalId,
}: {
  proposalId: string
}): Promise<{
  dateilsParams: ProposalsListTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
      proposalsLists(
        orderBy: blockNumber
        orderDirection: desc
        where: {proposalId: "${proposalId}"}
      ) {
        forVotes {
          support
          voter
          weight
        }
        proposalId
        proposer
        startBlock
        targets
        transactionHash
        id
        calldatas
        description
        endBlock
        state
        values
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await { dateilsParams: data.proposalsLists }
  } catch (error) {
    return await { dateilsParams: [] }
  }
}

export type AxiosDelegatesListTypes = {
  GMDCount: DelegatesListCountTypes
  delegatesLists: DelegatesListTypes[]
}

export const getAxiosDelegatesList = async (): Promise<AxiosDelegatesListTypes> => {
  try {
    let query = `
    query MyQuery {
      gmdcount(id: "0") {
        totalLiquidityValidNOldVotes
        totalLiquidityValidNewVotes
      }
      delegatesLists(orderBy: totalVotes, orderDirection: desc) {
        walletVotes
        totalVotes
        isDelegate
        id
        delegateAddress
        gmdTokenAmount
        account
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await {
      GMDCount: data.gmdcount == null ? { totalLiquidityValidNOldVotes: '0', totalLiquidityValidNewVotes: '0' } : data.gmdcount,
      delegatesLists: data.delegatesLists,
    }
  } catch (error) {
    return await { GMDCount: { totalLiquidityValidNOldVotes: '0', totalLiquidityValidNewVotes: '0' }, delegatesLists: [] }
  }
}

export const getAxiosVotes1 = async ({
  account,
}: {
  account: string
}): Promise<{
  votingRecords1: ProposalsListTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
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
    return await { votingRecords1: data.proposalsLists }
  } catch (error) {
    return await { votingRecords1: [] }
  }
}

export const getAxiosVotes2 = async ({
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
        where: { proposer: "${account.toLowerCase()}"}
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
