import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setLoading } from '../../redux/slices/appConfigSlice'
import { axiosClient } from "../../utils/axiosClient";
import { getUserProfile } from "../../redux/slices/postSlice";
import { useParams } from "react-router-dom";
const Post = (post) => {
    const params = useParams();
    const dispatch = useDispatch();
    const isLiked = async (postId) => {
        try {
            dispatch(setLoading(true))

            await axiosClient.post('/posts/like', { postId })
            //to update the user profile with liked post data
            dispatch(getUserProfile({
                userId: params.userId,//url id we are sending to BE
            }))
        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch(setLoading(false))
        }

    }
    // console.log(post);
    return (
        <div className="Post">
            <div className="heading">
                <Avatar />
                <h4>{post?.value?.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={post?.value?.image?.url} alt="" />
            </div>
            <div className="footer">
                <div className="like">
                    {post?.value?.isLiked ? (
                        <i
                            className="fa-solid fa-heart"
                            style={{ color: "#ee3a3a", fontSize: "20px" }} onClick={() => isLiked(post?.value?._id)}
                        ></i>
                    ) : (
                        <AiOutlineHeart className="icon" onClick={() => isLiked(post?.value?._id)} />
                    )}
                    <h4>{post?.value?.likesCount}</h4>
                </div>
                <p className="caption">{post?.value?.caption}</p>
                <p className="time-ago">4 hours ago</p>
                {/* <div>
                    <button>Delete</button>
                </div> */}
            </div>
        </div>
    );
};

export default Post;
