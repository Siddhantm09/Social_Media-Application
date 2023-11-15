import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserProfile = createAsyncThunk(
    "users/getUserProfile",
    async (body) => {
        try {
            const response = await axiosClient.post("/user/getUserprofile", body);
            // console.log(response, "getUserprofile");
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const likeAndUnlike = createAsyncThunk(
    "posts/likeAndUnlike",
    async (body) => {
        try {
            const response = await axiosClient.post("/posts/like", body);
            // console.log(response, "likeandUnlike");
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);
const postSlice = createSlice({
    name: "postSlice",
    initialState: { userProfile: {} },

    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(likeAndUnlike.fulfilled, (state, action) => {
                const post = action.payload;
                //check if likedorUnliked post is present in the userProfile.allposts
                const ifPresentidx = state.userProfile?.allposts?.findIndex(
                    (item) => post.post._id === item._id
                );
                if (ifPresentidx !== -1 && ifPresentidx !== undefined) {
                    //undefined for the case of post is likedorUnliked in feed page(i.e user profile is empty)
                    state.userProfile.allposts[ifPresentidx] = post.post; //likedorUnliked post replaced with current post
                }
            });
    },
});
export const { isLiked } = postSlice.actions;
export default postSlice.reducer;
