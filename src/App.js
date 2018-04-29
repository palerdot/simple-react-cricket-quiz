import React, { Component } from 'react'
import './App.css'

import {
  Container
} from 'reactstrap'

import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <Container fluid className="App">
        <header className="App-header">
          <h1 className="App-title">Simple React Cricket Quiz</h1>
        </header>
        <Home />
      </Container>
    )
  }
}

export default App
