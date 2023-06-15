import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(questions => setQuestions(questions))
  }, [])

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => {
        const updatedQs = questions.filter(question => question.id !== id)
        setQuestions(updatedQs)
      })
  }

  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({correctIndex})
    })
      .then(res => res.json)
      .then(updatedQ => {
        const updatedQstns = questions.map(qstn => {
          if(qstn.id === updatedQ.id){
            return updatedQ
          }
          return qstn
        })
        setQuestions(updatedQstns)
      })
  }

  const questionItems = questions.map(question => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
