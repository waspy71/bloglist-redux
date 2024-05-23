
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
      <div className='row row-cols-1 row-cols-sm-2 gx-0'>
        {user.blogs.map(b =>
          <div key={b.id} className='card g-2 '>
            <h3 className='card-header'>Title : {b.title}</h3>
            <div className='card-body'>By {b.author}</div>
            <div className='card-footer'><a href={b.url}>{b.url}</a></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default User