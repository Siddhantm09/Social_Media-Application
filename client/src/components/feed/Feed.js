import React, { useEffect } from 'react'
import './Feed.scss'
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'

const Feed = () => {
    const themeColor = useSelector((state) => state.appConfigSlice.setTheme)
    const dispatch = useDispatch()
    const allFeedData = useSelector((state) => state.feedSlice.feedData)
    useEffect(() => {
        dispatch(
            getFeedData()
        )
    }, [dispatch])

    return (
        <div className={themeColor ? "Feed" : "Feed-dark"}>
            <div className='container'>
                <div className='left-part'>
                    {allFeedData?.MappedFollowingposts?.map((post) => {
                        return <div key={post._id}>
                            <Post value={post} />
                        </div>
                    }
                    )}


                </div>
                <div className='right-part'>
                    <div className='following'>

                        <h3 className='title'>Your are following</h3>
                        {/* {console.log(allFeedData?.followings, 'Feed Page')} */}
                        {allFeedData?.followings?.map((follower) => {

                            return <div key={follower._id}>
                                <Follower value={follower} />
                            </div>

                        })}


                    </div>
                    <div className='suggestions'>
                        <h3 className='title'>Suggested for you</h3>

                        {allFeedData?.suggestions?.map((following) => {
                            return <div key={following._id}>
                                <Follower value={following} />
                            </div>

                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed