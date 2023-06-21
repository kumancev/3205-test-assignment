import User from '@components/User/User'

export type UserData = {
  email: string
  number: string
}

export type UserListProps = {
  data: Array<UserData> | undefined
}

function UserList({ data }: UserListProps) {
  return (
    <>
      {data &&
        data.map((user) => (
          <User email={user.email} number={user.number} key={user.number} />
        ))}
    </>
  )
}

export default UserList
