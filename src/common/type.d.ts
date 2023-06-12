export type AbiMethodTypeInputs = {
  name: string
  type: string
  value: string
  id: string
}

export type AbiMethodType = {
  name: string
  key: number
  inputs: AbiMethodTypeInputs[]
  jsonInterface: object
  value: string
}

export type ContractListType = {
  id: number
  address: string
  abi: any
  abiMethod: AbiMethodType[]
  currentMethod: undefined | string
  isAddressAndAbiTrue: boolean
}

export type WaitImplementType = {
  contractAddress: string
  jsonInterface: object
  parameters: any[]
  name: string
}

export type TokenSelectOptionsType = {
  value: string
  icon: JSX.Element
  address: string
  decimals?: number
}
