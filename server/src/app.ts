import express, { Application, Request, Response } from 'express'
import { AppController } from './app.controller'
import config from '../config'
import * as dotenv from 'dotenv'

dotenv.config()

const app: Application = express()
const appController = new AppController()

app.use(express.json())

app.post('/search', (req: Request, res: Response) => {
  appController.search(req, res)
})

app.listen(config.AppPort, (): void => {
  console.log(`Server running on ${config.AppHost}:${config.AppPort}/`)
})
