import express, { Application, Request, Response } from 'express'
import config from '../config'
import * as dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

app.use('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

app.listen(config.AppPort, (): void => {
  console.log(`Server running on ${config.AppHost}:${config.AppPort}/`)
})
