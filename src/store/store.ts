import { configureStore } from "@reduxjs/toolkit"
import extratoFilterReducer from "./ExtratoFilter"
import pdfReducer from "@store/UploadPDF"

export const store = configureStore({
  reducer: {
    extratoFilter: extratoFilterReducer,
    pdf: pdfReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
