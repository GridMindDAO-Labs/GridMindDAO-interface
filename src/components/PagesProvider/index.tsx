import { memo, useEffect } from 'react'
import { Adapth5 } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { useChainIdHooks } from '@/hooks/useChainIdHooks'

export default memo(function PagesProvider({ children }: any) {
  useChainIdHooks()
  const { windowSize } = useWindowSizeHooks()

  useEffect(() => {
    if (windowSize.innerWidth < 1920 && windowSize.innerWidth >= 1200) {
      let fontSize = `${(windowSize.innerWidth / 1920) * 100 > 63 ? ((windowSize.innerWidth / 1920) * 100).toFixed(2) : 62.5}%`
      document.documentElement.style.fontSize = fontSize
    } else if (windowSize.innerWidth < 1200 && windowSize.innerWidth >= Adapth5) {
      let fontSize = `${(windowSize.innerWidth / 1200) * 100 > 63 ? ((windowSize.innerWidth / 1200) * 100).toFixed(2) : 62.5}%`
      document.documentElement.style.fontSize = fontSize
    } else if (windowSize.innerWidth < Adapth5) {
      // let fontSize = `${(windowSize.innerWidth / Adapth5) * 100 > 63 ? ((windowSize.innerWidth / Adapth5) * 100).toFixed(2) : 62.5}%`
      document.documentElement.style.fontSize = '100%'
    } else document.documentElement.style.fontSize = '100%'
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.innerWidth])

  return children
})
