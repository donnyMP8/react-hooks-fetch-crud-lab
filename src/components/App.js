import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [page, setPage] = useState("list");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (page === "list") {
      fetch("http://localhost:4000/questions")
        .then((r) => r.json())
        .then((data) => setQuestions(data));
    }
  }, [page]);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    setPage("list");
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <h1>Quiz Admin</h1>
      <button onClick={() => setPage("list")}>View Questions</button>
      <button onClick={() => setPage("form")}>New Question</button>
      {page === "list" ? (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      ) : (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      )}
    </main>
  );
}

export default App;
