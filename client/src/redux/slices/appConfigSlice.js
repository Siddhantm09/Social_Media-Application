import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const getMyInfo = createAsyncThunk('users/myprofileInfo', (body, thunkAPI) => { })




const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: { isloading: false },
    reducers: {

        setLoading: (state, action) => {

            state.isloading = action.payload
        }
    }
})
export const { setLoading } = appConfigSlice.actions
export default appConfigSlice.reducer 