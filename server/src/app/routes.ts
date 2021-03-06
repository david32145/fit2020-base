import debug from 'debug'
import { LiveModel } from '@models/Live'
import { LiveRepository } from '@repositories/LiveRepository'
import { Router } from 'express'

const routesLog = debug('@app/routes')

const routes = Router()
const liveRepository = new LiveRepository()

routes.get('/v1/lives', async (req, res) => {
  const queryStatus = (req.query.status || 'OPENED') as ('OPENED' | 'CLOSED')
  const lives = await liveRepository.findByStatus(queryStatus)
  return res.status(200).json(lives)
})

routes.post('/v1/lives', async (req, res) => {
  const { thumbnailUrl, title } = req.body
  const streamKey = makeid(8)
  const status = 'OPENED'
  let live = new LiveModel({ streamKey, status, thumbnailUrl, title })
  live = await liveRepository.add(live)
  return res.status(201).json(live)
})

routes.post('/v1/lives/:id/close', async (req, res) => {
  const id = req.params.id
  let live = await liveRepository.findById(id)
  if (!live) {
    routesLog('live not found')
    return res.status(400).json()
  }
  if (live.status === 'CLOSED') {
    routesLog('live already closed')
    return res.status(400).json({ message: 'already closed' })
  }
  live.status = 'CLOSED'
  live = await liveRepository.update(live)
  return res.status(200).json(live)
})

routes.get('/v1/lives/:id', async (req, res) => {
  const id = req.params.id
  const live = await liveRepository.findById(id)
  if (!live) {
    routesLog('live not found')
    return res.status(400).json()
  }
  return res.status(200).json(live)
})

function makeid (length: number): string {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default routes
