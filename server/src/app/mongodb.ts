import mongoose from 'mongoose'
import debug from 'debug'

const mongoLog = debug('@app/mongo')

const MONGO_HOST = process.env.MONGO_HOST
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DATABASE = process.env.MONGO_DATABASE
const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => mongoLog('mongodb connected'))
  .catch((e) => mongoLog('error on connect: %s', e))
