import { message, Spin } from 'antd'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useParams, useNavigate } from 'react-router-dom'
import { Wrapper, WrapperMode } from './styled'
import { walletConnect } from '@/connectors/walletConnect'
import { metaMask } from '@/connectors/metaMask'
import { DEFAULT_CHAINID } from '@/contracts/constant'
import { getAddChainParameters } from '@/contracts/chains'
import { useTranslation } from 'react-i18next'
import { useUserInfoHooks } from '@/hooks/useUserInfoHooks'
import { getAxiosCurrentAccountPledge } from '@/subgraphs/invite'
import useDataHooks from '@/hooks/useDataHooks'

const InvitePage = () => {
  const { t } = useTranslation()
  const { LiquidityStaking } = useDataHooks().data
  const { account, isActive } = useWeb3React()

  const { users } = useUserInfoHooks({ account })

  let navigate = useNavigate()
  const uriParams = useParams()

  useEffect(() => {
    if (uriParams) handleWatchInviteAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uriParams, isActive, users])

  const handleWatchInviteAddress = async () => {
    try {
      if (uriParams && uriParams.address) {
        if (uriParams.address.toLowerCase() === account?.toLowerCase()) {
          message.info({
            content: t('invite.message.tips1'),
            className: 'message-global',
          })
          setTimeout(() => navigate('/home', { replace: true }), 200)
          return
        }
        if (uriParams.address.toLowerCase() === users.referrer.toLowerCase()) {
          message.info({
            content: t('invite.message.tips2'),
            className: 'message-global',
          })
          setTimeout(() => navigate('/home', { replace: true }), 200)
          return
        }
        handleWatchIsActive()
      } else {
        message.info({
          content: t('invite.message.tips4'),
          className: 'message-global',
        })
        setTimeout(() => {
          navigate('/home', { replace: true })
        }, 200)
      }
    } catch (error) {
      console.log('err', error)
    }
  }

  const handleWatchIsActive = async () => {
    if (isActive) {
      const promise = await Promise.all([
        getAxiosCurrentAccountPledge({ account: account as string }),
        getAxiosCurrentAccountPledge({ account: uriParams.address as string }),
      ]).then((res) => {
        return res[0].depositedList.filter((item) => item.token.toLowerCase() !== LiquidityStaking.toLowerCase()).length === 0 &&
          res[1].depositedList.length > 0
          ? true
          : false
      })
      if (!promise) {
        message.info({
          content: t('invite.message.tips3'),
          className: 'message-global',
        })
        setTimeout(() => navigate('/home', { replace: true }), 200)
        return
      }
      message.success({
        content: t('invite.message.tips5'),
        className: 'message-global',
      })
      setTimeout(() => {
        navigate(`/finance/${uriParams.address}`, { replace: true })
      }, 500)
    } else {
      // @ts-ignore
      const { ethereum } = window as any
      console.log('ethereum', ethereum, ethereum.isMetaMask)
      ethereum && ethereum.isMetaMask
        ? void metaMask.activate(getAddChainParameters(DEFAULT_CHAINID))
        : void walletConnect.activate(DEFAULT_CHAINID)
    }
  }

  return (
    <Wrapper>
      <WrapperMode>
        <Spin size="large" tip={t('app.loading')} />
      </WrapperMode>
    </Wrapper>
  )
}

export default InvitePage
