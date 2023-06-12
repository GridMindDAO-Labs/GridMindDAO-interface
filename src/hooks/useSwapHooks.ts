import { useEffect, useState } from 'react'
import { TokenCurrentAccountPriceType } from '@/common/data'
import { BNBINIT, ETHINIT, ZORE } from '@/contracts/tokenList'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { GMDToken_ABI } from '@/contracts/constant'
import { REACT_APP_ENV } from '@/contracts/chains'

export const useSwapHooks = ({ account, isReset }: { account: string | undefined; isReset: boolean }) => {
  const dataInit: DataTypes = useDataHooks()
  const { web3, fromWeiPowBanlance } = dataInit.data

  const [tokenCurrentAccountPrice, setTokenCurrentAccountPrice] = useState<TokenCurrentAccountPriceType[]>(() => {
    return REACT_APP_ENV === 'dev' ? ETHINIT.tokenCurrentAccountPriceInit : BNBINIT.tokenCurrentAccountPriceInit
  })

  useEffect(() => {
    if (account) getBalances()
  }, [account, isReset])

  const getBalances = async () => {
    try {
      let ethBalance = await web3.eth.getBalance(account as any),
        ethBalances = fromWeiPowBanlance({ decimals: '18', balance: ethBalance })
      let list =
        REACT_APP_ENV === 'dev'
          ? ETHINIT.tokenCurrentAccountPriceInit.filter((i) => i.token !== ZORE)
          : BNBINIT.tokenCurrentAccountPriceInit.filter((i) => i.token !== ZORE)
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        let constants = new web3.eth.Contract(GMDToken_ABI, element.token)
        let balance = await constants.methods.balanceOf(account).call()
        let decimals = await constants.methods.decimals().call()
        element.balance = fromWeiPowBanlance({ decimals, balance })
      }
      list.push({
        token: ZORE,
        balance: ethBalances,
        type: REACT_APP_ENV === 'dev' ? 'ETH' : 'BNB',
      })
      list.forEach((item) => {
        item.balance = Number(item.balance) as any
      })
      setTokenCurrentAccountPrice(list)
    } catch (error) {}
  }

  return { tokenCurrentAccountPrice }
}
