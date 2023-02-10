import { useEffect, useState } from 'react'
import React from "react"
import {nanoid} from "nanoid"
import Question from "./Components/Question.jsx"
import StartPage from "./Components/StartPage.jsx"

function App() {
 const [questions, setQuestions] = useState([])

 
 // Using session tokens for tracking which questions already retrieved

  function generateCustomAnswerObject() {

  }

  function generateCustomQuestionObject() {

  }

async function getQuestions() {
  try {

    // fetch data
    const response = await fetch(`https://opentdb.com/api.php?amount=5`)
    const data = await response.json()
    
    const customQuestionsArray = data.results.map(question => {
      // Generate array of all answers for one question and mixing them up
      // nb: opdb delivers still seems to deliver array of all answers including the correct one,
      // but this last isn't accessible for some reason (array of length n, but just n-1 elements available).
      // I think this is due to some intern referencing the correct_answer.
      let allAnswersArray = question.incorrect_answers
      allAnswersArray.push(question.correct_answer)

      // creater answer-objects
      allAnswersArray = allAnswersArray.map(answer => {
        return {
          id: nanoid(),
          answerText: answer,
          isCorrect: answer === question.correct_answer ? true : false,
          isHold: false,
        }
      })

      // shuffle answerArray
      allAnswersArray.sort(() => Math.random() - 0.5);

      // generate custom questionObjects
      const customQuestionObject = {
        id: nanoid(),
        questionText: question.question,
        answers: allAnswersArray,
      }

      return customQuestionObject
    })

    // console.log(customQuestionsArray)
    
    setQuestions(customQuestionsArray)
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  getQuestions()
  }, []
)

const questionElements = questions.map((question) => (
  <Question
    key={question.id}
    questionText={question.questionText}
    answers={question.answers}
  />
))

  return (
    <div className="background">
      <div className="container question-section-container">
        {questionElements}
        <button className="btn check-answer-btn">Check answer</button>
      </div>
    </div>
  )
}

export default App
