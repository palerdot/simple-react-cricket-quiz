import React from 'react'

import {Bar} from 'react-chartjs-2'

import {
  Alert,
  Container, Row, Col
} from 'reactstrap'


function _getScaleOptions(minValue, maxValue) {
  let options = {
    scales: {
        yAxes: [{
            ticks: {
                max: maxValue || 5,
                min: minValue || 0,
                stepSize: 1
            }
        }]
    }
  }

  return options.scales
}



const GraphViz = (props) => (
  <Container fluid style={{display: 'flex', flexDirection: 'column'}}>
    <h5 style={{margin: '11px 0'}}>Quiz Statistics</h5>
    <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Col sm={12}>
      {
        props.completed
        ? (
            <Bar
              data={props.data}
              // width={200}
              // height={200}
              options={{
                maintainAspectRatio: false,
                scales: _getScaleOptions(props.minValue, props.maxValue)
              }}
            />
          )
        : (
            <Alert color="light">
              Please complete the quiz to see the statistics
            </Alert>
          )
      }
      </Col>
    </Row>
  </Container>
)

export default GraphViz