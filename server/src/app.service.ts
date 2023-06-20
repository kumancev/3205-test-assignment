import { data } from './mock/data'

interface DataItem {
  email: string
  number: string
}

export class AppService {
  public async search({ email, number }: DataItem) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      return this.searchInJson(email, number)
    } catch (error) {
      console.error(error)
      throw new Error('Search error')
    }
  }

  private searchInJson(email: string, number: string): DataItem[] {
    return data.filter(
      (item) => item.email.includes(email) || item.number.includes(number)
    )
  }
}
