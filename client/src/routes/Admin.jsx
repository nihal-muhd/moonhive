import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AdminLogin from '../pages/Admin/AdminLogin/AdminLogin'
import AdminHome from '../pages/Admin/AdminHome/AdminHome'
import AdminUserList from '../pages/Admin/AdminUserList/AdminUserList'

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route element={<AdminLogin />} path="/login" />
      </Routes>
      <Routes>
        <Route element={<AdminHome />} path="/" />
      </Routes>
      <Routes>
        <Route element={<AdminUserList/>} path='/user-list'/>
      </Routes>
    </div>
  )
}

export default Admin
