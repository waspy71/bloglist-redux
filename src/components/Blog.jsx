import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)


  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  return (
    <div className="Blog border border-info border-2 rounded mb-2">
      <div className='p-2'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <button
          onClick={toggleVisibility}
          className='btn btn-outline-info mx-2'
          data-bs-toggle='button'
        >
          {blogVisible ? 'hide' : 'View'}
        </button>
        {blogVisible &&
        <div className="hidden">
          <div> {blog.url} </div>
          <div>Likes : {blog.likes} <button onClick={() => handleLikes(blog)}>like</button></div>
          <div>{blog.user.username}</div>
          { user.username === blog.user.username &&
            <div><button id="blog-remove-button" onClick={() => handleDelete(blog)}>remove</button></div>}
        </div>}
      </div>
    </div>
  )
}


export default Blog
