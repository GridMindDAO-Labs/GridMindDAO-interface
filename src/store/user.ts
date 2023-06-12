import { createSlice } from '@reduxjs/toolkit'

const initState = {
  user: {},
  address: '',
}

const user = createSlice({
  name: 'userInfo',
  initialState: initState,
  reducers: {
    SaveUser: (state, action) => {
      state.user = action.payload
    },
    SaveAddress: (state, action) => {
      state.address = action.payload
    },
  },
})

export const { SaveUser, SaveAddress } = user.actions

export const selectAddress = (state: any) => state.user.address
export const selectUserInfo = (state: any) => state.user.user

export default user.reducer
