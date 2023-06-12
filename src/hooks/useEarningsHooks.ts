import { useBoolean } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { AccountHistoryCountTypes } from '@/subgraphs/type.d'
import { getAxiosCurrentAccountEarnings } from '@/subgraphs/earnings'
import type { AxiosCurrentAccountEarnings } from '@/subgraphs/earnings'
import useDataHooks from '@/hooks/useDataHooks'
import { GMDToken_ABI } from '@/contracts/constant'
import { ZORE } from '@/contracts/tokenList'

export interface EarningsTableTypes {
  id?: string
  key?: string
  currency: string
  amount: string
  amountSocial: string
  duration: string
  usd: string
  gmd_token: string
  status: boolean
  voting_rights: string
  orderHash: string
  token: string
  nft_token_id: string
  liquidites_amount: string
  earnings_deadline: string
}

interface Types {
  isActive: boolean
  account: string | undefined
  isRefresh: boolean
}

const Init: AccountHistoryCountTypes = {
  totalStaticFinancialRevenue: '0',
  totalLiquidityRevenue: '0',
  totalLiquidityVotes: '0',
}

export const useEarningsHooks = ({ isActive, account, isRefresh }: Types) => {
  const { tokenSelectOptions, constant, fromWeiPowBanlance, web3, LiquidityStaking } = useDataHooks().data

  const [earningList, setEarningList] = useState<EarningsTableTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [historyCount, setHistoryCount] = useState<AccountHistoryCountTypes>(Init)

  const [liquiditesCurrent, setLiquiditesCurrent] = useState(0)

  useEffect(() => {
    setEarningList([])
    if (account && isActive) getEarningList()
    return () => {
      setEarningList([])
      setLoading(false)
      setHistoryCount(Init)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isActive, isRefresh])

  const getEarningList = async () => {
    setLoading(true)
    try {
      const { list } = await getData()
      console.log('EarningList', list)
      setEarningList(list)
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  const getData = async (): Promise<{ list: EarningsTableTypes[] }> => {
    try {
      const promise = await Promise.all([
        constant.ContractLiquidityStaking.methods.earned(account).call(),
        getAxiosCurrentAccountEarnings({ account: account as any }),
      ])
      setLiquiditesCurrent(Number(fromWeiPowBanlance({ balance: promise[0], decimals: '18' })))
      const { currentEarning, accountHistoryCount } = promise[1] as AxiosCurrentAccountEarnings
      setHistoryCount({
        totalLiquidityVotes: Math.floor(
          Number(fromWeiPowBanlance({ balance: accountHistoryCount?.totalLiquidityVotes || '0', decimals: '18' })),
        ).toString(),
        totalLiquidityRevenue: fromWeiPowBanlance({
          balance: accountHistoryCount?.totalLiquidityRevenue || '0',
          decimals: '18',
        }) as any,
        totalStaticFinancialRevenue: fromWeiPowBanlance({
          balance: accountHistoryCount?.totalStaticFinancialRevenue || '0',
          decimals: '18',
        }) as any,
      })
      let list = await Promise.all<any[]>(
        currentEarning.map(async (item) => {
          let constants = item.token === ZORE ? undefined : new web3.eth.Contract(GMDToken_ABI, item.token)
          let decimals = !constants
            ? '18'
            : item.token.toLowerCase() === LiquidityStaking.toLowerCase()
            ? '18'
            : await constants.methods.decimals().call()
          let currency = tokenSelectOptions.find((it) => it.address.toLowerCase() === item.token.toLowerCase())?.value || ''
          let currentTimes = moment().format('YYYY-MM-DD HH:mm:ss')
          let createAt = moment.unix(Number(item.createAt)).format('YYYY-MM-DD HH:mm:ss')
          let earned = 0
          if (item.token.toLowerCase() !== LiquidityStaking.toLowerCase())
            earned = await constant.ContractFinancing.methods.earned(item.orderHash).call()
          let currentTimeAt = moment(currentTimes).format('X')
          let earnings_deadline = moment.unix(Number(item.maturityAt)).format('YYYY-MM-DD HH:mm:ss')
          let voting_rights = fromWeiPowBanlance({ balance: item.governanceVotes, decimals: '18' })
          return {
            ...item,
            decimals,
            currency,
            createAt,
            currentTimeAt,
            earnings_deadline,
            earned,
            voting_rights,
          }
        }),
      ).then((lists) =>
        lists.map((item, i) => {
          return {
            key: i.toString(),
            id: item.id,
            currency: item.currency,
            amountSocial: item.amount,
            amount: fromWeiPowBanlance({ balance: item.amount, decimals: item.decimals }),
            gmd_token: fromWeiPowBanlance({ balance: item.gmdTokenRevenues, decimals: '18' }),
            voting_rights: (Math.floor(Number(item.voting_rights) * 100) / 100).toString(),
            status: Number(item.maturityAt) >= Number(item.currentTimeAt),
            duration: item.createAt,
            usd: fromWeiPowBanlance({ balance: item.earned.toString(), decimals: '18' }),
            orderHash: item.orderHash,
            token: item.token,
            nft_token_id: item.nftTokenId,
            earnings_deadline: item.earnings_deadline,
            liquidites_amount: fromWeiPowBanlance({ balance: item.liquiditesAmount.toString(), decimals: '18' }),
          }
        }),
      )
      return await { list: list }
    } catch (error) {
      return await {
        list: [],
      }
    }
  }

  return { loading, earningList, historyCount, liquiditesCurrent, getData, setEarningList, setLoading }
}

export function arraysEqual<balance>(a: any[], b: any[]): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; ++i) {
    const aProps = Object.getOwnPropertyNames(a[i])
    const bProps = Object.getOwnPropertyNames(b[i])

    if (aProps.length !== bProps.length) return false

    for (let j = 0; j < aProps.length; j++) {
      const propName = aProps[j]

      if (a[i][propName] !== b[i][propName]) return false
    }
  }

  return true
}
