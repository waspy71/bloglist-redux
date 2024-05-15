import { useDispatch, useSelector } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import Blog from './Blog'
import { useParams } from 'react-router-dom'


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


  return (
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


}

export default BlogList