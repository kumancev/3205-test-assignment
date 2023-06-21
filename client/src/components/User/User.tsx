import { UserData } from '@components/UsersList/UserList'

function User({ email, number }: UserData) {
  return (
    <div>
      <p>Email: {email}</p>
      <p>Number: {number}</p>
    </div>
  )
}

export default User
