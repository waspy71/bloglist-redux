

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
    <>
      <nav className='navbar navbar-expand-sm'>
        <div className='container row position-relative bg-info bg-gradient p-2 w-100'>
          <div className='col'>
            <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#nav'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className="collapse navbar-collapse" id='nav'>
              <ul className='navbar-nav'>
                <li className='nav-item my-1 my-sm-0'><Link to='/' className='me-2 btn btn-primary' >Blogs</Link></li>
                <li className='nav-item my-1 my-sm-0'><Link to='/users' className='me-2 btn btn-primary' >Users</Link></li>
              </ul>
            </div>
          </div>
          <div className='col'>
            <span className='position-absolute top-0 end-0 m-2'>
              {user.username} logged in
              <button className='btn btn-light ms-3' onClick={logoutUser}>logout</button>
            </span>
          </div>

        </div>
      </nav>
      <div>
        <h2>Blog App</h2>
      </div>
    </>
  )
}

export default NavBar