import { useState } from "react"
import PropTypes from 'prop-types'
import loginServices from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from "react-redux"
import { notifyWith } from "../reducers/notificationReducer"

const LoginForm = ({ setUser}) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`logging in with ${username} and ${password}`)

    try {
      const user = await loginServices.login({username, password})

      window.localStorage.setItem(
        'loggedBlogappUser', 
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
      dispatch(notifyWith(`${user.username} logged in`))

    } catch(exception) {
      console.log('here',exception)
      dispatch(notifyWith(exception.response.data.error, 'error'))
    }
  }

  return (
    <div>
        <h3>Log in to application</h3>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type='text'
              id="username"
              value={username}
              name='username'
              onChange={({target}) => setUsername(target.value)}
              />
          </div>
          <div>
            Password
            <input
              type='text'
              id="password"
              value={password}
              name='password'
              onChange={({target}) => setPassword(target.value)}
              />
          </div>
          <button id="login-button" type='submit'>login</button>
        </form>
      </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LoginForm