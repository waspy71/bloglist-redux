
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload
    },
    userClear(state, action) {
      return null
    }
  }
})


export const { userSet, userClear } = userSlice.actions

export const setUser = () => {
  return async dispatch => {
    const loggedBlogappUser = localStorage.getItem('loggedBlogappUser')
    if(loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      dispatch(userSet(user))
    }
  }
}

export const clearUser = () => {
  return async dispatch => {
    dispatch(userClear())
    window.localStorage.clear()
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const userInfo = await loginService.login(credentials)
    localStorage.setItem('loggedBlogappUser',JSON.stringify(userInfo))
    dispatch(userSet(userInfo))
  }
}

export default userSlice.reducer