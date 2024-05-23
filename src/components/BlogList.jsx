import { useDispatch, useSelector } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import Blog from './Blog'
import { useRef } from 'react'
import { createBlog } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import NewBlog from './NewBlog'


const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)


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

  const blogFormRef = useRef()

  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))

  }


  return (
    <div className='blog-list'>
      <h2>Blogs</h2>
      <Togglable buttonLabel='Create blog' ref={blogFormRef}>
        <NewBlog handleCreate={handleCreate} />
      </Togglable>
      <br></br>
      <div className="row row-cols-1 row-cols-sm-2 gx">
        {[...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
          <div key={blog.id} className="col">
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
              user={user}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList