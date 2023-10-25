import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import { AiOutlineHeart } from 'react-icons/ai'

const Post = (post) => {

    return (
        <div className='Post'>

            <div className='heading'>
                <Avatar />
                <h4>{post?.value?.owner?.name}</h4>
            </div>
            <div className='content'>
                <img src={post?.value?.image?.url} alt="" />
            </div>
            <div className='footer'>
                <div className="like">
                    <AiOutlineHeart className='icon' />
                    <h4>{post?.value?.likes?.length}</h4>
                </div>
                <p className='caption'>{post?.value?.caption}</p>
                <p className='time-ago'>4 hours ago</p>
                {/* <div>
                    <button>Delete</button>
                </div> */}
            </div>

        </div>
    )
}

export default Post