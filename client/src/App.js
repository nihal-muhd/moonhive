import { Routes, Route } from 'react-router-dom'

import User from './routes/User'
import Admin from './routes/Admin'

import './App.css'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route element={<User />} path='/*' />
      </Routes>
      <Routes>
        <Route element={<Admin />} path='/admin/*' />
      </Routes>
    </div>
  )
}

export default App
