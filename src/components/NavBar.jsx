

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

  const divStyle = {
    background: 'lightgrey',
    padding: 5,
  }

  const style = {
    marginRight: 5
  }

  return (
    <><div style={divStyle}>
      <Link to='/' style={style}>Blogs</Link>
      <Link to='/users' style={style}>Users</Link>
      <span style={style}>
        {user.username} logged in
        <button onClick={logoutUser}>logout</button>
      </span>
    </div>
    <div>
      <h2>Blog App</h2>
    </div></>
  )
}

export default NavBar