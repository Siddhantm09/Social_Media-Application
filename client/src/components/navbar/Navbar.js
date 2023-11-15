// import React, { useRef, useState } from 'react'
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorage";

const Navbar = () => {
    const handleLogoutClicked = async () => {
        try {
            await axiosClient.post("/auth/logout");
            removeItem(KEY_ACCESS_TOKEN);
            navigate("/login");
        } catch (error) { }
    };

    const navigate = useNavigate();
    const myProfile = useSelector((state) => state.appConfigSlice.myProfile);

    return (
        <div className="Navbar">
            <div className="container">
                <h2
                    className="social-banner hover-link"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => {
                            navigate(`/profile/${myProfile?._id}`);
                        }}
                    >
                        <Avatar src={myProfile?.avatar?.url} />
                        {/* //add detail */}
                    </div>
                    <div className="hover-link logout" onClick={handleLogoutClicked}>
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
