import { getSubgraphsRequest } from '@/api'
import { RateUpdatedTypes } from './type.d'

export const getAxiosCurrentInterestRate = async (): Promise<{
  currentRate: RateUpdatedTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
      rateUpdateds(orderBy: date, orderDirection: desc) {
        id
        newRate
        token
        date
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await { currentRate: data.rateUpdateds }
  } catch (error) {
    return await { currentRate: [] }
  }
}

export const getAxiosFinanceTimeList = async ({
  token,
}: {
  token: string
}): Promise<{
  currentRate: RateUpdatedTypes[]
}> => {
  try {
    let query = `
    query MyQuery {
      rateUpdateds(orderBy: date, orderDirection: desc, where: {token: "${token}"}) {
        id
        newRate
        token
        date
      }
    }
    `
    const { data } = await getSubgraphsRequest(query)
    return await { currentRate: data.rateUpdateds }
  } catch (error) {
    return await { currentRate: [] }
  }
}
