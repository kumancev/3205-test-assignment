import { useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios, { CancelTokenSource } from 'axios'
import api from '@api/config'
import UserList, { UserData } from '@components/UsersList/UserList'

type Inputs = {
  email: string
  number: string
}

function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()
  const [items, setItems] = useState<Array<UserData> | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const cancelTokenSource = useRef<CancelTokenSource | null>(null)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true)
      setError('')

      console.log(data)

      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('Operation canceled by the user')
      }

      cancelTokenSource.current = axios.CancelToken.source()

      const formattedData = {
        ...data,
        number: data.number ? data.number.replace(/-/g, '') : '',
      }

      const response = await api.post('/search', formattedData, {
        cancelToken: cancelTokenSource.current.token,
      })

      console.log(response.data)
      setItems(response.data)

      reset()
      setIsLoading(false)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      } else {
        setError('An error occurred while sending data')
      }
    }
  }

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Number</label>
          <input
            {...register('number')}
            onChange={(e) => {
              const { value } = e.target
              e.target.value = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(?=\d)/g, '$1-')
            }}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Send</button>
        {isLoading ? <p>Loading...</p> : <UserList data={items} />}
      </form>
    </>
  )
}

export default SearchForm
