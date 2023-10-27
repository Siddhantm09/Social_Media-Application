import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localStorage'

const IfLoggedIn = () => {
    const user = getItem(KEY_ACCESS_TOKEN)
    return (
        user ? <Navigate to='/'></Navigate> : <Outlet />
    )
}

export default IfLoggedIn