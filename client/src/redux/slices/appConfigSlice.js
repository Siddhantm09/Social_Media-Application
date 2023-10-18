import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
export const getMyInfo = createAsyncThunk('users/myprofileInfo', async (body, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient('/user/getMyInfo')
        return response.result.currUser
        // console.log(response);
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false))
    }
})

export const updateProfileThunk = createAsyncThunk('user/updateProfile', async (body, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const user = await axiosClient.put('/user/updateProfile', body)
        console.log(user, "thunkUser");
    } catch (error) {

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
    }
})
export const { setLoading } = appConfigSlice.actions
export default appConfigSlice.reducer 