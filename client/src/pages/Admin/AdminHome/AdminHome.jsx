import React from 'react'

import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import Graph from '../../../components/Admin/Graph/Graph'

import './AdminHome.css'

const AdminHome = () => {
  return (
    <div>
      <div className='adminhome-main'>
        <div className='adminhome-sidebar'>
          <Sidebar />
        </div>
        <div className='adminhome-graph'>
          <Graph />
        </ div>
      </div>
    </div>
  )
}

export default AdminHome
