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
    }
  }

  private searchInJson(email: string, number: string): DataItem[] {
    if (number) {
      return data.filter(
        (item) => item.email === email && item.number === number
      )
    }
    return data.filter((item) => item.email === email)
  }
}
