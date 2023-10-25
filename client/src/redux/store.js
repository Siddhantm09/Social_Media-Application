import { configureStore } from '@reduxjs/toolkit'
import appConfigSlice from './slices/appConfigSlice'
import postSlice from './slices/postSlice'
export default configureStore({
    reducer: {
        appConfigSlice,
        postSlice

    }
})