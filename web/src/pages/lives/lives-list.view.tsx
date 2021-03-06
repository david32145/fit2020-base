import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { httpClient } from '../../http/http-client'
import { Live } from '../../models/live.mode'
import './lives-list.style.css'

export function LivesListView () {
  const [loading, setLoading] = useState(true)
  const [activityLives, setActivityLives] = useState<Live[]>([])
  const [endedLives, setEndedLives] = useState<Live[]>([])
  const history = useHistory()

  useEffect(() => {
    httpClient.get('/v1/lives?status=OPENED')
      .then((response) => {
        setActivityLives(response.data)
        httpClient.get('/v1/lives?status=CLOSED')
          .then((response) => {
            setEndedLives(response.data)
            setLoading(false)
          })
      })
  }, [])

  function handleNewLive () {
    history.push('/lives/new')
  }

  return (
    loading
      ? (<div className="loading"><div className="square" /></div>)
      : (
                <div className="lives-list-page">
                    <h1 className="title">Fit On - Live</h1>
                    <button onClick={handleNewLive} className="start-live-button" type="button">Start new live</button>
                    <h2 className="lives-title">Lives</h2>
                    {
                        activityLives.length > 0
                          ? (
                                <div className="card-list">
                                    {
                                        activityLives.map((live) => (
                                            <div key={live._id} className="card">
                                                <span>Live</span>
                                                <img src={live.thumbnailUrl} alt="thumbnail" />
                                                <Link to={`/lives/${live._id}`}>{live.title}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                          : (
                                <div className="empty-lives">
                                    <p>no lives to show</p>
                                </div>
                            )
                    }
                    <h2 className="lives-title">Ended</h2>
                    {
                        endedLives.length > 0
                          ? (
                                <div className="card-list">
                                    {
                                        endedLives.map((live) => (
                                            <div key={live._id} className="card">
                                                <img src={live.thumbnailUrl} alt="thumbnail" />
                                                <a href="#">{live.title}</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                          : (
                                <div className="empty-lives">
                                    <p>no lives to show</p>
                                </div>
                            )
                    }
                </div>
        )
  )
}
