import { useState } from 'react'

const NewBlog = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (event) => {
    event.preventDefault()

    handleCreate({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlog}>
        <div className="input-group input-group-sm">
          {/* <label htmlFor='title' className='form-label' >Title</label> */}
          <div className="input-group-text"><b>Title</b></div>
          <input
            className='form-control'
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='input-group input-group-sm'>
          {/* <label htmlFor='author' className='form-label'>Author</label> */}
          <div className="input-group-text"><b>Author</b></div>
          <input
            className='form-control'
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='input-group input-group-sm'>
          {/* <label htmlFor='url' className='form-label'>Url</label> */}
          <div className="input-group-text"><b>Url</b></div>
          <input
            className='form-control'
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="blog-create-button" type="submit">Create</button>
      </form>
    </div>

  )
}

export default NewBlog