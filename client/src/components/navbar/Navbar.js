import React from 'react'
import Avatar from '../avatar/Avatar'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className='Navbar'>
            <div className='container'>
                <h2 className='social-banner'>Social Media</h2>
                <div className='right-side'>
                    <div className='profile'>
                        <Avatar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar