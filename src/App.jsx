import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notifyWith } from './reducers/notificationReducer'
import { getBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogsReducer'


const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)


  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleLikes = async (blog) => {
    try {
      dispatch(notifyWith(`A like for blog ${blog.title} by ${blog.author}`))
      dispatch(likeBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
    } catch (exeption) {
      dispatch(notifyWith(`Error trying while trying to add like to ${blog.title}`))
      console.log(exeption)
    }
  }

  const handleDelete = async (blog) => {
    try {
      if(confirm(`Do you want to remove blog "${blog.title} by ${blog.author}"?`)) {
        dispatch(removeBlog(blog.id))
        dispatch(notifyWith(`Blog ${blog.title} removed`))
      }
    } catch (exception) {
      dispatch(notifyWith('Must be creator of the blog', 'error'))
    }
  }

  const logoutUser = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const blogForm = () => (
    <div className='blog-list'>
      <br></br>
      {[...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
          user={user}
        />)}
    </div>
  )

  return (
    <div>
      <Notification />
      { user === null &&
      <LoginForm setUser={setUser} /> }
      {user !== null &&
      <div>
        <h2>Blogs</h2>
        {user.username} logged in
        <button onClick={logoutUser}>logout</button>
        <Togglable buttonLabel='Create blog' ref={blogFormRef}>
          <NewBlog handleCreate={handleCreate} />
        </Togglable>
        {blogForm()}
      </div>}
    </div>
  )
}

export default App