import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import './CreatePost.scss'
import { useDispatch, useSelector } from 'react-redux'
import { axiosClient } from '../../utils/axiosClient'

import { getUserProfile } from '../../redux/slices/postSlice'



const CreatePost = () => {
    const myProfile = useSelector((state) => state.appConfigSlice.myProfile)
    //console.log(myProfile?._id);
    const themeColor = useSelector((state) => state.appConfigSlice.setTheme)

    const dispatch = useDispatch();
    const [postImg, setPostImg] = useState()
    const [caption, setCaption] = useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        const fileReader = new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setPostImg(fileReader.result)
            }
        }
    }

    const handleSubmit = async () => {
        try {

            const result = await axiosClient.post('/posts/post', { postImg, caption })
            console.log(result);
            //to update the user profile with new created post data
            dispatch(getUserProfile({
                userId: myProfile?._id, //logged in user id we are sending to BE,redirect to my profile 
            }))
        } catch (error) {
            console.log(error);
        }
        finally {

            setCaption('')
            setPostImg('')
        }
    }

    return (
        <div className={themeColor ? "CreatePost" : "CreatePost-dark"}>
            <div className='cp-left-part'>
                <Avatar src={myProfile?.avatar?.url} />
            </div>
            <div className='cp-right-part'>
                <input value={caption} type='text' className='captionInput' placeholder='Whats in your mind...' onChange={(e) => setCaption(e.target.value)} />
                {postImg && <div className='img-container'>
                    <img className='posted-img' src={postImg} alt='Uploaded Pic' />
                </div>}
                <div className='bottom-part'>
                    <div className="input-post">
                        <label htmlFor='userImage' className='LabelImg'>
                            <i class="fa-solid fa-image"></i>
                        </label>
                        <input type='file' id='userImage' accept='image/*' className='userImage' onChange={handleImageChange}></input>
                    </div>
                    <button className='post-btn btn-primary' onClick={handleSubmit}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost