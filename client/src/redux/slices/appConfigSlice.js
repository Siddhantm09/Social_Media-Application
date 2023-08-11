import { createSlice } from '@reduxjs/toolkit'

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: { isloading: false },
    reducers: {

        setLoading: (state, action) => {

            state.isloading = action.payload
        }
    }
})

export default appConfigSlice.reducer