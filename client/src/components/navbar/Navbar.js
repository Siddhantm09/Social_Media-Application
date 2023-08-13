// import React, { useRef, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Navbar.scss'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slices/appConfigSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toogleLoadingBar = () => {
        dispatch(setLoading(true))
    }

    return (
        <div className='Navbar'>

            <div className='container'>
                <h2 className='social-banner hover-link' onClick={() => navigate('/')} > Social Media</h2>
                <div className='right-side'>
                    <div className='profile hover-link' onClick={() => navigate('/profile/dummyid')}>
                        <Avatar />
                    </div>
                    <div className='hover-link logout' onClick={toogleLoadingBar}>
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar