import { createSlice } from '@reduxjs/toolkit'

const initState = {
  themeBoolean: false,
}

const theme = createSlice({
  name: 'theme',
  initialState: initState,
  reducers: {
    SaveTheme: (state, action) => {
      state.themeBoolean = action.payload
    },
  },
})

export const { SaveTheme } = theme.actions

export const selectThemeBoolean = (state: any) => state.theme.themeBoolean

export default theme.reducer
