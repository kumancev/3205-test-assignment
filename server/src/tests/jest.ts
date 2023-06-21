import request from 'supertest'
import app from '../app'

export const application = request(app)
