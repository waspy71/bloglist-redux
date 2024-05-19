import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useStartupData } from './hooks'
import BlogDetail from './components/BlogDetail'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import NavBar from './components/NavBar'


const App = () => {
  const user = useSelector(({ user }) => user)

  const startupData = useStartupData()


  useEffect(() => {
    startupData()
  }, [])


  return (
    <div className='container'>
      <Notification />
      { !user
        ? <LoginForm />
        :
        <div>
          <NavBar />
          <Routes>
            <Route path='/' element={<BlogList  />} />
            <Route path='/blogs/:id' element={<BlogDetail  />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
          </Routes>
        </div>}
    </div>
  )
}

export default App