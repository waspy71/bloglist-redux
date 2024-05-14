
import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    usersSet(state, action) {
      return action.payload
    }
  }
})

export const { usersSet } = usersSlice.actions

export const getUsers = () => {
  return async dispatch => {
    const usersInfo = await usersService.getAllUsers()
    dispatch(usersSet(usersInfo))
  }
}

export default usersSlice.reducer