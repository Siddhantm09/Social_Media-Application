import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
import { useSelector } from 'react-redux'

const Follower = (follower) => {
    const [follow, setFollow] = useState()
    const myProfile = useSelector((state) => state.appConfigSlice.myProfile)
    useEffect(() => {
        if (myProfile.followings.find((item) => item === follower?.value?._id)) {
            setFollow(true)
        }
        else {
            setFollow(false)
        }
    }, [follower])
    return (
        <div className='follower'>
            <div className='user-info'>
                <Avatar src={follower?.value?.avatar?.url} />

                <h3 className='name'>{follower?.value?.name}</h3>
            </div>
            {follow ? <h5 className='hover-link follow-link'>Unfollow</h5> : <h5 className='hover-link follow-link'>Follow</h5>}

        </div>
    )
}

export default Follower