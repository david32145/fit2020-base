import debug from 'debug'
import app from './app/statup'
import { nodeMediaServer } from './app/stream'

const httpLog = debug('@app/http')

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  httpLog('server is running on http://127.0.0.0:%d', PORT)
})

nodeMediaServer.run()
