import { useSelector } from 'react-redux'

const Notification = () => {

  const info = useSelector(({ notification }) => notification)

  if (!info.message) {
    return
  }

  // const style = {
  //   color: info.type === 'error' ? 'red' : 'green',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10
  // }

  return (
    <div className={`notification alert alert-${info.type === 'error' ? 'danger' : 'success'} my-2`}>
      {info.message}
    </div>
  )
}

export default Notification