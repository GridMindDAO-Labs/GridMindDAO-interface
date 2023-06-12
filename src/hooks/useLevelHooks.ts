import { useState, useCallback, useEffect } from 'react'
import useDataHooks from '@/hooks/useDataHooks'

export type LevelsTypes = {
  intermediateCommunities: string
  juniorCommunities: string
  regularCommunities: string
  seniorCommunities: string
}

const LevelsInit: LevelsTypes = {
  intermediateCommunities: '0',
  juniorCommunities: '0',
  regularCommunities: '0',
  seniorCommunities: '0',
}

export function useLevelHooks({ account }: { account: string | undefined }) {
  const { constant } = useDataHooks().data
  const [levels, setLevels] = useState<LevelsTypes>(LevelsInit)

  const levelss = useCallback(async () => {
    if (!account) return
    let levelsInfo = await constant.ContractInvitationRewards.methods.levels(account).call()
    setLevels(levelsInfo)
  }, [account, constant.ContractInvitationRewards.methods])

  useEffect(() => {
    levelss()
  }, [levelss])

  return { levels }
}
