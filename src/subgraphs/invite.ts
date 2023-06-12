import { getSubgraphsRequest } from '@/api'
import { UserInviteeListTypes, DepositedListTypes } from './type.d'

export const getAxiosInviteUsersList = async ({
  account,
}: {
  account: string
}): Promise<{
  invitationTotal: string
  userInviteeList: UserInviteeListTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
      userInviteeLists(where: {inviter: "${account}"}, orderBy: createAt, orderDirection: desc) {
        amount
        account
        createAt
        id
        inviter
      }
      accountHistoryCount(id: "${account.toLowerCase()}") {
        invitationTotal
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    console.log('data', data)
    return await { userInviteeList: data.userInviteeLists, invitationTotal: data.accountHistoryCount?.invitationTotal || '0' }
  } catch (error) {
    return await { userInviteeList: [], invitationTotal: '0' }
  }
}

export const getOrderLatestTime = async ({
  account,
}: {
  account: string
}): Promise<{
  latestAt: string
}> => {
  try {
    let query = `
    query MyQuery {
      accountHistoryCount(id: "${account.toLowerCase()}") {
        starkingRewardEndAt
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await { latestAt: data.accountHistoryCount.starkingRewardEndAt }
  } catch (error) {
    return await { latestAt: '' }
  }
}

export const getAxiosCurrentAccountPledge = async ({
  account,
}: {
  account: string
}): Promise<{
  depositedList: DepositedListTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
      depositedLists(
        where: {account: "${account.toLowerCase()}"}
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
    }
    `
    const { data } = await getSubgraphsRequest(query)
    console.log('data', data)
    return await { depositedList: data.depositedLists }
  } catch (error) {
    return await { depositedList: [] }
  }
}
