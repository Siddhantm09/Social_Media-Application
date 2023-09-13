import React, { useEffect, useState } from 'react'
import userImg from './../../assets/woman.png'
import './UpdateProfile.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {

    const dispatch = useNavigate()
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const [userImg, setuserImg] = useState()


    const myProfile = useSelector((state) => state.appConfigSlice.myProfile)

    useEffect(() => {
        setName(myProfile?.name)
        setBio(myProfile?.name)
    }, [myProfile])

    const handleImageChange = () => {


    }


    return (
        <div className='UpdateProfile'>
            <div className='container'>
                <div className='left-part'>
                    <div className="input-user-Img">
                        <label htmlFor='userImage' className='LabelImg'>
                            <img src={userImg} alt='' />
                        </label>
                        <input type='file' id='userImage' accept='image/*' className='userImage' onChange={handleImageChange}></input>
                    </div>
                </div>
                <div className="right-part">
                    <form onSubmit={''}>
                        <input type='text' value={name} placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        <input type='text' value={bio} placeholder='Your Bio' onChange={(e) => setBio(e.target.value)} />
                        <input type='submit' className='btn-primary' />
                    </form>
                    <button className='delete-profile-btn btn-primary'>Delete Account</button>
                </div>
            </div>

        </div>
    )
}

export default UpdateProfile