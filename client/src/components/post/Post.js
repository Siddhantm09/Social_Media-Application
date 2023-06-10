import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import image from '../../assets/pexels-stein-egil-liland-3408744 (1).jpg'
import { AiOutlineHeart } from 'react-icons/ai'

const Post = ({ post }) => {
    return (
        <div className='Post'>
            <div className='heading'>
                <Avatar />
                <h4>Siddhant</h4>
            </div>
            <div className='content'>
                <img src={image} alt="" />
            </div>
            <div className='footer'>
                <div className="like">
                    <AiOutlineHeart className='icon' />
                    <h4>5 likes</h4>
                </div>
                <p className='caption'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ea accusantium illo beatae, molestiae atque totam tempora asperiores magni doloremque aliquid. Maxime nulla voluptate iste at sequi? Ea, hic dolorum.</p>
                <p className='time-ago'>4 hours ago</p>
            </div>

        </div>
    )
}

export default Post