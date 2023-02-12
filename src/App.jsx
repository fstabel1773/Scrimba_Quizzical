import { useEffect, useState } from 'react'
import React from "react"
import { nanoid } from "nanoid"
import Question from "./Components/Question.jsx"
import StartPage from "./Components/StartPage.jsx"

function App() {
 const [questions, setQuestions] = useState([])
 const [score, setScore] = useState(0)
 const [isChecked, setIsChecked] = useState(false)

function getScore() {
  setScore(questions.filter(question => {
    return question.answers.some(answer => 
      answer.isHold
      && answer.isCorrect)
  }).length)
}

useEffect(() => {
  if (questions.length > 0) {
    getScore(), [score]
  }
})

function checkAnswers() {
  setIsChecked(true)
}

 
 // Using session tokens for tracking which questions already retrieved


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

      // create answer-objects
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

// useEffect(() => {
//   getQuestions()
//   }, []
// )

// ugly, but working:
function holdOption(id) {
  setQuestions(prevQuestions => prevQuestions.map(question => {
    if (question.answers.filter(answer => id === answer.id).length === 0
    ) {
      return {...question}
    } else {
      return {...question, answers: question.answers.map(answer => {
        return answer.id === id ? {...answer, isHold: true} : {...answer, isHold: false}
        })
      }
    }
  }))
}

function newGame() {
  setIsChecked(false);
  getQuestions();
}

const questionElements = questions.map((question) => (
  <Question
    key={question.id}
    questionText={question.questionText}
    answers={question.answers}
    holdOption={holdOption}
    isChecked={isChecked}
  />
))

const footer = <button className="btn check-answer-btn" onClick={checkAnswers}>Check answer</button>;

const footerChecked = <div className="footerChecked"><h3>You scored {score}/5 answers.</h3>
<button className="btn" onClick={newGame}>Play again</button></div>;

  return (
    <div className="background">
      {questions.length > 0
      ? <div className="container question-section-container">
            {questionElements}
            {isChecked ? footerChecked : footer}        
          </div>
      : <StartPage newGame={newGame} />}
    </div>
  )
}

function generateCustomAnswerObject() {

}

function generateCustomQuestionObject() {

}


export default App
