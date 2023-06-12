import { useEffect, useState } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import { TOKEN_IMAGE_BASE64 } from '@/utils'

type Types = {
  account: string | undefined
  isRefresh: boolean
}

type MyNFTListInfo = {
  tokenId: string
  name: string
  image: string
  tickLower: string
  tickUpper: string
  token0: string
  token1: string
  fee: string
}

const PositionsFees: { value: string; label: string }[] = [
  { value: '100', label: '0.01%' },
  { value: '500', label: '0.05%' },
  { value: '2500', label: '0.25%' },
  { value: '10000', label: '1%' },
]

export function useLiquidityToken({ account, isRefresh }: Types) {
  const { constant, symbolETH, symbolETHs } = useDataHooks().data

  const [myNftLists, setMyNftLists] = useState<MyNFTListInfo[]>([])
  const [myNftListsLoading, setMyNftListsLoading] = useState(false)

  useEffect(() => {
    if (account) getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isRefresh])

  const getList = async () => {
    try {
      setMyNftListsLoading(true)
      let fee = await constant.ContractFinancing.methods.poolFee().call()
      let tokens: MyNFTListInfo[] = []
      let tokenInfo: string[] = []
      let num = await constant.ContractUniswapLiquidity.methods.balanceOf(account).call()
      for (let i = 0; i < num; i++) {
        tokenInfo.push(constant.ContractUniswapLiquidity.methods.tokenOfOwnerByIndex(account, i).call())
      }
      await Promise.all(tokenInfo).then((tokenId) => {
        return Promise.all(
          tokenId.map(async (tokenId) => {
            let positions = await constant.ContractUniswapLiquidity.methods.positions(tokenId).call()
            if (
              positions &&
              positions.fee === fee &&
              positions.token0.toLowerCase() === symbolETHs[0].toLowerCase() &&
              positions.token1.toLowerCase() === symbolETHs[1].toLowerCase()
            ) {
              let isValidNftPosition = await constant.ContractLiquidityStaking.methods.isValidNftPosition(tokenId).call()
              if (isValidNftPosition)
                tokens.push({
                  tokenId: tokenId,
                  name: symbolETH,
                  image: TOKEN_IMAGE_BASE64,
                  tickLower: positions.tickLower,
                  tickUpper: positions.tickUpper,
                  token0: positions.token0,
                  token1: positions.token1,
                  fee: PositionsFees.find((pf) => pf.value === positions.fee)?.label || '',
                })
            }
          }),
        )
      })
      tokens.sort((a, b) => Number(b.tokenId) - Number(a.tokenId))
      console.log('userTokens', tokens)
      setMyNftLists(tokens)
      setMyNftListsLoading(false)
    } catch (error) {
      console.log('error', error)
      setMyNftListsLoading(false)
    }
  }

  return { myNftLists, myNftListsLoading, setMyNftListsLoading }
}

export async function _fetchTokenData(uri: string) {
  const reponse = await fetch(uri)
  return await reponse.json()
}
