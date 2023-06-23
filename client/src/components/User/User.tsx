import { UserData } from '@components/UsersList/UserList'
import './user.css'

function User({ email, number }: UserData) {
  return (
    <div>
      <p>{email}</p>
      <p>{number}</p>
    </div>
  )
}

export default User
