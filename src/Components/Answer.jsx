import React from "react"

function Answer(props) {

    const styles = props.answerObj.isHold 
    ? {
        backgroundColor: "#D6DBF5",
        border: "none",
        } 
    : {}

    return (
        <p className="option"
        onClick={() => props.holdOption(props.answerObj.id)}
        style={styles}
        >{props.answerObj.answerText}</p>
    )
}

export default Answer