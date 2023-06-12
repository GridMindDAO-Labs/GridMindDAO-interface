import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import themeReducer from './theme'
import walletReducer from './wallet'

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    wallet: walletReducer,
  },
})
