import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { followAndUnfollow } from "./feedSlice";
export const getMyInfo = createAsyncThunk("users/myprofileInfo", async () => {
    try {
        const response = await axiosClient.get("/user/getMyInfo");
        // console.log(response, "getMyInfo");
        return response.result.currUser;
    } catch (error) {
        return Promise.reject(error);
    }
});

export const updateProfileThunk = createAsyncThunk(
    "user/updateProfile",
    async (body) => {
        try {
            const response = await axiosClient.put("/user/update", body);
            console.log(response);
            return response.result.user;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
);

const appConfigSlice = createSlice({
    name: "appConfigSlice",
    initialState: { isloading: false, myProfile: {}, toastData: {}, setTheme: true },
    reducers: {
        setLoading: (state, action) => {
            state.isloading = action.payload;
        },
        setToast: (state, action) => {
            state.toastData = action.payload;
        },
        setTheme: (state, action) => {
            console.log(action.payload);
            state.setTheme = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyInfo.fulfilled, (state, action) => {
                state.myProfile = action.payload;
            })
            .addCase(updateProfileThunk.fulfilled, (state, action) => {
                state.myProfile = action.payload;
            })
            .addCase(followAndUnfollow.fulfilled, (state, action) => {
                const userToFollow = action.payload;
                const index = state?.myProfile?.followings?.findIndex(
                    (item) => item._id === userToFollow?._id
                );
                //following me tha userToFollow pehle se aur hamne controller me followings se nikala , so yaha se bhi nikalo
                if (index !== -1) {
                    state?.myProfile?.followings?.splice(index, 1);
                }
                //following me nahi tha userToFollow pehle se aur hamne controller me followings se dala , so yaha se bhi dalo
                else {
                    state?.myProfile?.followings?.push(userToFollow);
                }
            });
    },
});
export const { setLoading, setToast, setTheme } = appConfigSlice.actions;
export default appConfigSlice.reducer;
