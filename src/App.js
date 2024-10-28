import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import Questionnaire from './components/Questionnaire';
import Celebrate from './components/Celebrate';
import './App.css';
import './components/Questionnaire.css';
import logo from "./Images/logo.png";
import backgroundImage from "./Images/backgroundImage.jpg";

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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', instagram: '' });
  const [userExists, setUserExists] = useState(false);
  const [hideLeftContent, setHideLeftContent] = useState(false);
  const [questions, setQuestions] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${API_URL}questions/`);
            if (response.data && response.data.data) {
                setQuestions(response.data.data); // Store the questions in state
            } else {
                console.error('No data found in the response');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    fetchQuestions(); // Call the fetch function
}, []); // Empty dependency array means this runs once when the component mounts



  // Shuffle options for each question
  const shuffledQuestions = questions.map(question => ({
    ...question,
    options: shuffleArray([...question.options]),
  }));

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const response = await axios.get(`${API_URL}users/check-email?email=${formData.email}`);
      
    
    
      console.log(response)
        setUserExists(response.data.exists); // Set userExists based on the API response
      } catch (error) {
        console.log("Error checking email:", error);
      }
    };

    if (formData.email) {
      checkEmail();
    }
  }, [formData.email]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
    if (step === 0) {
      setHideLeftContent(true); // Hide the left content when "Start" button is clicked
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (selectedAnswers) => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      instagram: formData.instagram,
      score: correctAnswers,
    };
    

    try {
      await axios.post(`${API_URL}users/adduser`, userData);
      console.log("User data submitted successfully");
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`app-container ${hideLeftContent ? 'center-right-content' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
      }}
    >
      {!hideLeftContent && (
        <div className="left-content">
          <img src={logo} alt='logo' className="logo" />
          <h1>Diwali Diya Contest</h1>
          <p>Celebrate Diwali with us by participating in our quiz and winning exciting rewards!</p>
        </div>
      )}
      <div className={`right-content ${hideLeftContent ? 'move-up' : ''}`}>
        {!submitted ? (
          step === 0 ? (
            <div className="form-container">
              <h2>Start Contest</h2>
              <form>
                <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
                <input type="text" name="instagram" placeholder="Instagram Handle" required value={formData.instagram} onChange={handleChange} />
                <button type="button" onClick={handleNext} disabled={!formData.name || !formData.email || !formData.phone || !formData.instagram || userExists}>
                  Start
                </button>
                {userExists && <p style={{ color: '#D90429' }}>You have already participated in the contest!</p>}
              </form>
            </div>
          ) : (
            <Questionnaire
              step={step - 1}
              questions={shuffledQuestions}
              onNext={handleNext}
              onPrev={handlePrev} // Pass the onPrev function here
              onSubmit={handleSubmit}
            />
          )
        ) : (
          <Celebrate score={score} name={formData.name} />
        )}
      </div>
    </div>
  );
};

export default App;
