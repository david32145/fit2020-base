import debug from 'debug'
import { ILive, LiveModel } from '../models/Live'

const liveRepositoryLog = debug('@app/liveRepository')

export class LiveRepository {
  async add (live: ILive): Promise<ILive> {
    await live.save()
    liveRepositoryLog('new live created')
    return live
  }

  async findByStatus (status: 'OPENED' | 'CLOSED'): Promise<ILive[]> {
    const lives = await LiveModel.find({ status })
    return lives
  }

  async findById (id: string): Promise<ILive | null> {
    const live = await LiveModel.findById(id)
    return live
  }

  async update (live: ILive): Promise<ILive> {
    await live.save()
    liveRepositoryLog('live uptated')
    return live
  }
}
