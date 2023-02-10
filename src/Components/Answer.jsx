import React from "react"

function Answer(props) {

    return (
        <p className="option">{props.answerObj.answerText}</p>
    )
}

export default Answer