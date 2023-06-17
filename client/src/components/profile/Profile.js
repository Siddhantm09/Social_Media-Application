import React from "react";
import './Profile.scss'
import Post from "../post/Post";
import img from './../../assets/woman.png'

const Profile = () => {
    return (
        <div className="Profile">
            <div className="container">
                <div className="left-part">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img className='image' src={img} alt='' />
                        <h4 className="username">Shraddha Barge</h4>
                        <div className="follower-info">
                            <h4>40 followers</h4>
                            <h4>12 following</h4>
                        </div>
                        <button className="follow-btn btn-primary">Follow</button>
                        <button className="update-btn btn-secondary">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
