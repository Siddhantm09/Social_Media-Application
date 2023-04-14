import React from 'react'
import avatar from '../../assets/woman.png'
import './Avatar.scss'

const Avatar = ({ src }) => {
    return (
        <div className='Avatar'>
            <img src={src ? src : avatar} alt='' />
        </div>
    )
}

export default Avatar