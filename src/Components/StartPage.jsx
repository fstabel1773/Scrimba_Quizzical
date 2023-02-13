import React from "react"

function StartPage(props) {
    const loading = <h1>Loading...</h1>

    const intro = 
        <div className="container start-container">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some description if needed</p>
            <button className="btn newGameBtn" onClick={props.newGame}>Start quiz</button>
        </div>

    return (
    <div>
        {props.loading ? loading : intro}
    </div>
    )
}

export default StartPage