import axios from 'axios'

const api = axios.create({
  baseURL: 'https://three205-test-api.onrender.com',
})

export default api
