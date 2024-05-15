
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'



const User = () => {
  const id = useParams().id
  const user = useSelector(({ users }) =>
    users.find(user => user.id === id)
  )

  //fixes first render 'user' undefined problem
  if(!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs:</h3>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>
            {b.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User