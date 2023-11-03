import React, { useEffect, useState } from 'react'
import './Feed.scss'
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { axiosClient } from '../../utils/axiosClient'
import { useDispatch } from 'react-redux'
const Feed = () => {
    const dispatch = useDispatch()
    useEffect(() => {

    }, [dispatch])

    return (
        <div className='Feed'>
            <div className='container'>
                <div className='left-part'>
                    {/* {allPostss?.map(
                    )} */}
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className='right-part'>
                    <div className='following'>
                        <h3 className='title'>Your are following</h3>
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                    <div className='suggestions'>
                        <h3 className='title'>Suggested for you</h3>
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed