import { useMemo } from 'react'
import { useScroll } from 'ahooks'
import BigNumber from 'bignumber.js'

export const useScrollTransparent = () => {
  const scroll = useScroll(document)

  return useMemo<number>(() => {
    if (!scroll) return 0
    return new BigNumber(scroll.top).div(100).toNumber() >= 1 ? 1 : new BigNumber(scroll.top).div(100).toNumber()
  }, [scroll])
}
