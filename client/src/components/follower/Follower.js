import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnfollow } from '../../redux/slices/feedSlice'
import { useNavigate } from "react-router";
const Follower = (follower) => {

    const [follow, setFollow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const feedData = useSelector(state => state.feedSlice.feedData);

    function handleFollowClick() {
        dispatch(followAndUnfollow({ userToFollowId: follower.value._id }))

    }
    useEffect(() => {

        setFollow(feedData.followings.find((item) => item._id === follower?.value?._id))

    }, [feedData])

    return (
        <div className='follower'>
            <div className='user-info' onClick={() => navigate(`/profile/${follower.value._id}`)}>
                <Avatar src={follower?.value?.avatar?.url} />

                <h3 className='name'>{follower?.value?.name}</h3>
            </div>
            <h5 onClick={handleFollowClick} className={follow ? "hover-link follow-link" : "btn-primary"}>{follow ? "Unfollow" : "Follow"}</h5>

        </div>
    )
}

export default Follower