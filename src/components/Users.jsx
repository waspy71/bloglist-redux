
import { useEffect } from 'react'
import { getUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())

  },[dispatch])

  const users = useSelector(({ users }) => users)

  return (
    <div>
      <h3>Users</h3>
      {!users
        ? null
        :<table>
          <tbody>
            <tr>
              <th>User:</th>
              <th>Blogs created</th>
            </tr>
            {users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link
                    to={`/users/${user.id}`}
                    state={user}
                  >
                    {user.username}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Users