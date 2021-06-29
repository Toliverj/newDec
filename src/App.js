import React from 'react'
import Home from './Home'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Game from './Game'


const App = () => {
  return (
    <div>
      <Router>
        <Route exact path = '/'>
          <Home/>
        </Route>
        <Route exact path = '/game/:id'>
          <Game/>
        </Route>
      </Router>
    </div>
  )
}

export default App
