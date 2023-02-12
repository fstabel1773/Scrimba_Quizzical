import React from "react"

function StartPage(props) {

    return (
        <div className="container start-container">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some description if needed</p>
            <button className="btn newGameBtn" onClick={props.newGame}>Start quiz</button>
        </div>
    )
}

export default StartPage