import { Request, Response } from 'express'
import { AppService } from './app.service'

export class AppController {
  private appService: AppService

  constructor() {
    this.appService = new AppService()
  }

  async search(req: Request, res: Response) {
    const data = req.body
    const results = await this.appService.search(data)

    res.json(results)
  }
}
