import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnfollow } from '../../redux/slices/feedSlice'

const Follower = (follower) => {

    const [follow, setFollow] = useState();
    const dispatch = useDispatch();
    const feedData = useSelector(state => state.feedSlice.feedData);

    function handleFollowClick() {
        dispatch(followAndUnfollow({ userToFollowId: follower.value._id }))

    }
    useEffect(() => {

        if (feedData.followings.find((item) => item._id === follower?.value?._id)) {
            setFollow(true)
        }
        else {
            setFollow(false)
        }

    }, [feedData])
    return (
        <div className='follower'>
            <div className='user-info'>
                <Avatar src={follower?.value?.avatar?.url} />

                <h3 className='name'>{follower?.value?.name}</h3>
            </div>
            {follow ? <h5 className='hover-link follow-link' onClick={handleFollowClick}>Unfollow</h5> : <h5 className='hover-link follow-link' onClick={handleFollowClick}>Follow</h5>}

        </div>
    )
}

export default Follower