import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import './index.css'
import { LivesListView } from './pages/lives/lives-list.view'
import { NewLiveView } from './pages/new-live/new-live.view'
import { RoomView } from './pages/room/room.view'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/lives" exact>
          <LivesListView />
        </Route>
        <Route path="/lives/new" exact>
          <NewLiveView />
        </Route>
        <Route path="/lives/:id" exact>
          <RoomView />
        </Route>
        <Route path="*">
          <Redirect to="/lives" />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
