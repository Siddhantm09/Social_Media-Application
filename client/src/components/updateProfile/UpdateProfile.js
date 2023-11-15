import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { removeItem } from '../../utils/localStorage'
import { updateProfileThunk } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN } from '../../utils/localStorage'
import { useNavigate } from "react-router";
const UpdateProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [userImg, setuserImg] = useState()


    const myProfile = useSelector((state) => state.appConfigSlice.myProfile)


    useEffect(() => {
        setName(myProfile?.name || '')
        setBio(myProfile?.bio || '')
        setuserImg(myProfile?.avatar?.url || '')
    }, [myProfile])

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        const fileReader = new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setuserImg(fileReader.result)
            }
        }
    }
    const handleDeleteUser = async () => {
        try {
            await axiosClient.delete('/user/delete')
            removeItem(KEY_ACCESS_TOKEN);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {

        e.preventDefault()

        dispatch(updateProfileThunk({ name, bio, userImg }))

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
                    <form onSubmit={handleSubmit}>
                        <input type='text' value={name} placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        <input type='text' value={bio} placeholder='Your Bio' onChange={(e) => setBio(e.target.value)} />
                        <input type='submit' className='btn-primary' />
                    </form>
                    <button onClick={handleDeleteUser} className='delete-profile-btn btn-primary'>Delete Account</button>
                </div>
            </div>

        </div>
    )
}

export default UpdateProfile