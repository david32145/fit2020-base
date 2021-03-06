import React, { useEffect, useState } from 'react'
import { ReactFlvPlayer } from 'react-flv-player'
import { useHistory, useParams } from 'react-router-dom'
import { httpClient } from '../../http/http-client'
import { Live } from '../../models/live.mode'

import './room.style.css'

export function RoomView () {
  const [loading, setLoading] = useState(true)
  const [live, setLive] = useState<Live | undefined>()
  const params = useParams() as Record<string, any>
  const history = useHistory()

  useEffect(() => {
    httpClient.get(`/v1/lives/${params.id}`)
      .then((response) => {
        const data = response.data as Live
        if (data.status === 'CLOSED') {
          history.push('/lives')
          return
        }
        setLive(data)
        setLoading(false)
      })
      .catch(() => history.push('/lives'))
  }, [history, params])
  return (
    loading
      ? (<div className="loading"><div className="square" /></div>)
      : (
                <div className="room-page">
                    <h1>{live?.title}</h1>
                    <ReactFlvPlayer
                        url={`${process.env.REACT_APP_VIDEO_URI}/${live?.streamKey}.flv`}
                        heigh="800px"
                        width="800px"
                    />
                </div >
        )
  )
}
