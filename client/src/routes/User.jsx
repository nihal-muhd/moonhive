import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'

const User = () => {
  return (
    <div>
      <Routes>
        <Route element={<Login/>} path='/login'/>
      </Routes>
      <Routes>
        <Route element={<Home/>} path='/'/>
      </Routes>
    </div>
  )
}

export default User
