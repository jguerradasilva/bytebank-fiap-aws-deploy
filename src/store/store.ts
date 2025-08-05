import { configureStore } from "@reduxjs/toolkit"
import extratoFilterReducer from "./ExtratoFilter"
import pdfReducer from "@store/UploadPDF"
import authReducer from "@store/Auth/"

export const store = configureStore({
  reducer: {
    extratoFilter: extratoFilterReducer,
    pdf: pdfReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
