import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'
import { addCommentBlog, likeBlog } from '../reducers/blogsReducer'
import { useState } from 'react'


const BlogDetail = () => {
  const dispatch =useDispatch()
  const blogId = useParams().id
  const blog = useSelector(({ blogs }) =>
    blogs.find(blog => blog.id === blogId)
  )
  const [comment, setComment] = useState('')


  const handleLikes = async (blog) => {
    try {
      dispatch(notifyWith(`A like for blog ${blog.title} by ${blog.author}`))
      dispatch(likeBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
    } catch (exeption) {
      dispatch(notifyWith(`Error trying while trying to add like to ${blog.title}`))
      console.log(exeption)
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()

    dispatch(addCommentBlog({ id: blog.id, comment }))
    dispatch(notifyWith(`Comment addded to ${blog.title}`))
    setComment('')
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
        <div>Likes : {blog.likes} <button className='btn btn-outline-primary' onClick={() => handleLikes(blog)}>like</button></div>
        <div>By {blog.user.username}</div>
      </div>
      <div>
        <h2>Comments</h2>
        <form onSubmit={handleComment}>
          <div className="input-group input-group-sm w-25">
            <input
              className='form-control'
              type='text'
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button className='input-group-text btn btn-primary' type='submit'>Add comment</button>
          </div>
        </form>
        <ul>
          {blog.comments.map(c => <li key={c}>{c}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetail