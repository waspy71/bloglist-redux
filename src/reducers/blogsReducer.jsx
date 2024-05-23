import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'


const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    blogGet(state, action) {
      return action.payload
    },
    blogCreate(state, action) {
      return state.concat(action.payload)
    },
    blogDelete(state, action) {
      return state.filter(s => s.id !== action.payload)
    },
    blogLike(state, action) {
      return state.map(s => s.id === action.payload.id ? action.payload : s)
    },
    blogAddComment(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    }
  }
})


export const { blogGet, blogCreate, blogDelete, blogLike, blogAddComment } = blogsSlice.actions

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(blogGet(blogs))
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(object)
      dispatch(blogCreate(newBlog))
      dispatch(notifyWith(
        `Blog : ${newBlog.title} by ${newBlog.author} added`
      ))
    }catch(exception) {
      dispatch(notifyWith(exception.response.data.error, 'error'))
    }
  }
}

export const removeBlog = (objectId) => {
  return async dispatch => {
    await blogService.deleteBlog(objectId)
    dispatch(blogDelete(objectId))
  }
}

export const likeBlog = (object) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateLikes(object)
    dispatch(blogLike(updatedBlog))
  }
}

export const addCommentBlog = (object) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(object.id, object.comment)
    dispatch(blogAddComment(updatedBlog))
  }
}



export default blogsSlice.reducer







