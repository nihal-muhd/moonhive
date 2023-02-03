import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [formdata, setFormData] = useState('')
  const { username, password } = formdata
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (formdata.username === '' || formdata.password === '') {
      setError('enter below details')
    } else {
      const response = await axios.post('http://localhost:5000/admin/login', formdata, { withCredentials: true })
      if (response.data.status === true) {
        navigate('/admin')
      } else {
        console.log('Incorrect admin details')
      }
    }
  }

  return (
    <div>
      <div className="adminLogin">
        <div className="adminLogin-left">
          <div className="adminLogin-header">Admin Panel</div>
        </div>
        <div className="adminLogin-right">
          <form className="adminLogin-form" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div>
              <input type="text" className='adminLogin-input' name='username' onChange={handleChange} placeholder='username' value={username} />
            </div>
            <div>
              <input type="password" className='adminLogin-input' name='password' onChange={handleChange} placeholder='password' value={password} />
            </div>
            {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}
            <button className='loginButton'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
