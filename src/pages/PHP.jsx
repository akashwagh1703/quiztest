import { useState } from 'react';
import QuizTest from './QuizTest';
import Header from '../component/Header';
import Footer from '../component/Footer';

const PHP = () => {
    const [quizStarted, setQuizStarted] = useState(false);

    const startQuiz = () => {
        setQuizStarted(true);
    };

    return (
        <>
            {!quizStarted && <Header />}

            {!quizStarted ? (
                <div className="quiz-intro-container">
                    <div className="quiz-intro-content">
                        <div className="quiz-icon">
                            <i className="bi bi-filetype-php"></i>
                        </div>
                        <h1 className="quiz-title">PHP Quiz</h1>
                        <p className="quiz-description">
                            Test your PHP knowledge covering syntax, functions, OOP, databases, and web development.
                        </p>

                        <div className="quiz-info-cards">
                            <div className="info-card">
                                <i className="bi bi-clock-fill"></i>
                                <span className="info-label">Duration</span>
                                <span className="info-value">10 minutes</span>
                            </div>
                            <div className="info-card">
                                <i className="bi bi-list-check"></i>
                                <span className="info-label">Questions</span>
                                <span className="info-value">40+</span>
                            </div>
                            <div className="info-card">
                                <i className="bi bi-trophy-fill"></i>
                                <span className="info-label">Pass Score</span>
                                <span className="info-value">50%</span>
                            </div>
                        </div>

                        <div className="quiz-topics">
                            <h3>Topics Covered:</h3>
                            <ul>
                                <li><i className="bi bi-check-circle-fill"></i> PHP Syntax & Variables</li>
                                <li><i className="bi bi-check-circle-fill"></i> Functions & Arrays</li>
                                <li><i className="bi bi-check-circle-fill"></i> Object-Oriented Programming</li>
                                <li><i className="bi bi-check-circle-fill"></i> Database Integration</li>
                                <li><i className="bi bi-check-circle-fill"></i> Form Handling</li>
                                <li><i className="bi bi-check-circle-fill"></i> Security Best Practices</li>
                            </ul>
                        </div>

                        <button onClick={startQuiz} className="start-quiz-btn">
                            <i className="bi bi-play-circle-fill"></i>
                            <span>Start Quiz</span>
                        </button>

                        <p className="quiz-note">
                            <i className="bi bi-info-circle"></i>
                            Make sure you have a stable internet connection before starting.
                        </p>
                    </div>

                    <style jsx>{`
                        .quiz-intro-container {
                            min-height: 100vh;
                            background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 40px 20px;
                        }

                        .quiz-intro-content {
                            max-width: 800px;
                            width: 100%;
                            background: white;
                            border-radius: 30px;
                            padding: 60px 50px;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                            text-align: center;
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

                        .quiz-icon {
                            width: 120px;
                            height: 120px;
                            margin: 0 auto 30px;
                            background: linear-gradient(135deg, #777bb3 0%, #4f5b93 100%);
                            border-radius: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 60px;
                            color: white;
                            box-shadow: 0 10px 30px rgba(119, 123, 179, 0.3);
                            animation: float 3s ease-in-out infinite;
                        }

                        @keyframes float {
                            0%, 100% {
                                transform: translateY(0);
                            }
                            50% {
                                transform: translateY(-10px);
                            }
                        }

                        .quiz-title {
                            font-size: 42px;
                            font-weight: 800;
                            color: #333;
                            margin: 0 0 20px 0;
                        }

                        .quiz-description {
                            font-size: 18px;
                            color: #666;
                            margin: 0 0 40px 0;
                            line-height: 1.6;
                        }

                        .quiz-info-cards {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                            gap: 20px;
                            margin-bottom: 40px;
                        }

                        .info-card {
                            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                            padding: 25px 20px;
                            border-radius: 20px;
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                            border: 2px solid transparent;
                            transition: all 0.3s ease;
                        }

                        .info-card:hover {
                            border-color: #777bb3;
                            transform: translateY(-5px);
                            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                        }

                        .info-card i {
                            font-size: 32px;
                            color: #777bb3;
                            margin-bottom: 5px;
                        }

                        .info-label {
                            font-size: 14px;
                            color: #666;
                            font-weight: 600;
                        }

                        .info-value {
                            font-size: 20px;
                            color: #333;
                            font-weight: 800;
                        }

                        .quiz-topics {
                            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                            padding: 30px;
                            border-radius: 20px;
                            margin-bottom: 40px;
                            text-align: left;
                        }

                        .quiz-topics h3 {
                            font-size: 20px;
                            font-weight: 700;
                            color: #333;
                            margin: 0 0 20px 0;
                            text-align: center;
                        }

                        .quiz-topics ul {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                            gap: 15px;
                        }

                        .quiz-topics li {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            font-size: 16px;
                            color: #555;
                            padding: 8px 0;
                        }

                        .quiz-topics li i {
                            font-size: 18px;
                            color: #28a745;
                            flex-shrink: 0;
                        }

                        .start-quiz-btn {
                            background: linear-gradient(135deg, #777bb3 0%, #4f5b93 100%);
                            color: white;
                            border: none;
                            padding: 20px 60px;
                            border-radius: 50px;
                            font-size: 20px;
                            font-weight: 700;
                            cursor: pointer;
                            display: inline-flex;
                            align-items: center;
                            gap: 15px;
                            transition: all 0.3s ease;
                            box-shadow: 0 10px 30px rgba(119, 123, 179, 0.3);
                            margin-bottom: 20px;
                        }

                        .start-quiz-btn:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 15px 40px rgba(119, 123, 179, 0.4);
                        }

                        .start-quiz-btn:active {
                            transform: translateY(-1px);
                        }

                        .start-quiz-btn i {
                            font-size: 28px;
                        }

                        .quiz-note {
                            font-size: 14px;
                            color: #666;
                            margin: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                        }

                        .quiz-note i {
                            color: #777bb3;
                            font-size: 16px;
                        }

                        @media (max-width: 768px) {
                            .quiz-intro-content {
                                padding: 40px 30px;
                            }

                            .quiz-icon {
                                width: 100px;
                                height: 100px;
                                font-size: 50px;
                            }

                            .quiz-title {
                                font-size: 32px;
                            }

                            .quiz-description {
                                font-size: 16px;
                            }

                            .quiz-info-cards {
                                grid-template-columns: 1fr;
                            }

                            .quiz-topics ul {
                                grid-template-columns: 1fr;
                            }

                            .start-quiz-btn {
                                padding: 16px 40px;
                                font-size: 18px;
                                width: 100%;
                                justify-content: center;
                            }
                        }

                        @media (max-width: 480px) {
                            .quiz-intro-content {
                                padding: 30px 20px;
                            }

                            .quiz-title {
                                font-size: 28px;
                            }
                        }
                    `}</style>
                </div>
            ) : (
                <QuizTest fetchFrom='phpQuizData.json' technology='PHP' exam_time={600} />
            )}

            {!quizStarted && <Footer />}
        </>
    );
};

export default PHP;
