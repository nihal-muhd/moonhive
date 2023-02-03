import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { BsTrash, BsBoxArrowRight } from 'react-icons/bs'

import './Todo.css'

const Todo = () => {
  const [todoList, setTodoList] = useState([])
  const [formdata, setFormData] = useState('')
  const [cookie, setCookie, removeCookie] = useCookies([])
  const navigate = useNavigate()
  let forTodoList = todoList

  useEffect(() => {
    if (!cookie.jwt) {
      navigate('/login')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/add-task', { task: formdata, _id: Date.now(), status: 'pending' }, { withCredentials: true })
    console.log(todoList, 'ey')
    const task = {
      task: formdata
    }
    setTodoList([
      ...todoList, task
    ])
    setFormData('')
  }

  const handleTask = (e) => {
    setFormData(e.target.value)
  }

  const handleDelete = async (id) => {
    await axios.post('http://localhost:5000/delete-task', { id }, { withCredentials: true })
    forTodoList = todoList.filter((v) => v.task_id !== id)
    console.log(forTodoList, 'hih')
    setTodoList(forTodoList)
  }

  useEffect(() => {
    async function getTask () {
      // eslint-disable-next-line no-undef
      const res = await axios.get('http://localhost:5000/get-task', { withCredentials: true })
      setTodoList(res.data)
    }
    getTask()
  }, [])

  const logout = () => {
    removeCookie('jwt')
    navigate('/login')
  }

  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const d = new Date()
  const day = weekday[d.getDay()]

  return (
    <div className="Todo">
      <div className='user-logout' >
        <div onClick={logout}>
          <BsBoxArrowRight />  Logout
        </div>
      </div>
      <div className="boader">
        <div className="todo-form">
          <p>woohoo... its {day} 😄 </p>
          <div className="todo-input">
            <input type='text' placeholder='what plan for today....☕️' value={formdata} name='task' onChange={handleTask} />
            <button onClick={handleSubmit}>Enter</button>
          </div>
        </div>
        {todoList.map((v) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className="todo-list">
              <p>{v?.task}</p>
              <div>
                <BsTrash style={{ cursor: 'pointer' }} onClick={() => handleDelete(v.task_id)} />
                {/* <BsCheckCircleFill style={{ marginLeft: '10px', cursor: 'pointer' }}/> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Todo
