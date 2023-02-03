import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import Login from '../../../components/Admin/Login/Login'

const AdminLogin = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookie, setCookie, removeCookie] = useCookies([])

  useEffect(() => {
    if (cookie.adminjwt) {
      navigate('/admin')
    }
  })
  return (
    <div>
      <Login />
    </div>
  )
}

export default AdminLogin
