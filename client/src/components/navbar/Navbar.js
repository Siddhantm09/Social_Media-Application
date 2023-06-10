import React from 'react'
import Avatar from '../avatar/Avatar'
import './Navbar.scss'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <div className='Navbar'>
            <div className='container'>
                <h2 className='social-banner hover-link' onClick={() => navigate('/')} > Social Media</h2>
                <div className='right-side'>
                    <div className='profile hover-link' onClick={() => navigate('/profile/dummyid')}>
                        <Avatar />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar