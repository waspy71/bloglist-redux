import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)


  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  return (
    <div className="Blog border border-info border-2 rounded mb-2">
      <div className='position-relative p-3'>
        <Link to={`/blogs/${blog.id}`} className='pe-5'>{blog.title} {blog.author}</Link>
        <button
          className='btn btn-block btn-outline-info position-absolute top-0 end-0 m-2'
          data-bs-toggle='button'
          onClick={toggleVisibility}
        >
          {blogVisible ? 'hide' : 'View'}
        </button>
        {blogVisible &&
        <div className="hidden">
          <div> {blog.url} </div>
          <div>Likes : {blog.likes} <button className='btn btn-outline-primary' onClick={() => handleLikes(blog)}>like</button></div>
          <div>{blog.user.username}</div>
          { user.username === blog.user.username &&
            <div><button className='btn btn-outline-danger' id="blog-remove-button" onClick={() => handleDelete(blog)}>remove</button></div>}
        </div>}
      </div>
    </div>
  )
}


export default Blog
