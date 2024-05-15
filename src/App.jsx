import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { notifyWith } from './reducers/notificationReducer'
import { getBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogsReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
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


  const blogFormRef = useRef()

  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      dispatch(createBlog(blogObject))

      dispatch(notifyWith(
        `Blog : ${blogObject.title} by ${blogObject.author} added`
      ))

    } catch (exception) {
      dispatch(notifyWith(exception.response.data.error, 'error'))
      console.log(exception)
    }
  }


  const logoutUser = () => {
    dispatch(clearUser())
  }


  return (
    <div>
      <Notification />
      { user === null &&
      <LoginForm /> }
      {user !== null &&
      <div>
        <h2>Blogs</h2>
        {user.username} logged in
        <button onClick={logoutUser}>logout</button>
        <Togglable buttonLabel='Create blog' ref={blogFormRef}>
          <NewBlog handleCreate={handleCreate} />
        </Togglable>
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