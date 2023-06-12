import transit from '@transitswap/js-sdk'
import { bscData, ZORE } from '@/contracts/tokenList'
import BigNumber from 'bignumber.js'

let paramsData: any[] = bscData.tokens.map((token) => {
  return {
    chain: 'BSC',
    token0: ZORE,
    token1: token.address,
    decimal0: 18,
    decimal1: token.decimals,
    to: '0x3EACf3C3A4B6CF8742728E99AE058905d6aBB333',
    amountIn: '1000000000000000000',
    impact: '300',
    amountOutMin: '0',
    part: 10,
    channel: 'PancakeV3',
    issuer: '0x3EACf3C3A4B6CF8742728E99AE058905d6aBB333',
  }
})

type Types = {
  formToken: string
  toToken: string
}

export const SwapPrice = async ({ formToken, toToken }: Types): Promise<{ price: string; isSuccess: boolean }> => {
  try {
    let callParams = paramsData.map((item) => transit.swapV1.quoteSwap(item))
    const tokens = await Promise.all([...callParams]).then((res) =>
      res.map((s, i) => {
        let denominator = new BigNumber(10).pow('18')
        return {
          totalAmountOut: new BigNumber(s.data.totalAmountOut).div(denominator).toString(),
          address: bscData.tokens[i].address,
        }
      }),
    )
    let prices: any = {}
    for (let i = 0; i < tokens.length; i++) {
      let element = tokens[i]
      prices[element.address] = element.totalAmountOut
    }
    console.log('prices', prices)
    if (formToken === ZORE) {
      return await { price: prices[toToken].toString(), isSuccess: true }
    } else if (toToken === ZORE) {
      return await { price: prices[formToken].toString(), isSuccess: true }
    } else {
      let formTokenBalanceEths = prices[formToken]
      let toTokenBalanceEths = prices[toToken]
      let balances = new BigNumber(toTokenBalanceEths).div(formTokenBalanceEths)

      console.log(formTokenBalanceEths, toTokenBalanceEths, balances)
      return await { price: balances.toString(), isSuccess: true }
    }
  } catch (error) {
    console.log('er', error)
    return await { price: '0'.toString(), isSuccess: false }
  }
}
