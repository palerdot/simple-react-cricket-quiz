// main home app that holds all the state -> holds quiz and GraphViz components
import React from 'react'

import _ from 'lodash'

import {
  Container, Row, Col
} from 'reactstrap'

// fetch data
import data from '../data/data'

import Quiz from './Quiz'
import GraphViz from './GraphViz'

class Home extends React.Component {
  constructor(props) {
    super(props)
    // set the state
    this.state = {
      completed: false, // tracks if quiz is completed
      quiz: this._updateQuizData(), // tracks quiz data
      answers: {} // tracks quiz answers for each question
    }
  }

  // handler that updates the answers and sets the state to completed
  _updateAnswers = (answers) => {
    this.setState({
      answers,
      completed: true
    })
  }

  // handler that resets quiz
  _redoQuiz = () => {
    this.setState({
      answers: {},
      completed: false
    })
  }

  _updateQuizData() {
    // we need to loop through our data and generate ideas
    let quiz_data = _.map(data.quiz, (q, q_index) => {
      let answers = _.map(q.answers, (a, a_index) => {
        return _.assign({}, a, {
          id: a_index + 1
        })
      })
      return _.assign({}, q, {
        id: q_index + 1,
        answers
      })
    })
    
    return quiz_data
  }

  // calculate statistics for the graph
  _calculateStatistics = () => {
    if (!this.state.completed) {
      return {}
    }

    // calculate correct and wrong value
    let CORRECT = 0
    let WRONG = 0

    // go through our answers
    _.each(this.state.answers, (answer, qid) => {
      let question_id = parseInt(qid, 10)
      let correct_answer = _.chain(this.state.quiz)
                            .find((q) => q.id === question_id)
                            .get('answers')
                            .find((a) => a.correct)
                            .get('id')
                            .value()

      if (answer === correct_answer) {
        CORRECT++
      } else {
        WRONG++
      }
    })

    const data = {
      labels: ['correct', 'incorrect'],
      datasets: [
        {
          label: 'Quiz statistics',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [CORRECT, WRONG]
        }
      ]
    }

    return data
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={8}>
            <Quiz
              completed={this.state.completed} 
              data={this.state.quiz}
              updateAnswersHandler={this._updateAnswers}
              redoHandler={this._redoQuiz}
            />
          </Col>
          <Col sm={4}>
            <GraphViz 
              completed={this.state.completed}
              data={this._calculateStatistics}
              minValue={0}
              maxValue={_.size(this.state.answers)}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home