import { useEffect, useState } from 'react'
import { Form, Button, message, Skeleton, Col } from 'antd'
import { SwapContent, SwapChangeIcon, SwapInputDiv, SwapInput, SwapBalanceDiv } from '@/pages/Swap/styled'
import Icon from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { ChangeSvg } from '@/pages/Swap/icon'

import TokensSelect from '@/components/TokensSelect/swap'
import ConnectWallet from '@/components/ConnectWallet'
import { useTranslation } from 'react-i18next'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { GMDToken_ABI } from '@/contracts/constant'
// import axios from 'axios'
import { useBoolean, useInterval } from 'ahooks'
// import { SwapPriceQuery } from '@/contracts/swapPriceQuery'
// import { REACT_APP_ENV } from '@/contracts/chains'
// import { SwapPriceQuery as SwapPriceQueryBNB } from '@/contracts/swapPriceQueryBnb'
import { ZORE } from '@/contracts/tokenList'
import BigNumber from 'bignumber.js'
import { useSwapHooks } from '@/hooks/useSwapHooks'
import { SwapPrice } from '@/contracts/swap/transit'
import transit from '@transitswap/js-sdk'

const SwapModePage = () => {
  const dataInit: DataTypes = useDataHooks()
  const { SwapSelectOptions, web3, fromWeiPowBanlance, toWeiPowBanlance } = dataInit.data

  const { t } = useTranslation()
  const { isActive, account } = useWeb3React()
  const [form] = Form.useForm()
  const inputValue = Form.useWatch('inputValue', form)

  const [isReset, setIsReset] = useBoolean(false)
  const { tokenCurrentAccountPrice } = useSwapHooks({ account, isReset })

  const [currentTokens, setCurrentTokens] = useState<string[]>([SwapSelectOptions[0].address, SwapSelectOptions[3].address])

  // const [currentToken, setCurrentToken] = useState<string>(SwapSelectOptions[0].address)
  // const [currentTokenOut, setCurrentTokenOut] = useState<string>(SwapSelectOptions[3].address)

  const [loading, setLoading] = useBoolean(false)
  const [outLoading, setOutLoading] = useBoolean(true)
  const [outPrice, setOutPrice] = useState<string | undefined>(undefined)

  const [interval, setInterval] = useState<number | undefined>(undefined)

  const clear = useInterval(() => {
    if (!inputValue) {
      void clear
      setInterval(undefined)
    }
    handleWatchOutPrice()
  }, interval)

  useEffect(() => {
    if (inputValue) {
      void clear
      setInterval(undefined)
      handleWatchOutPrice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, currentTokens])

  const handleWatchOutPrice = async () => {
    void setOutLoading.setTrue()
    // const { price, isSuccess } =
    //   REACT_APP_ENV === 'dev'
    //     ? await SwapPriceQuery({ formToken: currentToken, toToken: currentTokenOut })
    //     : await SwapPriceQueryBNB({ formToken: currentToken, toToken: currentTokenOut })
    const { price, isSuccess } = await SwapPrice({ formToken: currentTokens[0], toToken: currentTokens[1] })
    if (isSuccess) {
      console.log('price', price, 'isSucees', isSuccess, inputValue)

      let toPrice = new BigNumber(price).times(inputValue)
      setOutPrice(toPrice.toFixed(6))
      void setOutLoading.setFalse()
      if (!inputValue) {
        setInterval(undefined)
        void clear
        void setOutLoading.setTrue()
      } else {
        setInterval(6000)
      }
    }
  }

  const handleOnFinish = async (params: any) => {
    if (!account) return
    if (currentTokens[0].toLowerCase() === currentTokens[1].toLowerCase()) {
      message.warning({
        content: t('message.swap.tips3'),
        className: 'message-global',
      })
      return false
    }
    let contracts = new web3.eth.Contract(GMDToken_ABI, currentTokens[0])
    let balanceOf = currentTokens[0] !== ZORE ? await contracts.methods.balanceOf(account).call() : await web3.eth.getBalance(account),
      decimals = currentTokens[0] === ZORE ? '18' : await contracts.methods.decimals().call()
    let types = SwapSelectOptions.find((item) => item.address.toLowerCase() === currentTokens[0].toLowerCase())?.value
    let balance = fromWeiPowBanlance({ decimals, balance: balanceOf })
    console.log(`${types} balance`, balance)
    if (Number(params.inputValue) > Number(balance)) {
      message.warning({
        content: t('message.swap.tips4', { types, balance }),
        className: 'message-global',
      })
      return
    }
    void setLoading.setTrue()
    let transitData = {
      chain: 'BSC',
      token0: currentTokens[0],
      token1: currentTokens[1],
      decimal0: SwapSelectOptions.find((item) => item.address.toLowerCase() === currentTokens[0].toLowerCase())?.decimals || '18',
      decimal1: SwapSelectOptions.find((item) => item.address.toLowerCase() === currentTokens[1].toLowerCase())?.decimals || '18',
      to: account,
      amountIn: toWeiPowBanlance({
        decimals:
          SwapSelectOptions.find((item) => item.address.toLowerCase() === currentTokens[0].toLowerCase())?.decimals?.toString() || '18',
        balance: params.inputValue,
      }),
      impact: '300',
      amountOutMin: '0',
      part: 10,
      channel: 'PancakeV3',
      issuer: account,
    }
    let res = await transit.swapV1.quoteSwap(transitData)
    if (res.isSuccess) {
      if (currentTokens[0] === ZORE)
        handleSwapImplement({
          dstToken: currentTokens[0],
          data: res.data.data,
          aggregator: res.data.aggregator,
          amountIn: toWeiPowBanlance({ decimals, balance: params.inputValue }),
        })
      else
        hanldeTokensAuthorisation({
          dstToken: currentTokens[0],
          data: res.data.data,
          aggregator: res.data.aggregator,
          amountIn: toWeiPowBanlance({ decimals, balance: params.inputValue }),
          contracts: contracts,
        })
    } else
      message.error({
        content: res.msg,
        className: 'message-global',
      })

    // if (currentToken === ZORE)
    //     handleSwapImplement({
    //       dstToken: currentToken === ZORE ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : currentToken,
    //       tx: data.tx.data,
    //       amountIn: toWeiPowBanlance({ decimals, balance: params.inputValue }),
    //     })
    //   else
    //     hanldeTokensAuthorisation({
    //       dstToken: currentToken === ZORE ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : currentToken,
    //       tx: data.tx.data,
    //       amountIn: toWeiPowBanlance({ decimals, balance: params.inputValue }),
    //       contracts: contracts,
    //     })
  }

  const hanldeTokensAuthorisation = async ({
    contracts,
    amountIn,
    aggregator,
    dstToken,
    data,
  }: {
    contracts: any
    amountIn: string
    aggregator: string
    dstToken: string
    data: string
  }) => {
    let AuthorizedAmount = await contracts.methods.allowance(account, aggregator).call()
    if (Number(AuthorizedAmount) < Number(amountIn || '0')) {
      void setLoading.setTrue()
      contracts.methods
        .approve(aggregator, amountIn)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          handleSwapImplement({ data, aggregator, dstToken, amountIn })
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setLoading.setFalse()
        })
    } else handleSwapImplement({ data, aggregator, dstToken, amountIn })
  }

  const handleSwapImplement = async ({
    data,
    aggregator,
    dstToken,
    amountIn,
  }: {
    data: string
    aggregator: string
    dstToken: string
    amountIn: string
  }) => {
    try {
      web3.eth
        .sendTransaction({
          from: account,
          to: aggregator,
          data: data,
          value: dstToken === ZORE ? amountIn : undefined,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          message.success({
            content: t('message.swap.tips1'),
            className: 'message-global',
          })
          form.resetFields()
          void setIsReset.toggle()
          void setLoading.setFalse()
        })
        .on('error', function (error: any) {
          message.error({
            content: t('message.swap.tips2'),
            className: 'message-global',
          })
          form.resetFields()
          void setLoading.setFalse()
        })
    } catch (error) {
      form.resetFields()
      void setLoading.setFalse()
    }
  }

  const handleSwitchTokens = async () => {
    console.log('sss', currentTokens)
    try {
      setCurrentTokens((list) => {
        list.reverse()
        form.setFieldsValue({
          inputValue: '1',
        })
        setOutPrice(undefined)
        return list
      })
      // setCurrentToken(currentTokenOut)
      // setCurrentTokenOut(currentToken)
      //   form.setFieldsValue({
      //     inputValue: "1",
      //   })
      // setCurrentTokens((arr) => {
      //   let list = JSON.parse(JSON.stringify(arr))
      //   list.reverse()
      //   form.setFieldsValue({
      //     inputValue: list[0].amount || '0',
      //     inputOutValue: list[1].amount || '0',
      //   })
      //   return list
      // })
    } catch (error) {
      console.log('s', error)
    }
  }

  return (
    <SwapContent className="swap-content">
      <Form form={form} initialValues={{ inputValue: 1 }} onFinish={handleOnFinish} className="swap-form">
        <SwapInputDiv>
          <Col span={11} md={{ span: 13 }}>
            <Form.Item name="inputValue" rules={[{ required: true, message: t('swap.form.rule.tips') }]}>
              <SwapInput type="number" step="0.000001" placeholder="0" autoComplete="off" />
            </Form.Item>
            <SwapBalanceDiv>
              {t('swap.balance.tips', {
                msg: tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentTokens[0].toLowerCase())?.balance,
              })}
            </SwapBalanceDiv>
          </Col>
          <Col span={2}></Col>
          <Col span={11} md={{ span: 9 }}>
            <TokensSelect
              values={currentTokens[0]}
              disabled={currentTokens[0]}
              returnClick={(e) =>
                setCurrentTokens((list) => {
                  let lists = JSON.parse(JSON.stringify(list))
                  lists[0] = e
                  return lists
                })
              }
            />
          </Col>
        </SwapInputDiv>
        <SwapChangeIcon onClick={handleSwitchTokens}>
          <Icon component={ChangeSvg}></Icon>
        </SwapChangeIcon>
        <SwapInputDiv>
          <Col span={11} md={{ span: 13 }}>
            {outLoading ? (
              <Skeleton.Input active={outLoading} />
            ) : (
              <SwapInput
                disabled
                type="number"
                value={outPrice}
                defaultValue={outPrice}
                step="0.000001"
                placeholder="0"
                autoComplete="off"
              />
            )}
            <SwapBalanceDiv>
              {t('swap.balance.tips', {
                msg: tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentTokens[1].toLowerCase())?.balance,
              })}
            </SwapBalanceDiv>
          </Col>
          <Col span={2}></Col>
          <Col span={11} md={{ span: 9 }}>
            <TokensSelect
              disabled={currentTokens[0]}
              values={currentTokens[1]}
              returnClick={(e) =>
                setCurrentTokens((list) => {
                  let lists = JSON.parse(JSON.stringify(list))
                  lists[1] = e
                  return lists
                })
              }
            />
          </Col>
        </SwapInputDiv>
        {isActive && (
          <Button
            loading={loading}
            disabled={
              Number(tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentTokens[0].toLowerCase())?.balance) <
              Number(inputValue)
            }
            className={
              Number(tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentTokens[0].toLowerCase())?.balance) <
              Number(inputValue)
                ? 'modal-swap-disabled'
                : 'modal-swap'
            }
            htmlType="submit"
          >
            {Number(tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentTokens[0].toLowerCase())?.balance) <
            Number(inputValue)
              ? t('swap.btn.no', {
                  msg: tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentTokens[0].toLowerCase())?.type,
                })
              : t('swap.btn')}
          </Button>
        )}
      </Form>
      {!isActive && (
        <div className="submit-wallet">
          <ConnectWallet isMinWidth="100%" isPosition="ProfileMouldWeb" />
        </div>
      )}
    </SwapContent>
  )
}

export default SwapModePage
