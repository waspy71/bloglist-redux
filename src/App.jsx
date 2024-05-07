import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notifyWith } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      const formBlog = await blogService.create(blogObject)       
      formBlog.user = { name: user.name, username: user.username }  
      setBlogs(blogs.concat(formBlog))                              
                                                                    
      dispatch(notifyWith(                                          
        `Blog : ${formBlog.title} by ${formBlog.author} added`
      ))

    } catch (exception) {
      dispatch(notifyWith(exception.response.data.error, 'error'))
      console.log(exception)
    }
  }

  const handleLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.updateLikes(blog)
      dispatch(notifyWith(`A like for blog ${blog.title} by ${blog.author}`))
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    } catch (exeption) {
      dispatch(notifyWith(`Error trying while trying to add like to ${blog.title}`))
      console.log(exeption)
    }
  }

  const handleDelete = async (blog) => {
    try {
      if(confirm(`Do you want to remove blog "${blog.title} by ${blog.author}"?`)) {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
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
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
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