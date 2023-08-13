import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
export const getMyInfo = createAsyncThunk('users/myprofileInfo', async (body, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient('/user/getMyInfo')
        console.log(response);
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false))
    }
})




const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: { isloading: false, myProfile: {} },
    reducers: {

        setLoading: (state, action) => {

            state.isloading = action.payload
        }
    }
    ,
})
export const { setLoading } = appConfigSlice.actions
export default appConfigSlice.reducer 