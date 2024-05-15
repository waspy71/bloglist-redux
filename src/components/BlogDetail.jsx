import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogsReducer'


const BlogDetail = () => {
  const dispatch =useDispatch()
  const blogId = useParams().id
  const blog = useSelector(({ blogs }) =>
    blogs.find(blog => blog.id === blogId)
  )


  const handleLikes = async (blog) => {
    try {
      dispatch(notifyWith(`A like for blog ${blog.title} by ${blog.author}`))
      dispatch(likeBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
    } catch (exeption) {
      dispatch(notifyWith(`Error trying while trying to add like to ${blog.title}`))
      console.log(exeption)
    }
  }


  const border = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(!blog) {
    return null
  }

  return (
    <div style={border} className="Blog">
      <div >
        <h2>{blog.title} {blog.author}</h2>
        <div><a href={`${blog.url}`}>{blog.url}</a></div>
        <div>Likes : {blog.likes} <button onClick={() => handleLikes(blog)}>like</button></div>
        <div>By {blog.user.username}</div>
      </div>
    </div>
  )
}

export default BlogDetail