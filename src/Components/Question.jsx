import React from "react"
import Answer from "./Answer.jsx"

function Question(props) {

    const answerElements = props.answers.map(answer => (
        <Answer
            answerObj={answer}
        />
    ))

    return (
        <div className="question-container">
            <h3 className="question">{props.questionText}</h3>
            <div className="answer-container">
                {answerElements}
            </div>
        </div>
    )
}

export default Question