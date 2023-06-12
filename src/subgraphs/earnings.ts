import { getSubgraphsRequest } from '@/api'
import { DepositedListTypes, AccountHistoryCountTypes } from './type.d'

export type AxiosCurrentAccountEarnings = {
  currentEarning: DepositedListTypes[]
  accountHistoryCount: AccountHistoryCountTypes
}

export const getAxiosCurrentAccountEarnings = async ({ account }: { account: string }): Promise<AxiosCurrentAccountEarnings> => {
  try {
    let query = `
    query MyQuery {
      depositedLists(
        where: {account: "${account}", isRedeem: false}
        orderBy: createAt
        orderDirection: desc
      ) {
        amount
        createAt
        governanceVotes
        id
        isRedeem
        maturityAt
        orderHash
        token
        account
        gmdTokenRevenues
        liquiditesAmount
        nftTokenId
      }
      accountHistoryCount(id: "${account.toLowerCase()}") {
        totalStaticFinancialRevenue
        totalLiquidityVotes
        totalLiquidityRevenue
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await { currentEarning: data.depositedLists, accountHistoryCount: data.accountHistoryCount }
  } catch (error) {
    return await {
      currentEarning: [],
      accountHistoryCount: {
        totalLiquidityVotes: '0',
        totalStaticFinancialRevenue: '0',
        totalLiquidityRevenue: '0',
      },
    }
  }
}
