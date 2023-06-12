import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { GMDToken_ABI } from '@/contracts/constant'
import { REACT_APP_ENV } from '@/contracts/chains'
import { ZORE } from '@/contracts/tokenList'

export const handleLastestPrice = async ({
  token,
  value,
  Tether_Address,
  web3,
  constant,
  fromWeiPowBanlance,
}: {
  constant: any
  web3: Web3
  token: string
  value: number
  Tether_Address: string
  fromWeiPowBanlance: ({ decimals, balance }: { decimals: string; balance: string }) => string
}): Promise<{ isSupport: boolean; usd: number }> => {
  try {
    if (token.toLowerCase() === Tether_Address.toLowerCase()) {
      return await { isSupport: true, usd: Number(value) }
    }
    let tokens =
      REACT_APP_ENV === 'dev' && token === ZORE
        ? '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
        : REACT_APP_ENV === 'uat' && token === ZORE
        ? '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
        : token
    let constantss = new web3.eth.Contract(GMDToken_ABI, tokens)
    let decimals = token === ZORE ? '18' : await constantss.methods.decimals().call()
    let lastestPrice = await constant.ContractPriceOracle.methods.lastestPrice(tokens, Tether_Address, 100, 0).call()
    let usdScale = fromWeiPowBanlance({ balance: lastestPrice, decimals })
    let usd = new BigNumber(value).times(usdScale)
    return await { isSupport: true, usd: Number(usd) }
  } catch (error) {
    console.log(error)
    return await { isSupport: false, usd: 0 }
  }
}

export const handleLastestPriceEarnings = async ({
  value,
  GMDToken_Address,
  constant,
  Tether_Address,
  fromWeiPowBanlance,
}: {
  value: number
  GMDToken_Address: string
  constant: any
  Tether_Address: string
  fromWeiPowBanlance: ({ decimals, balance }: { decimals: string; balance: string }) => string
}): Promise<{ isSupport: boolean; usd: number }> => {
  try {
    let lastestPrice = await constant.ContractPriceOracle.methods.lastestPrice(GMDToken_Address, Tether_Address, 100, 0).call()
    console.log('lastestPrice', lastestPrice)
    let usdScale = fromWeiPowBanlance({ balance: lastestPrice, decimals: '18' })
    let usd = new BigNumber(value).div(usdScale)
    console.log('usd', usd)
    return await { isSupport: true, usd: Number(usd) }
  } catch (error) {
    console.log('err', error)
    return await { isSupport: false, usd: 0 }
  }
}
