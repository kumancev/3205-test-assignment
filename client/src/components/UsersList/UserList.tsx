import User from '@components/User/User'
import './userList.css'

export type UserData = {
  email: string
  number: string
}

export type UserListProps = {
  data: Array<UserData> | undefined
}

function UserList({ data }: UserListProps) {
  return (
    <div className="list__wrapper">
      {data && data.length > 0 ? (
        data.map((user) => (
          <User email={user.email} number={user.number} key={user.number} />
        ))
      ) : (
        <p>User not found</p>
      )}
    </div>
  )
}

export default UserList
