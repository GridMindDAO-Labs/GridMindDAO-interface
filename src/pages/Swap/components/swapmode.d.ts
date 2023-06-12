// import { useEffect, useState } from 'react'
// import { Form, Button, message, Skeleton, Col } from 'antd'
// import { SwapContent, SwapChangeIcon, SwapInputDiv, SwapInput, SwapBalanceDiv } from '@/pages/Swap/styled'
// import Icon from '@ant-design/icons'
// import { useWeb3React } from '@web3-react/core'
// import { ChangeSvg } from '@/pages/Swap/icon'

// import TokensSelect from '@/components/TokensSelect/swap'
// import ConnectWallet from '@/components/ConnectWallet'
// import { useTranslation } from 'react-i18next'
// import useDataHooks from '@/hooks/useDataHooks'
// import type { DataTypes } from '@/hooks/useDataHooks'
// import { GMDToken_ABI } from '@/contracts/constant'
// import axios from 'axios'
// import { useBoolean, useInterval } from 'ahooks'
// import { SwapPriceQuery } from '@/contracts/swapPriceQuery'
// import { REACT_APP_ENV } from '@/contracts/chains'
// import { SwapPriceQuery as SwapPriceQueryBNB } from '@/contracts/swapPriceQueryBnb'
// import { ZORE } from '@/contracts/tokenList'
// import BigNumber from 'bignumber.js'
// import { useSwapHooks } from '@/hooks/useSwapHooks'

// const SwapModePage = () => {
//   const dataInit: DataTypes = useDataHooks()
//   const { SwapSelectOptions, constant, Swap_Address, web3, fromWeiPowBanlance, toWeiPowBanlance } = dataInit.data

//   const { t } = useTranslation()
//   const { isActive, account } = useWeb3React()
//   const [form] = Form.useForm()
//   const inputValue = Form.useWatch('inputValue', form)

//   const [isReset, setIsReset] = useBoolean(false)
//   const { tokenCurrentAccountPrice } = useSwapHooks({ account, isReset })

//   const [currentToken, setCurrentToken] = useState<string>(SwapSelectOptions[0].address)
//   const [currentTokenOut, setCurrentTokenOut] = useState<string>(SwapSelectOptions[1].address)

//   const [loading, setLoading] = useBoolean(false)
//   const [outLoading, setOutLoading] = useBoolean(true)
//   const [outPrice, setOutPrice] = useState<string | undefined>(undefined)

//   const [interval, setInterval] = useState<number | undefined>(undefined)

//   const clear = useInterval(() => {
//     if (!inputValue) {
//       void clear
//       setInterval(undefined)
//     }
//     handleWatchOutPrice()
//   }, interval)

//   useEffect(() => {
//     if (inputValue) {
//       void clear
//       setInterval(undefined)
//       handleWatchOutPrice()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [inputValue, currentToken, currentTokenOut])

//   const handleWatchOutPrice = async () => {
//     void setOutLoading.setTrue()
//     const { price, isSuccess } =
//       REACT_APP_ENV === 'dev'
//         ? await SwapPriceQuery({ formToken: currentToken, toToken: currentTokenOut })
//         : await SwapPriceQueryBNB({ formToken: currentToken, toToken: currentTokenOut })
//     if (isSuccess) {
//       console.log('price', price, 'isSucees', isSuccess, inputValue)

//       let toPrice = new BigNumber(price).times(inputValue)
//       setOutPrice(toPrice.toFixed(6))
//       void setOutLoading.setFalse()
//       if (!inputValue) {
//         setInterval(undefined)
//         void clear
//         void setOutLoading.setTrue()
//       } else setInterval(6000)
//     }
//   }

//   const handleOnFinish = async (params: any) => {
//     if (!account) return
//     if (currentToken.toLowerCase() === currentTokenOut.toLowerCase()) {
//       message.warning({
//         content: t('message.swap.tips3'),
//         className: 'message-global',
//       })
//       return false
//     }
//     let contracts = new web3.eth.Contract(GMDToken_ABI, currentToken)
//     let balanceOf = currentToken !== ZORE ? await contracts.methods.balanceOf(account).call() : await web3.eth.getBalance(account),
//       decimals = currentToken === ZORE ? '18' : await contracts.methods.decimals().call()
//     let types = SwapSelectOptions.find((item) => item.address.toLowerCase() === currentToken.toLowerCase())?.value
//     let balance = fromWeiPowBanlance({ decimals, balance: balanceOf })
//     console.log(`${types} balance`, balance)
//     if (Number(params.inputValue) > Number(balance)) {
//       message.warning({
//         content: t('message.swap.tips4', { types, balance }),
//         className: 'message-global',
//       })
//       return
//     }
//     void setLoading.setTrue()
//     let paramsObj = {
//       amount: toWeiPowBanlance({ decimals, balance: params.inputValue }),
//       fromTokenAddress: currentToken === ZORE ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : currentToken,
//       toTokenAddress: currentTokenOut === ZORE ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : currentTokenOut,
//       slippage: 5,
//       destReceiver: account,
//       fromAddress: Swap_Address,
//       disableEstimate: true,
//     }
//     // console.log(balanceOf, decimals)
//     // console.log('balance',balance)
//     // console.log(params, currentToken, currentTokenOut)
//     const data = await handleAxios(paramsObj)
//     if (data.tx && data.tx.data) {
//       console.log('data', data.tx.data)
//       if (currentToken === ZORE)
//         handleSwapImplement({
//           dstToken: currentToken === ZORE ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : currentToken,
//           tx: data.tx.data,
//           amountIn: toWeiPowBanlance({ decimals, balance: params.inputValue }),
//         })
//       else
//         hanldeTokensAuthorisation({
//           dstToken: currentToken === ZORE ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : currentToken,
//           tx: data.tx.data,
//           amountIn: toWeiPowBanlance({ decimals, balance: params.inputValue }),
//           contracts: contracts,
//         })
//     }
//   }

//   const hanldeTokensAuthorisation = async ({
//     contracts,
//     amountIn,
//     tx,
//     dstToken,
//   }: {
//     contracts: any
//     amountIn: string
//     tx: string
//     dstToken: string
//   }) => {
//     let AuthorizedAmount = await contracts.methods.allowance(account, Swap_Address).call()
//     if (Number(AuthorizedAmount) < Number(amountIn || '0')) {
//       void setLoading.setTrue()
//       contracts.methods
//         .approve(Swap_Address, amountIn)
//         .send({
//           from: account,
//         })
//         .on('transactionHash', function (hash: any) {
//           console.log(hash)
//         })
//         .on('receipt', async (receipt: any) => {
//           handleSwapImplement({ amountIn, tx, dstToken })
//         })
//         .on('error', function (error: any, receipt: any) {
//           message.error({
//             content: error.message,
//             className: 'message-global',
//           })
//           void setLoading.setFalse()
//         })
//     } else handleSwapImplement({ amountIn, tx, dstToken })
//   }

//   const handleSwapImplement = async ({ tx, dstToken, amountIn }: { tx: string; dstToken: string; amountIn: string }) => {
//     console.log('tx', tx)
//     console.log('dstToken', dstToken)
//     console.log('amountIn', amountIn)
//     let params: any = {
//       from: account,
//     }
//     if (dstToken === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
//       params.value = amountIn
//     }
//     console.log('params', params)
//     try {
//       constant.ContractSwap.methods
//         .swap(dstToken, amountIn, tx)
//         .send(params)
//         .on('transactionHash', function (hash: any) {
//           console.log(hash)
//         })
//         .on('receipt', function (receipt: any) {
//           message.success({
//             content: t('message.swap.tips1'),
//             className: 'message-global',
//           })
//           form.resetFields()
//           void setIsReset.toggle()
//           void setLoading.setFalse()
//         })
//         .on('error', function (error: any, receipt: any) {
//           console.log(receipt)
//           message.error({
//             content: t('message.swap.tips2'),
//             className: 'message-global',
//           })
//           form.resetFields()
//           void setLoading.setFalse()
//         })
//     } catch (error) {
//       form.resetFields()
//       void setLoading.setFalse()
//     }
//   }

//   const handleAxios = async (params: any): Promise<any> => {
//     try {
//       const { data } = await axios.get('https://api.1inch.io/v4.0/56/swap', {
//         params: params,
//       })
//       return data
//     } catch (error: any) {
//       message.error({
//         content: error.message,
//         className: 'message-global',
//       })
//       form.resetFields()
//       void setLoading.setFalse()
//       return undefined
//     }
//   }

//   return (
//     <SwapContent className="swap-content">
//       <Form form={form} initialValues={{ inputValue: 1 }} onFinish={handleOnFinish} className="swap-form">
//         <SwapInputDiv>
//           <Col span={11} md={{ span: 13 }}>
//             <Form.Item name="inputValue" rules={[{ required: true, message: t('swap.form.rule.tips') }]}>
//               <SwapInput type="number" step="0.000001" placeholder="0" autoComplete="off" />
//             </Form.Item>
//             <SwapBalanceDiv>
//               {t('swap.balance.tips', {
//                 msg: tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentToken.toLowerCase())?.balance,
//               })}
//             </SwapBalanceDiv>
//           </Col>
//           <Col span={2}></Col>
//           <Col span={11} md={{ span: 9 }}>
//             <TokensSelect disabled={currentTokenOut} returnClick={(e) => setCurrentToken(e)} />
//           </Col>
//         </SwapInputDiv>
//         <SwapChangeIcon>
//           <Icon component={ChangeSvg}></Icon>
//         </SwapChangeIcon>
//         <SwapInputDiv>
//           <Col span={11} md={{ span: 13 }}>
//             {outLoading ? (
//               <Skeleton.Input active={outLoading} />
//             ) : (
//               <SwapInput
//                 disabled
//                 type="number"
//                 value={outPrice}
//                 defaultValue={outPrice}
//                 step="0.000001"
//                 placeholder="0"
//                 autoComplete="off"
//               />
//             )}
//             <SwapBalanceDiv>
//               {t('swap.balance.tips', {
//                 msg: tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentTokenOut.toLowerCase())?.balance,
//               })}
//             </SwapBalanceDiv>
//           </Col>
//           <Col span={2}></Col>
//           <Col span={11} md={{ span: 9 }}>
//             <TokensSelect disabled={currentToken} values={currentTokenOut} returnClick={(e) => setCurrentTokenOut(e)} />
//           </Col>
//         </SwapInputDiv>
//         {isActive && (
//           <Button
//             loading={loading}
//             disabled={
//               Number(tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentToken.toLowerCase())?.balance) <
//               Number(inputValue)
//             }
//             className={
//               Number(tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentToken.toLowerCase())?.balance) <
//               Number(inputValue)
//                 ? 'modal-swap-disabled'
//                 : 'modal-swap'
//             }
//             htmlType="submit"
//           >
//             {Number(tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentToken.toLowerCase())?.balance) <
//             Number(inputValue)
//               ? t('swap.btn.no', {
//                   msg: tokenCurrentAccountPrice.find((o) => o.token.toLowerCase() === currentToken.toLowerCase())?.type,
//                 })
//               : t('swap.btn')}
//           </Button>
//         )}
//       </Form>
//       {!isActive && (
//         <div className="submit-wallet">
//           <ConnectWallet isMinWidth="100%" isPosition="ProfileMouldWeb" />
//         </div>
//       )}
//     </SwapContent>
//   )
// }

// export default SwapModePage
