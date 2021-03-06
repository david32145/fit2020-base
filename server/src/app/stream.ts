import NodeMediaServer from 'node-media-server'

const config = {
  rtmp: {
    port: process.env.RTMP_PORT || 3500,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.FLV_PORT || 4000,
    allow_origin: '*'
  }
}

export const nodeMediaServer = new NodeMediaServer(config)
