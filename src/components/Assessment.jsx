/* eslint-disable react/prop-types */
import { useState } from "react";

const Assessment = ({ assessment, onComplete }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === assessment.correctAnswer.toLowerCase()) {
      setFeedback("Correct! Well done.");
      onComplete();
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">{assessment.question}</h3>
      {assessment.type === "multiple-choice" ? (
        assessment.options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              name="answer"
              value={option}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span>{option}</span>
          </label>
        ))
      ) : (
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
      {feedback && <p className="mt-2 text-sm text-green-500">{feedback}</p>}
    </div>
  );
};

export default Assessment;
