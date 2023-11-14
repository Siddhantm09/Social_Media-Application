import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
import { setLoading } from './appConfigSlice'
import { likeAndUnlike } from './postSlice'

export const getFeedData = createAsyncThunk('users/getUserFeed', async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient.get('/user/getFeedData')
        // console.log(response.result, "getFeedData");
        //console.log("response of getFeedData", response.result);
        return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false))
    }

})


export const followAndUnfollow = createAsyncThunk('users/getFOUUser', async (body, thunkAPI) => {
    try {

        thunkAPI.dispatch(setLoading(true))

        const response = await axiosClient.post('/user/follow', body)

        console.log("response of getFOUUser", response.result.user);
        return response.result.user
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
                const post = action.payload
                //check if likedorUnliked post is present in the userProfile.allposts
                const ifPresentidx = state.feedData?.MappedFollowingposts?.findIndex((item) => item._id === post.post._id);
                if (ifPresentidx !== undefined && ifPresentidx !== -1) {
                    state.feedData.MappedFollowingposts[ifPresentidx] = post.post//likedorUnliked post replaced with current post
                }

            })
            .addCase(followAndUnfollow.fulfilled, (state, action) => {
                const userToFollow = action.payload
                const index = state?.feedData?.followings?.findIndex((item) => item._id === userToFollow?._id)
                //following me tha userToFollow pehle se aur hamne controller me followings se nikala , so yaha se bhi nikalo 
                if (index !== -1) {
                    state?.feedData?.followings?.splice(index, 1)
                }
                //following me nahi tha userToFollow pehle se aur hamne controller me followings se dala , so yaha se bhi dalo 
                else {
                    state?.feedData?.followings?.push(userToFollow)
                }

            })
    }
})
// export const { isLiked } = feedSlice.actions
export default feedSlice.reducer 