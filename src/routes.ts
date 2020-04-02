import { Router } from 'express'
import TvFullController from './app/controllers/TvFullController'
const routes = Router()

routes.get('/channel', TvFullController.searchCurrentPrograms)

export default routes
