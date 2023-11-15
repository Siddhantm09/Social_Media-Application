import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import Post from "../post/Post";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { getUserProfile } from "../../redux/slices/postSlice";
import { followAndUnfollow } from "../../redux/slices/feedSlice";

const Profile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [following, setFollowing] = useState();
    const [isMyProfile, setIsMyProfile] = useState(false)
    const feedData = useSelector(state => state.feedSlice.feedData);
    const userProfile = useSelector((state) => state.postSlice.userProfile)
    const myProfile = useSelector((state) => state.appConfigSlice.myProfile)
    //console.log(myProfile._id, userProfile._id, params);
    const handleUserFollow = () => {
        dispatch(followAndUnfollow({ userToFollowId: params?.userId }))
    }
    useEffect(() => {

        setFollowing(feedData?.followings?.find((item) => item._id === params?.userId))


        setIsMyProfile(myProfile?._id === params.userId)

        dispatch(
            getUserProfile({
                userId: params.userId,//url id we are sending to BE
            })
        );
    }, [myProfile, params.userId]);
    return (
        <div className="Profile">
            <div className="container">
                <div className="left-part">
                    {isMyProfile && <CreatePost />}
                    {
                        userProfile?.allposts?.map((post) => {
                            return <div key={post._id}>

                                <Post value={post} />
                            </div>

                        })
                    }


                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img className="image" src={userProfile?.avatar?.url} alt="" />
                        <h4 className="username">{userProfile?.name}</h4>
                        <div className="follower-info">
                            <h4>{userProfile?.followers?.length} Followers</h4>
                            <h4>{userProfile?.followings?.length} Followings</h4>
                        </div>

                        {!isMyProfile && !following && <button onClick={handleUserFollow} className="follow-btn btn-primary">Follow</button>}
                        {following && <button onClick={handleUserFollow} className="follow-btn btn-primary">Unfollow</button>}
                        {
                            isMyProfile && <button
                                className="update-btn btn-secondary"
                                onClick={() => navigate("/updateProfile")}
                            >
                                Update Profile
                            </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
