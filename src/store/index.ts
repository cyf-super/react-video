import { configureStore } from '@reduxjs/toolkit'
import filesReducer from './slices/fileslice'

const store = configureStore({
  reducer: {
    files: filesReducer,
  },
})

export default store
