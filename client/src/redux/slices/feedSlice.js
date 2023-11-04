import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
import { setLoading } from './appConfigSlice'
import { likeAndUnlike } from './postSlice'

export const getFeedData = createAsyncThunk('users/getUserFeed', async (_, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))

        const response = await axiosClient.get('/user/getFeedData')
        //console.log(response.result, "getFeedData");
        console.log("response of getFeedData", response.result);
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

            .addCase(likeAndUnlike.fulfilled, (state, action) => {
                console.log(action.payload);
                const post = action.payload
                //check if likedorUnliked post is present in the userProfile.allposts
                const ifPresentidx = state.feedData?.MappedFollowingposts?.findIndex((item) => item._id === post.post._id);
                if (ifPresentidx !== -1) {
                    state.feedData.MappedFollowingposts[ifPresentidx] = post.post//likedorUnliked post replaced with current post
                }

            })

    }
})
// export const { isLiked } = feedSlice.actions
export default feedSlice.reducer 