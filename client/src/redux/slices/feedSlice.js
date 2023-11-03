import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
import { setLoading } from './appConfigSlice'

export const getFeedData = createAsyncThunk('users/getUserFeed', async (body, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))

        const response = await axiosClient.post('', body)
        // console.log(response, "getUserprofile");

        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false))
    }
})

const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: { feedData: {} },

    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled, (state, action) => { state.feedData = action.payload })


    }
})
// export const { isLiked } = feedSlice.actions
export default feedSlice.reducer 