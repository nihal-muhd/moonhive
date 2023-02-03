import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import './UserModal.css'

// eslint-disable-next-line react/prop-types
const UserModal = ({ modalOpen, setModalOpen, handleSubmit }) => {
  const theme = useMantineTheme()
  const [formData, setFormData] = useState('')

  const { name, email, password } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      // opened is a property of modal. Here when our state modalOpen is true this modal will open.
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <form className="add-form" >
        <h3>Your Info</h3>
        <div>
          <input type="text" className="add-input" name='name' placeholder='User name' onChange={handleChange} value={name} />
        </div>
        <div>
          <input type="email" className="add-input" name='email' placeholder='Email' onChange={handleChange} value={email} />
        </div>
        <div>
          <input type="password" className="add-input" name='password' placeholder='password' onChange={handleChange} value={password} />
        </div>

        <button type='button' className='add-button' onClick={() => {
          handleSubmit(formData)
        }} >Add</button>

      </form>
    </Modal>
  )
}

export default UserModal
