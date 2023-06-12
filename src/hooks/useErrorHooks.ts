import type { Web3ReactHooks } from '@web3-react/core'

export const getErrorMessage = (error: ReturnType<Web3ReactHooks['useError']> | Error | any) => error.message
