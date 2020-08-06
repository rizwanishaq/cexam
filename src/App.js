import React, { useState } from "react";

import Questions from "./components/questions";
import QuestionModal from "./components/question-modal";

import Add from "./add.svg";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <header>
        <div>Conocimientos Constitucionales y Socioculturales de España</div>
      </header>
      <Questions />
      <button className="add-question" onClick={(_) => setModalOpen(true)}>
        <img src={Add} alt="Click to create a new question" />
      </button>
      <QuestionModal isOpen={modalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
