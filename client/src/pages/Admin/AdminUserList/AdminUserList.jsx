import React from 'react'

import Userlist from '../../../components/Admin/Userlist/Userlist'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'

const AdminUserList = () => {
  return (
    <div>
      <div className='adminhome-main'>
        <div className='adminhome-sidebar'>
          <Sidebar />
        </div>
        <div className='adminhome-userlist'>
          <Userlist />
        </ div>
      </div>
    </div>
  )
}

export default AdminUserList
