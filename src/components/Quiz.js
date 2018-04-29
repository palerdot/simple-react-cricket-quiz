import React from 'react'

import _ from 'lodash'

import {
  Container, Row, Col,
  Input, Button,
  Badge,
} from 'reactstrap'

import Noty from 'noty'

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    // set the state
    this.state = {
      answers: {},
      show_unanswered_hint: false
    }
  }

  // helper function to set answer
  _setAnswer(question_id, answer_id) {
    let answers = _.clone(this.state.answers)
    answers[question_id] = answer_id
    this.setState({
      answers
    })
  }

  // helper function to calculate whether to show unanswered hint
  _getUnansweredStyle(question_id) {
    if (!this.state.show_unanswered_hint) {
      return ''
    }
    // we have to show unanswered hint if it is not answered
    return !this.state.answers[question_id] ? 'unanswered' : ''
  }

  // helper function to show badge after completion
  _showQuestionStatusBadge(question_id) {
    if (!this.props.completed) {
      return ''
    }
    // completed; we need to highlight wrong answer
    let answered = this.state.answers[question_id]
    let correct_answer = _.chain(this.props.data)
                          .find((q) => q.id === question_id)
                          .get('answers')
                          .find((a) => a.correct)
                          .get('id')
                          .value()

    return answered === correct_answer 
            ? (
                <Badge color="success">Correct</Badge>
              ) 
            : (
                <Badge color="danger">Incorrect</Badge>
              )
  }

  // helper function to highlight wrong answers
  _highlightWrongAnswers(question_id) {
    if (!this.props.completed) {
      return ''
    }
    // completed; we need to highlight wrong answer
    let answered = this.state.answers[question_id]
    let correct_answer = _.chain(this.props.data)
                          .find((q) => q.id === question_id)
                          .get('answers')
                          .find((a) => a.correct)
                          .get('id')
                          .value()

    return answered === correct_answer ? '' : 'wrong-answer'
  }

  // handle submit
  _handleSubmit = () => {
    // find out if the all the questions are answered
    let all_answered = _.size(this.state.answers) === _.size(this.props.data)
    if (!all_answered) {
      this.setState({
        show_unanswered_hint: true
      })
      // show alert to indicate to answer all questions
      new Noty({
        text: 'Please answer all the questions ...',
        type: 'error',
        theme: 'sunset',
        timeout: 1000
      }).show()
      // do not proceed
      return
    }
    // all question answered
    // call props updateAnswersHandler
    this.props.updateAnswersHandler(this.state.answers)
  }

  // helper function to render quiz data
  _renderQuizData() {
    return this.props.data.map((d) => (
      <Row key={d.id} className={'question-holder ' + this._getUnansweredStyle(d.id)}>
        <Col sm={12} className='question'>
          {d.question} {this._showQuestionStatusBadge(d.id)}
        </Col>
        <Col sm={12}>
          <Input type="select" name={"select-" + d.id}
            disabled={this.props.completed}
            value={this.state.answers[d.id] || false}
            onChange={(e) => {
              this._setAnswer(d.id, parseInt(e.target.value, 10))
            }}
          >
            <option value={false}>Select an answer</option>
            {
              d.answers.map((a) => <option key={a.id} value={a.id}>{a.answer}</option>)
            }
          </Input>
        </Col>
      </Row>
    ))
  }

  render() {
    return (
      <Container fluid style={{marginBottom: '7em'}}>
        {this._renderQuizData()}
        {
          !this.props.completed
          ? (
              <Row>
                <Col sm={6}>
                  <Button block outline color="success"
                    onClick={this._handleSubmit}
                  >Submit</Button>
                </Col>
                <Col sm={6}>
                  <Button block outline color="secondary"
                    onClick={() => {
                      this.setState({
                        show_unanswered_hint: false,
                        answers: {}
                      })
                    }}
                  >Clear</Button>
                </Col>
              </Row>
            )
          : (
              <Row>
                <Col sm={12}>
                  <Button outline color="primary"
                    onClick={() => {
                      this.setState({
                        show_unanswered_hint: false,
                        answers: {}
                      })
                      this.props.redoHandler() 
                    }}
                  >Redo</Button>
                </Col>
              </Row>
            )
        }
      </Container>
    )
  }
}

export default Quiz