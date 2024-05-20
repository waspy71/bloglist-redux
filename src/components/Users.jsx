
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Users = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div>
      <h2>Users</h2>
      {!users
        ? null
        :<div className='m-5'>
          <table className="table table-striped table-hover table-secondary" >
            <thead>
              <tr>
                <th>User:</th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody className='table-group-divider table-primary'>
              {users.map(user =>
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`} >
                      {user.username}
                    </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default Users