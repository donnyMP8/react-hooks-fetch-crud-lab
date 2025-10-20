import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleCorrectAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value, 10);

    // 1️⃣ Optimistically update UI immediately
    onUpdate({ ...question, correctIndex: newCorrectIndex });

    // 2️⃣ Send PATCH request to backend
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      // 3️⃣ Ensure we also sync after server responds
      .then((updatedQuestion) => onUpdate(updatedQuestion))
      .catch(() => {
        // Optional: rollback if server fails
        onUpdate(question);
      });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select
          aria-label="Correct Answer"
          value={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
