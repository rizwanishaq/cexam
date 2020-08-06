import React, { useState } from "react";
import "./question.css";

const Question = ({ question, onNextClicked }) => {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const onOptionClicked = (option) => {
    setAnswered(true);
    setSelectedOption(option);
  };

  const isCorrect = (option) => {
    return option === question.correct_answer;
  };

  const resetQuestion = () => {
    setAnswered(false);
    setSelectedOption({});
    onNextClicked(selectedOption);
  };

  return (
    <div className="question">
      <div className="question-image-holder">
        <img
          className="question-image"
          src={
            question.image
              ? question.image.downloadUrl
              : "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png"
          }
          alt={question}
        />
      </div>
      <section>
        <div className="question-text-holder">
          {answered && <button onClick={resetQuestion}>Next</button>}
          <h4 className="question-text">{question.question}</h4>
        </div>

        {[...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - 0.5)
          .map((option, index) => {
            return (
              <button
                key={index}
                onClick={() => onOptionClicked(option)}
                disabled={answered && !isCorrect(option)}
                className={`question-option ${answered &&
                  isCorrect(option) &&
                  "correct"}
              ${selectedOption === option && !isCorrect(option) && "wrong"}
              `}
              >
                <span>
                  {answered ? (isCorrect(option) ? "✔" : "X") : index + 1}
                </span>
                {option}
              </button>
            );
          })}
      </section>
    </div>
  );
};

export default Question;
