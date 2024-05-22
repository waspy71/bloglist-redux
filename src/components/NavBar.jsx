

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'

const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user )

  const logoutUser = () => {
    dispatch(clearUser())
    navigate('/')
  }

  return (
    <><div className='bg-info bg-gradient p-2 '>
      <Link to='/' className='me-2 btn btn-primary' >Blogs</Link>
      <Link to='/users' className='me-2 btn btn-primary' >Users</Link>
      <span >
        {user.username} logged in
        <button className='btn btn-light ms-3' onClick={logoutUser}>logout</button>
      </span>
    </div>
    <div>
      <h2>Blog App</h2>
    </div></>
  )
}

export default NavBar