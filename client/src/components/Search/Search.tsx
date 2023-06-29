import { useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import api from '@api/config'
import UserList, { UserData } from '@components/UsersList/UserList'
import './search.css'

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
  const abortControllerRef = useRef<AbortController | null>(null)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true)
      setError('')

      if (abortControllerRef.current) {
        abortControllerRef.current.abort('Operation canceled by the user')
      }

      abortControllerRef.current = new AbortController()

      const formattedData = {
        ...data,
        number: data.number ? data.number.replace(/-/g, '') : '',
      }

      const response = await api.post('/search', formattedData, {
        signal: abortControllerRef.current.signal,
      })

      setItems(response.data)

      reset()
      setIsLoading(false)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      } else {
        setIsLoading(false)
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
              {...register('number', {
                required: false,
                pattern: {
                  value: /^\d{2}-\d{2}-\d{2}$/,
                  message: 'Invalid phone number format (XX-XX-XX)',
                },
              })}
              onChange={(e) => {
                const { value } = e.target
                e.target.value = value
                  .replace(/\D/g, '')
                  .replace(/(\d{2})(?=\d)/g, '$1-')
              }}
            />
            {errors.number && <span>{errors.number.message}</span>}
          </div>
          {error && <p>{error}</p>}
          <button className="form__button" type="submit">
            Search
          </button>
        </form>
      </section>
      {isLoading && <p className="text__loader">Loading...</p>}
      {items && !isLoading && (
        <section className="data__section">
          <UserList data={items} />
        </section>
      )}
    </div>
  )
}

export default Search
