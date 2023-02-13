import React from "react"
import he from "he"

function Answer(props) {
    console.log(props.answerObj.id + " updated")
    let styles = {};
    if (!props.isChecked && props.answerObj.isHold) {
        styles = {
            backgroundColor: "#D6DBF5",
            border: "none",
        } 
    } 
    if (props.isChecked) {
        if (props.answerObj.isHold) {
            if (props.answerObj.isCorrect) {
                styles = {
                    backgroundColor: "#94D7A2",
                    border: "none",
                }
            } else {
                styles = {
                    opacity: 0.5,
                    backgroundColor: "#F8BCBC",
                    border: "none",
                }
            } 
        } else if (props.answerObj.isCorrect) {
            styles = {
                backgroundColor: "#94D7A2",
                border: "none",
                opacity: 0.5,
            }
        } else {
            styles = {
                opacity: 0.5,
            }
        }
    }

    return (
        <p className="option"
        onClick={() => props.holdOption(props.answerObj.id)}
        style={styles}
        >{he.decode(props.answerObj.answerText)}</p>
    )
}

export default Answer