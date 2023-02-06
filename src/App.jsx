import { useState } from 'react'
import React from "react"
import Answer from "./Components/Answer.jsx"
import StartPage from "./Components/StartPage.jsx"

function App() {
 const [isStarted, setIsStarted] = useState(false)

 function startGame() {
  setIsStarted(true)
 }
  

  return (
    <div className="background">
    {isStarted ? <Answer /> : <StartPage />}
    </div>
  )
}

export default App
