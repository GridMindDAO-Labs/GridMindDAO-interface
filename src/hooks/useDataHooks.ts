import { useContext } from 'react'
import type { ConstantInitTypes } from '@/contracts/constant.init'
import { Context } from '@/components/Web3Provider'

export interface DataTypes {
  data: ConstantInitTypes
  blockNumber?: number
}

const useDataHooks = () => {
  const { data, blockNumber }: DataTypes = useContext<any>(Context)
  return { data, blockNumber }
}

export default useDataHooks
