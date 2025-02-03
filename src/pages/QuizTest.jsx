import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveResult from '../component/SaveResult';
// import CameraTracking from '../component/CameraTracking';


const QuizTest = ({ fetchFrom, technology, exam_time = 900 }) => {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [examTimer, setExamTimer] = useState(exam_time); // 10 minutes for the entire exam
    const navigate = useNavigate();

    // console.log('selectedOptions:::',selectedOptions)

    const user = JSON.parse(localStorage.getItem('userData')) || null;

    // Fetch quiz data
    useEffect(() => {
        if (!user) {
            navigate('/user-login');
        } else if (quizData.length === 0) {
            const fetchQuizData = async () => {
                try {
                    const response = await fetch(`/${fetchFrom}`);
                    if (!response.ok) throw new Error('Failed to fetch quiz data');
                    const data = await response.json();
                    const formattedData = Object.entries(data).map(([category, questions]) => ({ category, questions }));
                    setQuizData(formattedData);
                } catch (error) {
                    console.error('Error loading quiz data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchQuizData();
        }
    }, [user, navigate, fetchFrom, quizData.length]);

    // Exam timer logic
    useEffect(() => {
        if (!showScore && examTimer > 0) {
            const interval = setInterval(() => setExamTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else if (examTimer === 0) {
            setShowScore(true); // End the exam when the timer runs out
        }
    }, [examTimer, showScore]);

    const handleAnswerClick = (option) => {
        const questionKey = `${currentCategoryIndex}-${currentQuestionIndex}`;
        if (!selectedOptions[questionKey]) {
            setSelectedOptions((prev) => ({ ...prev, [questionKey]: option }));
            if (option === quizData[currentCategoryIndex].questions[currentQuestionIndex].answer) {
                setScore((prev) => prev + 1);
            }
        }

        // Trigger SaveQuestionAnswer when the user selects an answer
        const currentQuestion = quizData[currentCategoryIndex].questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;
        const email = user.email;
        <SaveQuestionAnswer
            email={email}
            question={currentQuestion.questions}
            selectedAnswer={option}
            correctAnswer={correctAnswer}
        />;
    };

    const handleNextClick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizData[currentCategoryIndex].questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            const nextCategoryIndex = currentCategoryIndex + 1;
            if (nextCategoryIndex < quizData.length) {
                setCurrentCategoryIndex(nextCategoryIndex);
                setCurrentQuestionIndex(0);
            } else {
                setShowScore(true); // All questions have been completed
            }
        }
    };

    const handleSkipClick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex < quizData[currentCategoryIndex].questions.length) {
            // Move to the next question within the same category
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            const nextCategoryIndex = currentCategoryIndex + 1;

            if (nextCategoryIndex < quizData.length) {
                // Move to the next category and reset question index
                setCurrentCategoryIndex(nextCategoryIndex);
                setCurrentQuestionIndex(0);
            } else {
                // If no more questions/categories, end the quiz
                setShowScore(true);
            }
        }
    };



    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading quiz...</div>;
    }

    const currentCategory = quizData[currentCategoryIndex];
    const currentQuestion = currentCategory?.questions[currentQuestionIndex];
    const questionKey = `${currentCategoryIndex}-${currentQuestionIndex}`;
    const totalQuestions = quizData.reduce((sum, category) => sum + category.questions.length, 0);

    // Format the exam timer into minutes and seconds
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <>
            {/* <CameraTracking /> */}
            <div className="container d-flex justify-content-center align-items-center py-5 min-vh-100">
                <div className="card shadow-lg rounded-lg w-100 w-md-75 w-lg-50">
                    <div className="card-header text-center bg-info text-white">
                        <h2 className="display-6">{currentCategoryIndex + 1}. {currentCategory?.category}</h2>
                        <h4 className="bg-success p-1">Time Remaining: {formatTime(examTimer)}</h4>
                    </div>
                    <div className="card-body">
                        <div className="progress mb-4">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: currentCategory ? `${((currentQuestionIndex + 1) / currentCategory.questions.length) * 100}%` : '0%'
                                }}
                                aria-valuenow={currentQuestionIndex + 1}
                                aria-valuemin="0"
                                aria-valuemax={currentCategory?.questions.length || 1}
                            />
                        </div>

                        {showScore ? (
                            <div className="text-center">
                                <h2 className="mb-4">Your Score: {score} / {totalQuestions}</h2>
                                <p className="mb-4">
                                    {score >= totalQuestions / 2 ? 'Great job!' : 'Better luck next time!'}
                                </p>
                                <SaveResult
                                    email={user.email}
                                    score={score}
                                    outof={totalQuestions}
                                    category={technology || 'Unknown'}
                                />
                                <button
                                    className="btn btn-success btn-lg mt-3"
                                    onClick={() => {
                                        setScore(0);
                                        setCurrentCategoryIndex(0);
                                        setCurrentQuestionIndex(0);
                                        setSelectedOptions({});
                                        setShowScore(false);
                                        setExamTimer(exam_time); // Reset the exam timer
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
                                            {currentQuestion ? `Q${currentQuestionIndex + 1}: ${currentQuestion.questions}` : 'Loading Question...'}
                                        </h3>
                                        <ul className="list-group">
                                            {currentQuestion?.options?.map((option, index) => {
                                                const isSelected = selectedOptions[questionKey] === option;
                                                const isCorrectAnswer = option === currentQuestion.answer;
                                                const isWrongSelection = isSelected && !isCorrectAnswer;

                                                return (
                                                    <li
                                                        key={index}
                                                        className={`list-group-item ${isSelected && isCorrectAnswer ? 'bg-success text-white' : ''} ${isWrongSelection ? 'bg-danger text-white' : ''} ${!isSelected && isCorrectAnswer && selectedOptions[questionKey] ? 'bg-success text-white' : ''} shadow-sm mb-2 rounded-lg`}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <button
                                                            className={`btn btn-link text-decoration-none w-100 text-start ${isSelected || (selectedOptions[questionKey] && isCorrectAnswer) ? 'text-white' : ''}`}
                                                            onClick={() => handleAnswerClick(option)}
                                                            disabled={!!selectedOptions[questionKey]}
                                                            aria-label={`Select option: ${option}`}
                                                        >
                                                            {option}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                    <button
                                        className="btn btn-secondary btn-lg"
                                        onClick={handleBackClick}
                                        disabled={currentQuestionIndex === 0}
                                        aria-label="Previous Question"
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-warning btn-lg"
                                        onClick={handleSkipClick}
                                        aria-label={currentQuestionIndex === 0}
                                    >
                                        Skip
                                    </button>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleNextClick}
                                        disabled={!selectedOptions[questionKey]}
                                        aria-label={currentCategoryIndex === quizData.length - 1 && currentQuestionIndex === currentCategory.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                    >
                                        {currentCategoryIndex === quizData.length - 1 && currentQuestionIndex === currentCategory.questions.length - 1 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizTest;