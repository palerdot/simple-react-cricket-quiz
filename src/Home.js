// main home app that holds all the state -> holds quiz and GraphViz components
import React from 'react'

import {
  Container, Row, Col
} from 'reactstrap'

class Home extends React.Component {
  constructor(props) {
    super(props)
    // set the state
    this.state = {}
  }

  render() {
    <Container fluid>
      <Row>
        <Col sm={8}>
          porumai! quiz
        </Col>
        <Col sm={4}>
          porumai! graph
        </Col>
      </Row>
    </Container>
  }
}

export default Home