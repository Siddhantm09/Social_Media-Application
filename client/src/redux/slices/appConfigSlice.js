import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
export const getMyInfo = createAsyncThunk('users/myprofileInfo', async (body, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient.get('/user/getMyInfo')
        console.log(response, "getMyInfo");
        return response.result.currUser
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false))
    }
})

export const updateProfileThunk = createAsyncThunk('user/', async (body, thunkAPI) => {

    try {
        // console.log(body);
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient.put("/user/update", body)
        console.log(response);
        return response.result
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

        builder
            .addCase(getMyInfo.fulfilled, (state, action) => { state.myProfile = action.payload })
            .addCase(updateProfileThunk.fulfilled, (state, action) => { state.myProfile = action.payload.user })
    }
})
export const { setLoading } = appConfigSlice.actions
export default appConfigSlice.reducer 