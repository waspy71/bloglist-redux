import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import NavBar from './components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import { getUsers } from './reducers/usersReducer'
import BlogDetail from './components/BlogDetail'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])


  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])

  return (
    <div>
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