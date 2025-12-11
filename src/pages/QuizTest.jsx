import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SaveResult from '../component/SaveResult';

const QuizTest = ({ fetchFrom, technology, exam_time = 900 }) => {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [examTimer, setExamTimer] = useState(exam_time);
    const navigate = useNavigate();

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
            setShowScore(true);
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
                setShowScore(true);
            }
        }
    };

    const handleSkipClick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex < quizData[currentCategoryIndex].questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            const nextCategoryIndex = currentCategoryIndex + 1;

            if (nextCategoryIndex < quizData.length) {
                setCurrentCategoryIndex(nextCategoryIndex);
                setCurrentQuestionIndex(0);
            } else {
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
        return (
            <div className="quiz-loading">
                <div className="spinner-large"></div>
                <p>Loading quiz questions...</p>
                <style jsx>{`
                    .quiz-loading {
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
                    }
                    .spinner-large {
                        width: 60px;
                        height: 60px;
                        border: 5px solid #f3f3f3;
                        border-top: 5px solid #667eea;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .quiz-loading p {
                        font-size: 18px;
                        color: #666;
                        font-weight: 600;
                    }
                `}</style>
            </div>
        );
    }

    const currentCategory = quizData[currentCategoryIndex];
    const currentQuestion = currentCategory?.questions[currentQuestionIndex];
    const questionKey = `${currentCategoryIndex}-${currentQuestionIndex}`;
    const totalQuestions = quizData.reduce((sum, category) => sum + category.questions.length, 0);
    const currentQuestionNumber = quizData.slice(0, currentCategoryIndex).reduce((sum, cat) => sum + cat.questions.length, 0) + currentQuestionIndex + 1;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const getTimeColor = () => {
        if (examTimer > 300) return '#28a745'; // Green
        if (examTimer > 120) return '#ffc107'; // Yellow
        return '#dc3545'; // Red
    };

    const percentage = ((currentQuestionNumber - 1) / totalQuestions) * 100;

    return (
        <div className="quiz-container">
            {!showScore ? (
                <>
                    {/* Quiz Header */}
                    <div className="quiz-header">
                        <div className="quiz-info">
                            <h2 className="category-title">
                                <i className="bi bi-bookmark-fill"></i>
                                {currentCategory?.category}
                            </h2>
                            <div className="question-counter">
                                Question {currentQuestionNumber} of {totalQuestions}
                            </div>
                        </div>
                        <div className="timer" style={{ borderColor: getTimeColor() }}>
                            <i className="bi bi-clock-fill" style={{ color: getTimeColor() }}></i>
                            <span style={{ color: getTimeColor() }}>{formatTime(examTimer)}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                    </div>

                    {/* Question Card */}
                    <div className="question-card">
                        <div className="question-number">Question {currentQuestionIndex + 1}</div>
                        <h3 className="question-text">{currentQuestion?.questions}</h3>
                    </div>

                    {/* Options */}
                    <div className="options-container">
                        {currentQuestion?.options?.map((option, index) => {
                            const isSelected = selectedOptions[questionKey] === option;
                            const isCorrectAnswer = option === currentQuestion.answer;
                            const isWrongSelection = isSelected && !isCorrectAnswer;
                            const showAnswer = selectedOptions[questionKey];

                            return (
                                <button
                                    key={index}
                                    className={`option-btn ${isSelected ? 'selected' : ''} ${showAnswer && isCorrectAnswer ? 'correct' : ''} ${isWrongSelection ? 'wrong' : ''}`}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={!!selectedOptions[questionKey]}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                    <span className="option-text">{option}</span>
                                    {showAnswer && isCorrectAnswer && (
                                        <i className="bi bi-check-circle-fill option-icon"></i>
                                    )}
                                    {isWrongSelection && (
                                        <i className="bi bi-x-circle-fill option-icon"></i>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        <button
                            className="nav-btn secondary"
                            onClick={handleBackClick}
                            disabled={currentQuestionIndex === 0}
                        >
                            <i className="bi bi-arrow-left"></i>
                            Back
                        </button>

                        <button
                            className="nav-btn skip"
                            onClick={handleSkipClick}
                        >
                            Skip
                            <i className="bi bi-arrow-right"></i>
                        </button>

                        <button
                            className="nav-btn primary"
                            onClick={handleNextClick}
                            disabled={!selectedOptions[questionKey]}
                        >
                            {currentCategoryIndex === quizData.length - 1 && currentQuestionIndex === currentCategory.questions.length - 1 ? (
                                <>Finish <i className="bi bi-check-lg"></i></>
                            ) : (
                                <>Next <i className="bi bi-arrow-right"></i></>
                            )}
                        </button>
                    </div>
                </>
            ) : (
                /* Results Screen */
                <div className="results-container">
                    <div className="results-card">
                        <div className={`results-icon ${score >= totalQuestions / 2 ? 'pass' : 'fail'}`}>
                            <i className={`bi bi-${score >= totalQuestions / 2 ? 'trophy-fill' : 'emoji-frown-fill'}`}></i>
                        </div>
                        <h2 className="results-title">
                            {score >= totalQuestions / 2 ? 'Congratulations!' : 'Quiz Complete'}
                        </h2>
                        <p className="results-message">
                            {score >= totalQuestions / 2
                                ? 'Great job! You passed the quiz!'
                                : 'Keep practicing to improve your score!'}
                        </p>

                        <div className="score-display">
                            <div className="score-circle">
                                <svg className="score-ring" width="200" height="200">
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="90"
                                        fill="none"
                                        stroke="#e0e0e0"
                                        strokeWidth="12"
                                    />
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="90"
                                        fill="none"
                                        stroke={score >= totalQuestions / 2 ? '#28a745' : '#dc3545'}
                                        strokeWidth="12"
                                        strokeDasharray={`${(score / totalQuestions) * 565} 565`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 100 100)"
                                    />
                                </svg>
                                <div className="score-text">
                                    <span className="score-value">{score}</span>
                                    <span className="score-total">/ {totalQuestions}</span>
                                </div>
                            </div>
                            <div className="score-percentage">
                                {Math.round((score / totalQuestions) * 100)}%
                            </div>
                        </div>

                        <div className="results-stats">
                            <div className="stat-item">
                                <i className="bi bi-check-circle-fill"></i>
                                <span className="stat-value">{score}</span>
                                <span className="stat-label">Correct</span>
                            </div>
                            <div className="stat-item">
                                <i className="bi bi-x-circle-fill"></i>
                                <span className="stat-value">{totalQuestions - score}</span>
                                <span className="stat-label">Incorrect</span>
                            </div>
                            <div className="stat-item">
                                <i className="bi bi-journal-text"></i>
                                <span className="stat-value">{totalQuestions}</span>
                                <span className="stat-label">Total</span>
                            </div>
                        </div>

                        <SaveResult
                            email={user.email}
                            score={score}
                            outof={totalQuestions}
                            category={technology || 'Unknown'}
                        />

                        <div className="results-actions">
                            <button
                                className="action-btn primary"
                                onClick={() => {
                                    setScore(0);
                                    setCurrentCategoryIndex(0);
                                    setCurrentQuestionIndex(0);
                                    setSelectedOptions({});
                                    setShowScore(false);
                                    setExamTimer(exam_time);
                                }}
                            >
                                <i className="bi bi-arrow-clockwise"></i>
                                Retake Quiz
                            </button>
                            <button
                                className="action-btn secondary"
                                onClick={() => navigate('/quiz-dashbord')}
                            >
                                <i className="bi bi-house-fill"></i>
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .quiz-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
                    padding: 30px 20px;
                }

                /* Quiz Header */
                .quiz-header {
                    max-width: 900px;
                    margin: 0 auto 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: white;
                    padding: 25px 30px;
                    border-radius: 20px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                }

                .quiz-info {
                    flex: 1;
                }

                .category-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #333;
                    margin: 0 0 8px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .category-title i {
                    color: #667eea;
                }

                .question-counter {
                    font-size: 14px;
                    color: #666;
                    font-weight: 600;
                }

                .timer {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 20px;
                    border: 3px solid;
                    border-radius: 50px;
                    font-size: 24px;
                    font-weight: 800;
                    transition: all 0.3s ease;
                }

                .timer i {
                    font-size: 24px;
                }

                /* Progress Bar */
                .progress-container {
                    max-width: 900px;
                    margin: 0 auto 30px;
                    height: 8px;
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }

                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                    transition: width 0.3s ease;
                    border-radius: 10px;
                }

                /* Question Card */
                .question-card {
                    max-width: 900px;
                    margin: 0 auto 30px;
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                }

                .question-number {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 700;
                    margin-bottom: 20px;
                }

                .question-text {
                    font-size: 22px;
                    font-weight: 600;
                    color: #333;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Options */
                .options-container {
                    max-width: 900px;
                    margin: 0 auto 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .option-btn {
                    background: white;
                    border: 3px solid #e0e0e0;
                    padding: 20px 25px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 16px;
                    text-align: left;
                }

                .option-btn:hover:not(:disabled) {
                    border-color: #667eea;
                    transform: translateX(5px);
                    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2);
                }

                .option-btn:disabled {
                    cursor: not-allowed;
                }

                .option-btn.selected {
                    border-color: #667eea;
                    background: rgba(102, 126, 234, 0.05);
                }

                .option-btn.correct {
                    border-color: #28a745;
                    background: rgba(40, 167, 69, 0.1);
                }

                .option-btn.wrong {
                    border-color: #dc3545;
                    background: rgba(220, 53, 69, 0.1);
                }

                .option-letter {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 18px;
                    flex-shrink: 0;
                }

                .option-btn.correct .option-letter {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                }

                .option-btn.wrong .option-letter {
                    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
                }

                .option-text {
                    flex: 1;
                    color: #333;
                    font-weight: 500;
                }

                .option-icon {
                    font-size: 24px;
                    flex-shrink: 0;
                }

                .option-btn.correct .option-icon {
                    color: #28a745;
                }

                .option-btn.wrong .option-icon {
                    color: #dc3545;
                }

                /* Navigation Buttons */
                .navigation-buttons {
                    max-width: 900px;
                    margin: 0 auto;
                    display: flex;
                    gap: 15px;
                    justify-content: space-between;
                }

                .nav-btn {
                    padding: 16px 32px;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                }

                .nav-btn.primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .nav-btn.primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                }

                .nav-btn.primary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .nav-btn.secondary {
                    background: white;
                    color: #666;
                    border: 2px solid #e0e0e0;
                }

                .nav-btn.secondary:hover:not(:disabled) {
                    border-color: #667eea;
                    color: #667eea;
                }

                .nav-btn.secondary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .nav-btn.skip {
                    background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
                    color: white;
                }

                .nav-btn.skip:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(255, 193, 7, 0.4);
                }

                /* Results Screen */
                .results-container {
                    max-width: 700px;
                    margin: 0 auto;
                    animation: fadeInUp 0.8s ease;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .results-card {
                    background: white;
                    padding: 60px 40px;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .results-icon {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 60px;
                    color: white;
                }

                .results-icon.pass {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    animation: bounce 1s ease;
                }

                .results-icon.fail {
                    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
                }

                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .results-title {
                    font-size: 36px;
                    font-weight: 800;
                    color: #333;
                    margin: 0 0 15px 0;
                }

                .results-message {
                    font-size: 18px;
                    color: #666;
                    margin: 0 0 40px 0;
                }

                .score-display {
                    margin-bottom: 40px;
                }

                .score-circle {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    margin: 0 auto 20px;
                }

                .score-ring {
                    transform: rotate(0deg);
                    transition: all 1s ease;
                }

                .score-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .score-value {
                    font-size: 60px;
                    font-weight: 800;
                    color: #333;
                    line-height: 1;
                }

                .score-total {
                    font-size: 24px;
                    color: #999;
                    font-weight: 600;
                }

                .score-percentage {
                    font-size: 32px;
                    font-weight: 800;
                    color: #667eea;
                }

                .results-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 40px;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 15px;
                }

                .stat-item i {
                    font-size: 32px;
                }

                .stat-item:nth-child(1) i {
                    color: #28a745;
                }

                .stat-item:nth-child(2) i {
                    color: #dc3545;
                }

                .stat-item:nth-child(3) i {
                    color: #667eea;
                }

                .stat-value {
                    font-size: 28px;
                    font-weight: 800;
                    color: #333;
                }

                .stat-label {
                    font-size: 14px;
                    color: #666;
                    font-weight: 600;
                }

                .results-actions {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .action-btn {
                    padding: 16px 32px;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                }

                .action-btn.primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .action-btn.primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                }

                .action-btn.secondary {
                    background: white;
                    color: #666;
                    border: 2px solid #e0e0e0;
                }

                .action-btn.secondary:hover {
                    border-color: #667eea;
                    color: #667eea;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .quiz-container {
                        padding: 20px 15px;
                    }

                    .quiz-header {
                        flex-direction: column;
                        gap: 20px;
                        padding: 20px;
                    }

                    .category-title {
                        font-size: 20px;
                    }

                    .timer {
                        font-size: 20px;
                        padding: 10px 18px;
                    }

                    .question-card {
                        padding: 25px 20px;
                    }

                    .question-text {
                        font-size: 18px;
                    }

                    .option-btn {
                        padding: 15px 20px;
                        gap: 15px;
                    }

                    .option-letter {
                        width: 35px;
                        height: 35px;
                        font-size: 16px;
                    }

                    .navigation-buttons {
                        flex-direction: column;
                    }

                    .nav-btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .results-card {
                        padding: 40px 25px;
                    }

                    .results-title {
                        font-size: 28px;
                    }

                    .score-circle {
                        width: 150px;
                        height: 150px;
                    }

                    .score-ring {
                        width: 150px;
                        height: 150px;
                    }

                    .score-value {
                        font-size: 48px;
                    }

                    .results-stats {
                        grid-template-columns: 1fr;
                    }

                    .results-actions {
                        flex-direction: column;
                    }

                    .action-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default QuizTest;
