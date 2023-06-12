import { useBoolean, useInterval } from 'ahooks'
import { useState } from 'react'
import { message, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import Icon from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { DiscountSvg, UniversalSvg } from '@/pages/Finance/icon'

import useDataHooks from '@/hooks/useDataHooks'

import { FinanceInfo, InfoInputDiv } from '@/pages/Finance/styled'
import { handleLastestPrice } from '@/pages/Finance/utils'
import type { ChildTypes, UniversalFinanceListType, StableVariableDepositTyes } from '@/pages/Finance/typd'
import { amountVerificationNativeTwo, amountVerificationNative } from '@/common/verification'
import { ZORE } from '@/contracts/tokenList'
import { useUserInfoHooks } from '@/hooks/useUserInfoHooks'
import { getAxiosCurrentAccountPledge } from '@/subgraphs/invite'
import { REACT_APP_ENV } from '@/contracts/chains'

import BanlancePage from '@/components/Banlance'
import TokensSelect from '@/components/TokensSelect'
import ConnectWallet from '@/components/ConnectWallet'

// 0x55d398326f99059ff775485246999027b3197955
const UniversalFinanceListInit: UniversalFinanceListType[] = [
  {
    id: 'UniversalFinance0',
    value: 0,
    token: REACT_APP_ENV === 'prd' ? '0x53d851131f9a82b97af8a32d70c57B5C24c429cE' : ZORE,
    usdAmount: '0',
  },
]

const UniversalMode = ({ currentInterestRate, handleOnShowClick, handleIsRefreshOut }: ChildTypes) => {
  const uriParams = useParams()
  const { t } = useTranslation()
  const { constant, web3, tokenConstant, toWeiPowBanlance, fromWeiPowBanlance, tokenSelectOptions, Tether_Address, Financing_Address } =
    useDataHooks().data
  const { isActive, account } = useWeb3React()

  const [reload, setReload] = useState(false)
  const [universalFinanceList, setUniversalFinanceList] = useState<UniversalFinanceListType[]>(UniversalFinanceListInit)
  const [universalLableLoading, setUniversalLableLoading] = useBoolean(false)

  const { users, minUsdAmount } = useUserInfoHooks({ account })

  const [interval] = useState<number | undefined>(2000)

  useInterval(() => {
    handleWathUsdData()
  }, interval)

  const handleWathUsdData = async () => {
    universalFinanceList.forEach(async (item: UniversalFinanceListType) => {
      const { usd } = await handleLastestPrice({
        token: item.token,
        value: item.value,
        fromWeiPowBanlance,
        Tether_Address,
        web3,
        constant,
      })
      setUniversalFinanceList((e) => {
        let es = JSON.parse(JSON.stringify(e))
        es.forEach((item: any) => {
          item.usdAmount = (Math.floor(Number(usd) * 100) / 100).toFixed(2)
        })
        return es
      })
    })
  }

  const handleUniversalChange = async (value: any, obj: UniversalFinanceListType) => {
    console.log(value, obj.token)
    if (Number(value) !== 0) {
      const { usd, isSupport } = await handleLastestPrice({
        token: obj.token,
        value: obj.value,
        fromWeiPowBanlance,
        Tether_Address,
        web3,
        constant,
      })
      setUniversalFinanceList((e) => {
        let es = JSON.parse(JSON.stringify(e))
        es.forEach((item: any) => {
          item.value = Number(value)
          item.usdAmount = (Math.floor(Number(usd) * 100) / 100).toFixed(2)
        })
        return es
      })
      if (!isSupport)
        message.info({
          content: t('message.finance.tips1'),
          className: 'message-global',
        })
    } else
      setUniversalFinanceList((e) => {
        let es = JSON.parse(JSON.stringify(e))
        es.forEach((item: any) => {
          item.value = Number(value)
          item.usdAmount = '0'
        })
        return es
      })
  }

  const handleUniversalTokens = async (tokens: string, obj: UniversalFinanceListType) => {
    if (Number(obj.value) !== 0) {
      const { usd, isSupport } = await handleLastestPrice({
        token: tokens,
        value: obj.value,
        fromWeiPowBanlance,
        Tether_Address,
        web3,
        constant,
      })
      setUniversalFinanceList((e) => {
        let es = JSON.parse(JSON.stringify(e))
        es.forEach((item: any) => {
          item.token = tokens
          item.usdAmount = (Math.floor(Number(usd) * 100) / 100).toFixed(2)
        })
        return es
      })
      if (!isSupport)
        message.info({
          content: t('message.finance.tips1'),
          className: 'message-global',
        })
    } else
      setUniversalFinanceList((e) => {
        let es = JSON.parse(JSON.stringify(e))
        es.forEach((item: any) => {
          item.token = tokens
          item.usdAmount = 0
        })
        return es
      })
  }

  /** 静态理财提交 */
  const handleUniversalDepositSubmit = async (obj: UniversalFinanceListType) => {
    try {
      if (!account) return
      if (obj.value === 0) {
        message.info({
          content: t('message.finance.tips2'),
          className: 'message-global',
        })
        return false
      }
      if (Number(obj.usdAmount) < minUsdAmount) {
        message.info({
          content: t('message.finance.tips3', { msg: minUsdAmount }),
          className: 'message-global',
        })
        return false
      }
      let currentNewRate = currentInterestRate.find((item) => item.token.toLowerCase() === obj.token.toLowerCase())?.newRate
      if (!currentNewRate) {
        message.info({
          content: t('message.finance.tips9'),
          className: 'message-global',
        })
        return false
      }
      console.log('universalSubmit', obj)
      let abi = tokenConstant.find((item) => item.token.toLowerCase() === obj.token.toLowerCase())?.constantAbi
      let constantBalance: any = abi === '' ? '' : new web3.eth.Contract(abi, obj.token)
      const { isTrue, balance } =
        abi === ''
          ? await amountVerificationNative({ web3, account })
          : await amountVerificationNativeTwo({ web3, account, constant: constantBalance })
      const decimals: string = abi === '' ? 18 : await constantBalance.methods.decimals().call()
      let balances = fromWeiPowBanlance({ decimals, balance })
      if (!isTrue) return
      if (Number(balances) < Number(obj.value)) {
        message.info({
          content: t('message.finance.tips4', { msg: balances }),
          className: 'message-global',
        })
        return false
      }

      handleStableVariableDepositAuthorized({
        token: obj.token,
        amount: toWeiPowBanlance({ decimals, balance: obj.value.toString() }),
        constant: constantBalance,
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleStableVariableDepositAuthorized = async (params: StableVariableDepositTyes) => {
    if (params.token === ZORE) {
      handleStableDeposit(params)
      return
    }
    let AuthorizedAmount = await params.constant.methods.allowance(account, Financing_Address).call()
    if (Number(AuthorizedAmount) < Number(params.amount || '0')) {
      void setUniversalLableLoading.setTrue()
      params.constant.methods
        .approve(Financing_Address, params.amount)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          handleStableDeposit(params)
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setUniversalLableLoading.setFalse()
        })
    } else {
      handleStableDeposit(params)
    }
  }

  const handleStableDeposit = async (params: StableVariableDepositTyes) => {
    void setUniversalLableLoading.setTrue()
    let sendParams: any = {}
    let isRepeatInvitationAddress = false
    if (uriParams && uriParams.invitationAddress && users.referrer === ZORE) {
      const promise = await Promise.all([
        getAxiosCurrentAccountPledge({ account: account as any }),
        getAxiosCurrentAccountPledge({ account: uriParams.invitationAddress }),
      ]).then((res) => {
        return res[0].depositedList.length === 0 && res[1].depositedList.length > 0 ? true : false
      })
      console.log('RepeatInvitation', promise)
      isRepeatInvitationAddress = !promise
    }
    console.log('params.token', params)
    if (params.token === ZORE) sendParams.value = params.amount
    try {
      let invitationAddress = isRepeatInvitationAddress
        ? users.referrer
        : users.referrer !== ZORE
        ? users.referrer
        : uriParams && uriParams.invitationAddress
        ? uriParams.invitationAddress
        : ZORE
      constant.ContractFinancing.methods
        .deposit(params.token, invitationAddress, params.amount)
        .send({
          from: account,
          ...sendParams,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          message.success({
            content: t('message.finance.tips5'),
            className: 'message-global',
          })
          setUniversalFinanceList(UniversalFinanceListInit)
          setReload(true)
          setTimeout(() => {
            setReload(false)
          }, 1)
          let documents = document.getElementById('UniversalFinance0') as any
          documents.value = undefined
          void setUniversalLableLoading.setFalse()
          handleIsRefreshOut()
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt)
          message.error({
            content: t('message.finance.tips6'),
            className: 'message-global',
          })
          void setUniversalLableLoading.setFalse()
        })
    } catch (error) {
      console.log(error)
      void setUniversalLableLoading.setFalse()
    }
  }

  return (
    <>
      {universalFinanceList.map((item, key) => (
        <FinanceInfo className={`info${key + 1}`} key={key}>
          <div className="title">
            <Icon component={UniversalSvg} style={{ marginRight: '0.25rem' }} />
            {t('finance.title.1')} - {`28 ${t('finance.general.days')}`}
          </div>
          <ul>
            <li>{t('finance.general.tips1')}</li>
            <li>{t('finance.general.tips2')}</li>
            <li>{t('finance.general.tips3')}</li>
          </ul>
          <div className="deposit">{t('finance.general.btn.deposit')}</div>
          <InfoInputDiv>
            <div className="left">
              <input type="number" placeholder="0" id={item.id} onChange={(e) => handleUniversalChange(e.target.value, item)} />
              <div className="usds">
                ≈{item.usdAmount}
                {t('finance.general.usds')}
              </div>
            </div>
            <div className="right">
              {!reload && <TokensSelect color="#FAFAFA" returnClick={(tokens) => handleUniversalTokens(tokens, item)} />}
            </div>
          </InfoInputDiv>
          <BanlancePage
            unit={tokenSelectOptions.find((items) => items.address === item.token)?.value || ''}
            isRest={reload}
            address={item.token}
            decimal={tokenSelectOptions.find((items) => items.address === item.token)?.decimals || 18}
            isMatic={false}
          />
          <div className="tips">{t('finance.general.btns.tips', { msg: minUsdAmount })}</div>
          <div className="tips-v">
            <div className="tips-v-left">{t('finance.general.btns.rate')}</div>
            <div className="tips-v-right">
              <span className="texts">
                {currentInterestRate.find((ci) => ci.token.toLowerCase() === item.token.toLowerCase())?.newRate || '0.00'}%
              </span>
              <Icon component={DiscountSvg} onClick={() => handleOnShowClick({ type: 'General', tokens: item.token })} />
            </div>
          </div>
          {isActive ? (
            <Button loading={universalLableLoading} className="submit" onClick={() => handleUniversalDepositSubmit(item)}>
              {t('finance.general.btn.deposit')}
            </Button>
          ) : (
            <div className="submit-wallet">
              <ConnectWallet isMinWidth="100%" isPosition="ProfileMouldWeb" />
            </div>
          )}
        </FinanceInfo>
      ))}
    </>
  )
}

export default UniversalMode
