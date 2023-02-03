import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { BsHouseFill, BsPeopleFill, BsBoxArrowRight } from 'react-icons/bs'

import './Sidebar.css'

// eslint-disable-next-line react/prop-types
const Sidebar = ({ location }) => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookie, setCookie, removeCookie] = useCookies([])

  useEffect(() => {
    if (!cookie.adminjwt) {
      navigate('/admin/login')
    }
  })

  const adminHome = () => {
    navigate('/admin')
  }

  const adminuserList = () => {
    navigate('/admin/user-list')
  }

  const Logout = () => {
    removeCookie('adminjwt')
    navigate('/admin/login')
  }

  return (
    <div className='adminsidebar-main '>
      <div className="adminsidebar-options">
        <div className='adminsidebar-text' onClick={adminHome}>    <BsHouseFill /> Home</div>
      </div>
      {location === 'user-side'
        ? ''
        : <div className="adminsidebar-options">
          <div className='adminsidebar-text' onClick={adminuserList}>  <BsPeopleFill />  Users List</div>
        </div>}

      <div className="adminsidebar-options">
        <div className='adminsidebar-text' onClick={Logout} >  <BsBoxArrowRight />  Logout</div>
      </div>
    </div>
  )
}

export default Sidebar
