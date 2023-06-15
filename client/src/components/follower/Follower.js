import React from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'

const Follower = () => {
    return (
        <div className='follower'>
            <div className='user-info'>
                <Avatar />
                <h3 className='name'>Shraddha</h3>
            </div>

            <h5 className='hover-link follow-link'>Follow</h5>
        </div>
    )
}

export default Follower