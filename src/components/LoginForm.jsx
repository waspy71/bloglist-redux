import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`logging in with ${username} and ${password}`)

    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(notifyWith(`${username} logged in`))

    } catch(exception) {
      console.log('here',exception)
      dispatch(notifyWith(exception.response.data.error, 'error'))
    }
  }

  return (
    <div className='text-center mt-5'>
      <h3>Log in to application</h3>
      <form onSubmit={handleLogin} className='w-25 mx-auto'>
        <div className='form-floating mb-3'>
          <input
            className='form-control'
            placeholder='Username'
            type='text'
            id="username"
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor='Username'>Username</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            className='form-control'
            placeholder='Password'
            type='text'
            id="password"
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <label htmlFor='Password'>Password</label>
        </div>
        <button id="login-button" type='submit'>login</button>
      </form>
    </div>
  )
}


export default LoginForm