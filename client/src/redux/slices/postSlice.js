import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
import { setLoading } from './appConfigSlice'
export const getUserProfile = createAsyncThunk('users/getUserProfile', async (body, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))

        const response = await axiosClient.post('/user/getUserprofile', body)
        // console.log(response, "getUserprofile");

        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false))
    }
})


const postSlice = createSlice({
    name: 'postSlice',
    initialState: { userProfile: {} },

    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => { state.userProfile = action.payload })

    }
})

export default postSlice.reducer 