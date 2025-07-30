import { configureStore } from "@reduxjs/toolkit"
import extratoFilterReducer from "./ExtratoFilter"

export const store = configureStore({
  reducer: {
    extratoFilter: extratoFilterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
