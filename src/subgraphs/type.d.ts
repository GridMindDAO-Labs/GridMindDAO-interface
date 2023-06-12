export type ForVotesTypes = {
  support?: boolean
  voter: string
  weight: string
}

export type ProposalsListTypes = {
  forVotes: ForVotesTypes[]
  proposalId: string
  proposer: string
  startBlock: string
  state: string
  targets: string[]
  transactionHash: string
  id: string
  calldatas: string[]
  description: string
  endBlock: string
  values: number[]

  isSuccess?: boolean
  isSuccessVotes?: number
  isErrorVotes?: number
}

export type GovernanceTotalTypes = {
  totalProposal: string
}

export type RateUpdatedTypes = {
  id: string
  newRate: string
  token: string
  date: string
}

export type DepositedListTypes = {
  gmdTokenRevenues: string
  amount: string
  createAt: string
  governanceVotes: string
  id: string
  isRedeem: boolean
  maturityAt: string
  orderHash: string
  token: string
  account: string
  nftTokenId: string
  liquiditesAmount: string
}

export type AccountHistoryCountTypes = {
  totalLiquidityRevenue: string
  totalLiquidityVotes: string
  id?: string
  totalStaticFinancialRevenue: string
}

export type DelegatesListCountTypes = {
  totalLiquidityValidNOldVotes: string
  totalLiquidityValidNewVotes: string
}

export type DelegatesListTypes = {
  walletVotes: string
  transferVotes?: number
  totalVotes: string
  isDelegate: boolean
  id: string
  delegateAddress: string
  gmdTokenAmountAmount: string
  account: string
  votingRecords: ProposalsListTypes[]
  flowabilityAitoken: string
}

export interface UserInviteeListTypes {
  amount: string
  account: string
  createAt: string
  id: string
  inviter: string
}
