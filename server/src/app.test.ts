import { application } from './tests/jest'

describe('AppController', () => {
  it('should return filtered data when email or number matches', async () => {
    await application
      .post('/search')
      .send({ email: 'jim', number: '221122' })
      .expect(200)
      .then((response) => {
        const data = response.body
        expect(data).toEqual([
          {
            email: 'jim@gmail.com',
            number: '221122',
          },
          {
            email: 'john@gmail.com',
            number: '221122',
          },
        ])
      })
  }, 10000)

  it('should return empty array if there is no match', async () => {
    await application
      .post('/search')
      .send({ email: 'test', number: '123' })
      .expect(200)
      .then((response) => {
        const data = response.body
        expect(data).toEqual([])
      })
  }, 10000)
})
