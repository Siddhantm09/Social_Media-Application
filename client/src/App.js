import Login from "../src/pages/login/login";
import SignUp from "../src/pages/signup/signup";
import React, { useRef, useEffect } from 'react'
import Home from "../src/pages/home/home";
import { Route, Routes } from "react-router-dom";
import RequireUser from "./components/RequireUser";
import Feed from './components/feed/Feed'
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux'

function App() {
  const loadingRef = useRef(null)
  const isloading = useSelector((state) => state.appConfigSlice.isloading)
  console.log(isloading);

  useEffect(() => {
    if (isloading) {
      loadingRef.current?.continuousStart()
    }
    else {
      loadingRef.current?.complete()
    }
  }, [isloading])
  return (
    <div className="App">
      <LoadingBar color='#000' ref={loadingRef} />
      <Routes>
        <Route element={<RequireUser />}>-----------------------------------------
          <Route element={<Home />} >
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
