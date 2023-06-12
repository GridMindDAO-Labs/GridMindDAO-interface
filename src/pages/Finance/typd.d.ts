import { RateUpdatedTypes } from '@/subgraphs/type'

export type ChildTypes = {
  handleIsRefreshOut: () => void
  handleOnShowClick: ({ type, tokens }: { type: 'AiToken' | 'General'; tokens: string }) => void
  currentInterestRate: RateUpdatedTypes[]
}

export type GmdTokenFinanceListType = {
  value: number
  usdAmount: string
  id: string
}

export type UniversalFinanceListType = {
  value: number
  token: string
  usdAmount: string
  id: string
}

export type StableVariableDepositTyes = {
  token: string
  amount: string
  constant: any
}
