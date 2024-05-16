import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null },
  reducers: {
    set_notification(state, action) {
      return action.payload
    },
    clear_notification(state, action) {
      return { message: null }
    }
  }
})

export const { set_notification, clear_notification } = notificationSlice.actions

export const notifyWith = (message, type ='info') => {
  return dispatch => {
    dispatch(set_notification({ message, type }))

    setTimeout(() => {
      dispatch(clear_notification())
    }, 5000)
  }
}

export default notificationSlice.reducer