import { useContext } from 'react'
import type { AwsStorageClientTypes } from '@/contracts/aws'
import { Context } from '@/components/Web3Provider'

const useAwsHooks = () => {
  const { awsStore }: { awsStore: AwsStorageClientTypes } = useContext<any>(Context)
  return awsStore
}

export default useAwsHooks
