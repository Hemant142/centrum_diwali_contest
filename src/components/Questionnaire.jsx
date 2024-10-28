import React, { useState } from 'react';
import './Questionnaire.css';

const Questionnaire = ({ step, questions, onNext, onPrev, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const isLastQuestion = step === questions.length - 1;
  const { question, options } = questions[step];

  const handleOptionChange = (option) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[step] = option;
    setSelectedAnswers(newAnswers);
  };

  // Determine if the Next button should be disabled
  const isNextDisabled = !selectedAnswers[step];

  return (
    <div className="questionnaire">
      <h3>Question {step + 1}</h3>
      <p>{question}</p>
      {options.map((option, idx) => (
        <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "center" }} onClick={() => handleOptionChange(option)}>
          <div>
            <input
              className="radio-option"
              type="radio"
              name={`question-${step}`}
              value={option}
              checked={selectedAnswers[step] === option}
              onChange={() => handleOptionChange(option)}
              id={`option-${step}-${idx}`} // Added ID for label association
            />
          </div>
          <label htmlFor={`option-${step}-${idx}`} className={selectedAnswers[step] === option ? 'selected' : ''}>
            {option}
          </label>
        </div>
      ))}
      <div className="nav-buttons">
        {step > 0 && <button className='previous-next' onClick={onPrev}>Previous</button>}
        {isLastQuestion ? (
          <button onClick={() => onSubmit(selectedAnswers)}>Submit</button>
        ) : (
          <button className='previous-next' onClick={onNext} disabled={isNextDisabled}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
