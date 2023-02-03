import React, { useState, useEffect } from 'react'
import UserModal from '../UserModal/UserModal'
import axios from 'axios'

import './Userlist.css'

const Userlist = () => {
  const [list, setlist] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  // let newUsers = userList

  useEffect(() => {
    console.log('useeffect')
    // setlist(userList)
    async function getUsers () {
      const res = await axios.get('http://localhost:5000/admin/get-user', { withCredentials: true })
      if (res.data.status === true) {
        const userList = res.data.data
        setlist(userList)
      }
    }
    getUsers()
  }, [])

  const handleSubmit = async (formData) => {
    console.log(formData)
    setModalOpen(false)
    const res = await axios.post('http://localhost:5000/admin/add-user', formData, { withCredentials: true })
    if (res.data.status === 'user added') {
      setlist([
        ...list,
        formData
      ])
    } else {
      alert('Failure in adding user')
    }
  }

  return (
    <div className="userList">
      <div className="userList-head">Users Data</div>
      <div className="userList-table">
        <div className="userList-addUser">
          <button className='userList-button' onClick={() => setModalOpen(true)}>Add User</button>
        </div>
        <table border={1}>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {list?.map((v, i) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <tr key={i}>
                <td>{v?.name}</td>
                <td>{v?.email}</td>
              </tr>
            )
          })}

        </table>
      </div>
      <UserModal modalOpen={modalOpen} setModalOpen={setModalOpen} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Userlist
