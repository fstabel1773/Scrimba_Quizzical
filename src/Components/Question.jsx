import React from "react"
import Answer from "./Answer.jsx"
import he from "he"


function Question(props) {
    const answerElements = props.answers.map(answer => (
        <Answer
            key={answer.id}
            answerObj={answer}
            holdOption={props.holdOption}
            isChecked={props.isChecked}
        />
    ))

    return (
        <div className="question-container">
            <h3 className="question">{he.decode(props.questionText)}</h3>
            <div className="answer-container">
                {answerElements}
            </div>
        </div>
    )

}

export default Question