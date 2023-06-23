import { useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios, { CancelTokenSource } from 'axios'
import api from '@api/config'
import UserList, { UserData } from '@components/UsersList/UserList'
import './searchForm.css'

type Inputs = {
  email: string
  number: string
}

function Search() {
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
    <div className="search__wrapper">
      <section className="form__section">
        <h1>Find members</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__wrapper">
            <label className="form__label">Email:</label>
            <input
              className="form__input"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <label className="form__label">Number:</label>
            <input
              className="form__input"
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
          <button className="form__button" type="submit">
            Search
          </button>
        </form>
      </section>
      {isLoading && <p className="text__loader">Loading...</p>}
      {items && (
        <section className="data__section">
          <UserList data={items} />
        </section>
      )}
    </div>
  )
}

export default Search
