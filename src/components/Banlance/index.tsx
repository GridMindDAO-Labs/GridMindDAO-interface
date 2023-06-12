import { useEffect, useState } from 'react'
import { useBoolean } from 'ahooks'
import { Spin } from 'antd'
import { SwapBanlanceTitle } from './styled'
import useDataHooks from '@/hooks/useDataHooks'
import { GMDToken_ABI } from '@/contracts/constant'
import { useWeb3React } from '@web3-react/core'
import { dataIntegerHandling6 } from '@/common'
import { enUSNum } from '@/utils'
import { useTranslation } from 'react-i18next'

type Types = {
  address: string
  decimal: number
  isMatic?: boolean
  isRest: boolean
  unit: string
}

const BanlancePage = ({ address, decimal, isMatic, isRest, unit }: Types) => {
  const { t } = useTranslation()
  const { web3, fromWeiPowBanlances } = useDataHooks().data
  const { isActive, account } = useWeb3React()

  const [banlance, setBanlance] = useState<string>('0')
  const [loading, setLoading] = useBoolean(false)

  useEffect(() => {
    setBanlance('0')
    if (address && isActive) handleWatchBanlance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isActive, account, isRest])

  const handleWatchBanlance = async () => {
    if (!account) return
    void setLoading.setTrue()
    try {
      if (isMatic) {
        let balanceOf = await web3.eth.getBalance(account)
        let banlance = fromWeiPowBanlances({ decimals: decimal.toString(), balance: balanceOf })
        setBanlance(dataIntegerHandling6(banlance))
        void setLoading.setFalse()
      } else {
        let contract = new web3.eth.Contract(GMDToken_ABI, address)
        let balanceOf = await contract.methods.balanceOf(account).call()
        let banlance = fromWeiPowBanlances({ decimals: decimal.toString(), balance: balanceOf })
        setBanlance(dataIntegerHandling6(banlance))
        void setLoading.setFalse()
      }
    } catch (error) {
      void setLoading.setFalse()
      console.log(error)
    }
  }

  return (
    <SwapBanlanceTitle>
      <div className="span">
        {unit}
        {'  '}
        {t('swap.banlance.title')} {loading ? <Spin size="small" /> : enUSNum(Number(banlance))}
      </div>
    </SwapBanlanceTitle>
  )
}

export default BanlancePage
