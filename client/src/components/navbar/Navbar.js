// import React, { useRef, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Navbar.scss'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const handleLogoutClicked = () => { }

    const navigate = useNavigate()
    const myProfile = useSelector((state) => state.appConfigSlice.myProfile)
    console.log(myProfile);

    return (
        <div className='Navbar'>

            <div className='container'>
                <h2 className='social-banner hover-link' onClick={() => navigate('/')} > Social Media</h2>
                <div className='right-side'>
                    <div className='profile hover-link' onClick={() => navigate(`/profile/${myProfile._id}`)}>
                        <Avatar />
                        {/* //add detail */}
                    </div>
                    <div className='hover-link logout' onClick={handleLogoutClicked} >
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar