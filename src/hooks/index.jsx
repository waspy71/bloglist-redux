import { useDispatch } from 'react-redux'
import { getBlogs } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'
import { getUsers } from '../reducers/usersReducer'





export const useStartupData = () => {
  const dispatch = useDispatch()

  return () => {
    dispatch(getBlogs())
    dispatch(setUser())
    dispatch(getUsers())
  }
}