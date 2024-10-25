import React, { useState, useEffect } from 'react';
import Questionnaire from './components/Questionnaire';
import Celebrate from './components/Celebrate';
import './App.css';
import './components/Questionnaire.css'; // Import the new questionnaire CSS
import logo from "./Images/logo.png";
import backgroundImage from "./Images/backgroundImage.png"
// Shuffle function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [userExists, setUserExists] = useState(false);


  const questions = [
    {
      question: "What is the term for spreading investments across various assets?",
      options: ["Compounding", "Inflation", "Diversification", "Liquidity"],
      answer: "Diversification",
    },
    {
      question: "Which asset class represents ownership in a company?",
      options: ["Bonds", "Stocks", "Real Estate", "Gold"],
      answer: "Stocks",
    },
    {
      question: "What is the process of earning interest on both the initial principal and the accumulated interest?",
      options: ["Diversification", "Compounding", "Depreciation", "Liquidity"],
      answer: "Compounding",
    },
    {
      question: "Which of the following is considered a low-risk investment?",
      options: ["Stocks", "Mutual Funds", "Bonds", "Cryptocurrency"],
      answer: "Bonds",
    },
    {
      question: "What type of investment is typically used for retirement savings with tax benefits?",
      options: ["Mutual Funds", "Bonds", "Real Estate", "Pension Funds"],
      answer: "Pension Funds",
    },
    {
      question: "Which investment is associated with owning physical property?",
      options: ["Gold", "Bonds", "Real Estate", "Mutual Funds"],
      answer: "Real Estate",
    },
    {
      question: "What is the term for the risk of losing purchasing power due to rising prices?",
      options: ["Inflation", "Volatility", "Diversification", "Depreciation"],
      answer: "Inflation",
    },
    {
      question: "What type of investment allows small, regular contributions over time?",
      options: ["SIP (Systematic Investment Plan)", "Lump Sum Investment", "Bonds", "Real Estate"],
      answer: "SIP (Systematic Investment Plan)",
    },
    {
      question: "Which of these investments is most associated with high volatility?",
      options: ["Bonds", "Gold", "Cryptocurrency", "Fixed Deposit"],
      answer: "Cryptocurrency",
    },
    {
      question: "Which type of investment allows you to pool money with other investors to purchase a variety of assets?",
      options: ["Mutual Funds", "Stocks", "Real Estate", "Bonds"],
      answer: "Mutual Funds",
    },
  ];



  // Shuffle options for each question
  const shuffledQuestions = questions.map(question => ({
    ...question,
    options: shuffleArray([...question.options]), // Shuffle options
  }));

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem('centrum_diwali_contest')) || [];
    const emailExists = existingUser.some(user => user.email === formData.email);
    setUserExists(emailExists);
  }, [formData.email]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));
  
  const handleSubmit = (selectedAnswers) => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);

    // Store data in local storage
    const existingData = JSON.parse(localStorage.getItem('centrum_diwali_contest')) || [];
    existingData.push({ ...formData, score: correctAnswers });
    localStorage.setItem('centrum_diwali_contest', JSON.stringify(existingData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app-container"
    style={{
      backgroundImage: `url(${backgroundImage})`, // Use the imported logo as the background image
      backgroundSize: 'cover', // Ensure the background image covers the container
      backgroundPosition: 'center', // Center the background image
    }}
    >
      <div style={{ margin: "auto" }}>
        <img src={logo} alt='logo' className="logo" />
        <h1>Diwali Contest</h1>
        <p>This Diwali, answer a few questions and get a free investment product!</p>
      </div>
      <div className="right-content">
        {!submitted ? (
          step === 0 ? (
            <div className="form-container">
              <h2>Start Contest</h2>
              <form>
                <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
                <button type="button" onClick={handleNext} disabled={!formData.name || !formData.email || !formData.phone || userExists}>
                  Start
                </button>
                {userExists && <p style={{ color: 'red' }}>You have already participated in the contest!</p>}
              </form>
            </div>
          ) : (
            <Questionnaire
              step={step - 1}
              questions={shuffledQuestions} // Use shuffled questions here
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
            />
          )
        ) : (
          <Celebrate score={score} total={questions.length} />
        )}
      </div>
    </div>
  );
};

export default App;
