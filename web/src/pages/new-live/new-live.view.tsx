import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { httpClient } from '../../http/http-client'
import { Live } from '../../models/live.mode'

import './new-live.style.css'

import photo from './photo.png'

export function NewLiveView () {
  const [created, setCreated] = useState(false)
  const [live, setLive] = useState<Live | undefined>()
  const [thumbnailUrl, setThumbnail] = useState('')
  const [title, setTitle] = useState('')
  const history = useHistory()

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await httpClient.post('/v1/lives', { thumbnailUrl, title })
    setLive(response.data)
    setCreated(true)
  }

  async function handleFinishLive () {
    await httpClient.post(`v1/lives/${live?._id}/close`)
    history.push('/lives')
  }

  return (
        <div className="new-live-page">
            <div className="card">
                <h2>{created ? 'Success' : 'Create New Live, Now!!!'}</h2>
                <img src={photo} alt="logo" />
                {
                    created
                      ? (
                            <div className="stream-data">
                                <h3>
                                    Your live was created, for connect use the url and stream key.
                            <br /> <br />
                                    <strong>URL: </strong>{process.env.REACT_APP_STREAM_URI}<br />
                                    <strong>Stream Key: </strong> {live?.streamKey}
                        </h3>
                                <button onClick={handleFinishLive} className="create-live-button" type="submit">FINISH LIVE</button>
                            </div>
                        )
                      : (<form onSubmit={handleSubmit} className="new-live-form">
                            <div className="input">
                                <label htmlFor="thumbnail">Thumbnail url:</label>
                                <input value={thumbnailUrl} onChange={e => setThumbnail(e.target.value)} type="text" id="thumbnail" />
                            </div>
                            <div className="input">
                                <label htmlFor="title">Title:</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} type="text" id="title" />
                            </div>
                            <button className="create-live-button" type="submit">OK</button>
                        </form>
                        )
                }
            </div>
        </div>
  )
}
