import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './UserLogin.css'

const UserLogin = () => {
  const navigate = useNavigate()
  const [formdata, setFormData] = useState('')
  const { email, password } = formdata
  const [cookie, setCookie, removeCookie] = useCookies([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (cookie.jwt) {
      navigate('/')
    }
  }, [])

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
      const response = await axios.post('http://localhost:5000/login', formdata, { withCredentials: true })
      if (response.data.status === true) {
        navigate('/')
      } else {
        console.log('Incorrect username or password')
      }
    }
  }
  return (
    <div>
      <div className="Login">
        <div className="Login-left">
          <div className="Login-header"> Welocome </div>
        </div>
        <div className="Login-right">
          <form className="Login-form" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div>
              <input type="text" className='Login-input' placeholder=' Enter email' onChange={handleChange} name='email' value={email} />
            </div>
            <div>
              <input type="password" className='Login-input' placeholder='Enter password' onChange={handleChange} name='password' value={password} />
            </div>
            {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}
            <button className='loginButton'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
