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
      {data &&
        data.map((user) => (
          <User email={user.email} number={user.number} key={user.number} />
        ))}
    </div>
  )
}

export default UserList
