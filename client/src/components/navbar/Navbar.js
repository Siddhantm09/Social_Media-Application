import React, { useRef, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Navbar.scss'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
const Navbar = () => {

    const navigate = useNavigate()
    const loadingRef = useRef()

    const [loading, setLoading] = useState(false)

    const toogleLoadingBar = () => {
        if (loading) {
            setLoading(false)
            loadingRef.current.complete()
        }
        else {
            setLoading(true)
            loadingRef.current.continuousStart()
        }
    }

    return (
        <div className='Navbar'>
            <LoadingBar color='#72a2e9' ref={loadingRef} />
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