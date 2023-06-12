import { useEffect } from 'react'
import { useRafState } from 'ahooks'

export function useWindowSizeHooks() {
  const [state, setState] = useRafState({
    innerHeight: 0,
    innerWidth: 0,
  })

  useEffect(() => {
    const onResize = () => {
      setState({
        innerWidth: document.documentElement.clientWidth,
        innerHeight: document.documentElement.clientHeight,
      })
    }
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { windowSize: state }
}
