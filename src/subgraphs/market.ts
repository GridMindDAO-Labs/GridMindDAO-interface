import { getSubgraphsRequest } from '@/api'

type Types = {
  currentWeekId: string | undefined
  currentCommunity: string | undefined
}

export const getAxiosWeekTotals = async ({
  currentWeekId,
  currentCommunity,
  currentWeekIds,
}: Types & { currentWeekIds: string }): Promise<{
  total: string
  weekCount: any
  childLists: any[]
}> => {
  try {
    let query = `
    query MyQuery($currentWeekId: String!, $currentCommunity: String!, $currentWeekIds: String!) {
      gmdcount(id: "0") {
          totalWeekType
        }
      weekCount: weekTypeList(id: $currentWeekIds) {
        weekType
        totalRankingRewards
        startAt
        id
        endAt
        startBlock
        endBlock
      }
      childLists: usersStateRankings(
        first: 1000
        orderBy: amount
        orderDirection: desc
        where: { weekType: $currentWeekId, currentCommunity: $currentCommunity }
      ) {
        weekType
        rankingRewards
        inviter
        id
        currentCommunity
        createAt
        amount
        account
      }
    }
    `
    const { data } = await getSubgraphsRequest(query, {
      currentWeekId: !currentWeekId ? '0' : currentWeekId,
      currentCommunity: !currentCommunity ? '0' : currentCommunity,
      currentWeekIds: currentWeekIds,
    })
    console.log(data)
    return await {
      total: data.gmdcount?.totalWeekType ? data.gmdcount.totalWeekType : '0',
      weekCount: data.weekCount?.id ? data.weekCount : null,
      childLists: data.childLists,
    }
  } catch (error) {
    return await { total: '0', weekCount: null, childLists: [] }
  }
}
