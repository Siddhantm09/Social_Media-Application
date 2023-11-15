import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
import { followAndUnfollow } from './feedSlice'
export const getMyInfo = createAsyncThunk('users/myprofileInfo', async (body, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient.get('/user/getMyInfo')
        // console.log(response, "getMyInfo");
        return response.result.currUser
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false))
    }
})

export const updateProfileThunk = createAsyncThunk('user/updateProfile', async (body, thunkAPI) => {
    try {

        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient.put("/user/update", body)
        console.log(response);
        return response.result.user
    } catch (error) {
        console.log(error);
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
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => { state.myProfile = action.payload })
            .addCase(updateProfileThunk.fulfilled, (state, action) => { state.myProfile = action.payload }).addCase(followAndUnfollow.fulfilled, (state, action) => {
                const userToFollow = action.payload
                const index = state?.myProfile?.followings?.findIndex((item) => item._id === userToFollow?._id)
                //following me tha userToFollow pehle se aur hamne controller me followings se nikala , so yaha se bhi nikalo 
                if (index !== -1) {
                    state?.myProfile?.followings?.splice(index, 1)
                }
                //following me nahi tha userToFollow pehle se aur hamne controller me followings se dala , so yaha se bhi dalo 
                else {
                    state?.myProfile?.followings?.push(userToFollow)
                }

            })
    }
})
export const { setLoading } = appConfigSlice.actions
export default appConfigSlice.reducer 