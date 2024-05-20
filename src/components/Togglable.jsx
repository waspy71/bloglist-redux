
import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(( props, refs ) => {
  const [createVisible, setCreateVisible] = useState(false)

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setCreateVisible(!createVisible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })


  return (
    <div className='mx-auto w-50'>
      <div style={hideWhenVisible}  className='text-center'>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='text-center'>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable


