import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "../question";

import "./questions.css";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://radiant-bayou-60840.herokuapp.com/questions"
      );
      setQuestions(response.data.data);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onNextClicked = (selectedOption) => {
    if (questions[currentIndex].correct_answer === selectedOption)
      setScore(score + 1);
    if (currentIndex + 1 > questions.length - 1) {
      setShowFinished(true);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setShowFinished(false);
    setScore(0);
  };

  return questions.length ? (
    <div>
      {showFinished ? (
        <div className="results">
          <img
            src="https://memegenerator.net/img/instances/70669406/your-watch-has-ended.jpg"
            alt="Your watch has ended"
          />
          <h3>
            Your results are out. You scored {score} out of {questions.length}
          </h3>
        </div>
      ) : (
        <Question
          onNextClicked={onNextClicked}
          question={questions[currentIndex]}
          key={questions[currentIndex].correct_answer}
        />
      )}
      {showFinished ? (
        <button className="try-again" onClick={resetQuiz}>
          Try again
        </button>
      ) : (
        <div className="questions-progress">
          {currentIndex + 1}/{questions.length}
        </div>
      )}
    </div>
  ) : (
    <p>Loading</p>
  );
};

export default Questions;
