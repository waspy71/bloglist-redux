import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'


const config = () => {
  return {
    headers: {
      Authorization: localStorage.getItem('loggedBlogappUser')
        ? `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        : null
    }
  }
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {

  const response = await axios.post(baseUrl, newBlog, config())
  console.log('createBlog', response.data)

  return response.data
}

const updateLikes = async (blog) => {

  const updatedBlog = await axios.put(`${baseUrl}/${blog.id}`, blog, config())
  return updatedBlog.data
}

const deleteBlog = async (id) => {

  await axios.delete(`${baseUrl}/${id}`, config())

}

const addComment = async (id, comment) => {

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment: comment }, config())
  return response.data
}

export default { getAll, create, updateLikes, deleteBlog, addComment }