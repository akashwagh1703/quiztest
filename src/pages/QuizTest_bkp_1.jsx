import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../component/Footer';
import Header from '../component/Header';
import CameraTracking from '../component/CameraTracking';

const QuizTest = () => {
    const [quizData, setQuizData] = useState([]); // Array of categories (e.g., React Basics, Node.js)
    const [loading, setLoading] = useState(true); // To track the loading state
    const [score, setScore] = useState(0); // User's score
    const [showScore, setShowScore] = useState(false); // Flag to show final score
    const [selectedOptions, setSelectedOptions] = useState({}); // Track selected options for all questions
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Index of current category
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of current question in the current category
    const navigate = useNavigate(); // Initialize navigate for redirection

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('userData')) || null;

    // Fetch quiz data once the component mounts and user data is available
    useEffect(() => {
        // Redirect to UserForm if user data is not found
        if (!user) {
            navigate('/user-login'); // Redirect to UserForm page
        } else {
            // Fetch quiz data if user data exists and if it has not been fetched before
            if (quizData.length === 0) {
                fetch('/reactJSQuizData.json')
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch quiz data');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setQuizData(Object.entries(data).map(([category, questions]) => ({ category, questions })));
                        setLoading(false); // Data has been successfully fetched, stop loading
                    })
                    .catch((error) => {
                        console.error('Error loading quiz data:', error);
                        setLoading(false); // Stop loading on error
                    });
            }
        }
    }, [user, navigate, quizData.length]); // Add quizData.length as a dependency to prevent continuous fetches

    const handleAnswerClick = (option) => {
        const questionKey = `${currentCategoryIndex}-${currentQuestionIndex}`;
        if (!selectedOptions[questionKey]) {
            setSelectedOptions((prev) => ({ ...prev, [questionKey]: option }));
            if (option === quizData[currentCategoryIndex].questions[currentQuestionIndex].answer) {
                setScore((prevScore) => prevScore + 1);
            }
        }
    };

    const handleNextClick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizData[currentCategoryIndex].questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            // Move to the next category if available
            const nextCategoryIndex = currentCategoryIndex + 1;
            if (nextCategoryIndex < quizData.length) {
                setCurrentCategoryIndex(nextCategoryIndex);
                setCurrentQuestionIndex(0); // Start from the first question in the next category
            } else {
                setShowScore(true); // All questions have been completed
            }
        }
    };

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading quiz...</div>; // Show loading message if still fetching
    }

    const currentCategory = quizData[currentCategoryIndex];
    const currentQuestion = currentCategory ? currentCategory.questions[currentQuestionIndex] : null;
    const questionKey = `${currentCategoryIndex}-${currentQuestionIndex}`;

    return (
        <>
            {/* Header Component */}
            <Header user={user} />
            <CameraTracking /> {/* Add the CameraTracking component */}
            <div className="container d-flex justify-content-center align-items-center py-5 min-vh-100">
                {/* Center the content */}
                <div className="card shadow-lg rounded-lg w-100 w-md-75 w-lg-50">
                    <div className="card-header text-center bg-info text-white">
                        {/* <h1 className="display-4">React Quiz Test</h1> */}
                        <h2 className="display-6">{currentCategoryIndex + 1}. {currentCategory?.category}</h2>
                        {/* <h4 className="text-muted">{currentCategoryIndex + 1}. {currentCategory?.category}</h4> */}
                    </div>
                    <div className="card-body">
                        <div className="progress mb-4">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: currentCategory && currentCategory.questions
                                        ? `${((currentQuestionIndex + 1) / currentCategory.questions.length) * 100}%`
                                        : "0%" // Default to 0% if the data is not yet available
                                }}
                                aria-valuenow={currentQuestionIndex + 1}
                                aria-valuemin="0"
                                aria-valuemax={currentCategory ? currentCategory.questions.length : 1} // To prevent division by 0 if data is missing
                            ></div>
                        </div>

                        {showScore ? (
                            <div className="text-center">
                                <h2 className="mb-4">Your Score: {score} / {quizData.reduce((sum, category) => sum + category.questions.length, 0)}</h2>
                                <p className="mb-4">
                                    {score >= quizData.reduce((sum, category) => sum + category.questions.length, 0) / 2 ? 'Great job!' : 'Better luck next time!'}
                                </p>
                                <button
                                    className="btn btn-success btn-lg mt-3"
                                    onClick={() => {
                                        setScore(0);
                                        setCurrentCategoryIndex(0);
                                        setCurrentQuestionIndex(0);
                                        setSelectedOptions({});
                                        setShowScore(false);
                                    }}
                                >
                                    Restart Quiz
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h3 className="card-title mb-4">
                                            {currentQuestion && currentQuestion.questions
                                                ? `Q${currentQuestionIndex + 1}: ${currentQuestion.questions}`
                                                : 'Loading Question...'}
                                        </h3>

                                        <ul className="list-group">
                                            {currentQuestion && currentQuestion.options && currentQuestion.options.length > 0 ? (
                                                currentQuestion.options.map((option, index) => (
                                                    <li
                                                        key={index}
                                                        className={`list-group-item ${selectedOptions[questionKey] === option
                                                            ? option === currentQuestion.answer
                                                                ? 'bg-success text-white'
                                                                : 'bg-danger text-white'
                                                            : 'bg-light'
                                                            } shadow-sm mb-2 rounded-lg`}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <button
                                                            className={`btn btn-link text-decoration-none w-100 text-start ${selectedOptions[questionKey] === option
                                                                ? ' text-white'
                                                                : ''
                                                                }`}
                                                            onClick={() => handleAnswerClick(option)}
                                                            disabled={!!selectedOptions[questionKey]}
                                                        >
                                                            {option}
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="list-group-item">Loading options...</li> // Fallback if options are not loaded
                                            )}

                                        </ul>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                    <button
                                        className="btn btn-secondary btn-lg"
                                        onClick={handleBackClick}
                                        disabled={currentQuestionIndex === 0}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleNextClick}
                                        disabled={!selectedOptions[questionKey]}
                                    >
                                        {currentCategoryIndex === quizData.length - 1 && currentQuestionIndex === currentCategory.questions.length - 1
                                            ? 'Finish'
                                            : 'Next'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer Component */}
            <Footer user={user} />
        </>
    );
};

export default QuizTest;
