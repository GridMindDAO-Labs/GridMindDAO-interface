import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_CHAINID } from '@/contracts/constant'

const initState = {
  network: localStorage.getItem('chainId') ? Number(localStorage.getItem('chainId')) : DEFAULT_CHAINID ? DEFAULT_CHAINID : 1,
  islogin: localStorage.getItem('isLogin') ? true : false,
  wallet: localStorage.getItem('wallet') || 'NetWork',
}

const wallet = createSlice({
  name: 'userInfo',
  initialState: initState,
  reducers: {
    SaveIsLogin: (state, action) => {
      state.islogin = action.payload
    },
    SaveNetwork: (state, action) => {
      state.network = action.payload
    },
    SaveWallet: (state, action) => {
      state.wallet = action.payload
    },
  },
})

export const { SaveIsLogin, SaveNetwork, SaveWallet } = wallet.actions

export const selectIsLogin = (state: any) => state.wallet.islogin
export const selectNetwork = (state: any) => state.wallet.network
export const selectWallet = (state: any) => state.wallet.wallet
export const selectWalletInfo = (state: any) => state.wallet

export default wallet.reducer
