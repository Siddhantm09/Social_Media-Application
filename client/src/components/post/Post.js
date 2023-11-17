import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { likeAndUnlike } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router";
import { setToast } from "../../redux/slices/appConfigSlice";
import { TOST_SUCCESS } from "../../App";

const Post = (post) => {
    console.log('Hello');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const themeColor = useSelector((state) => state.appConfigSlice.setTheme)
    const handlePostLiked = async () => {
        dispatch(setToast({
            type: TOST_SUCCESS,
            message: 'Liked/UnLiked',

        }))
        dispatch(
            likeAndUnlike({
                postId: post.value._id
            })
        );
    }
    // console.log(post);
    return (
        <div className={themeColor ? "Post" : "Post-dark"}>
            <div className="heading" onClick={() => navigate(`/profile/${post.value.owner._id}`)} >
                <Avatar />

                <h4 className="post-ownwer">{post?.value?.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={post?.value?.image?.url} alt="" />
            </div>
            <div className="footer">
                <div className="like">
                    {post?.value?.isLiked ? (
                        <AiFillHeart className="icon" style={{ color: "red" }} onClick={handlePostLiked} />
                    ) : (
                        <AiOutlineHeart className="icon" onClick={handlePostLiked} />
                    )}
                    <h4>{post?.value?.likesCount} Likes</h4>
                </div>
                <p className="caption">{post?.value?.caption}</p>
                <p className="time-ago">{post?.value?.timeAgo}</p>
                {/* <div>
                    <button>Delete</button>
                </div> */}
            </div>
        </div>
    );
};

export default Post;
