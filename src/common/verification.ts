import Web3 from 'web3'
import { message } from 'antd'
import { t } from 'i18next'

export const amountVerificationNative = async ({
  web3,
  account,
}: {
  web3: Web3
  account: string
}): Promise<{ isTrue: boolean; balance: string }> => {
  try {
    let balance = await web3.eth.getBalance(account)
    console.log('balance', balance)
    if (balance === '0') {
      message.info({
        content: t('app.account.balance.title'),
        className: 'message-global',
      })
      return await { isTrue: false, balance: '0' }
    }
    return await { isTrue: true, balance }
  } catch (error) {
    return await { isTrue: false, balance: '0' }
  }
}

/** 验证用户对应的账户余额是否足够 */
export const amountVerificationNativeTwo = async ({
  web3,
  account,
  constant,
}: {
  web3: Web3
  account: string
  constant: any
}): Promise<{ isTrue: boolean; balance: string }> => {
  try {
    let balance = await constant.methods.balanceOf(account).call()
    console.log('balance', balance)
    if (balance === '0') {
      message.info({
        content: t('app.account.balance.title'),
        className: 'message-global',
      })
      return await { isTrue: false, balance: '0' }
    }
    return await { isTrue: true, balance }
  } catch (error) {
    return await { isTrue: false, balance: '0' }
  }
}
