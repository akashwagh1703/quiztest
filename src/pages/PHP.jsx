import { useState } from 'react';
import QuizTest from './QuizTest';
import Header from '../component/Header';
import Footer from '../component/Footer';
import "./QuizTest.css";

const PHP = () => {
    const [quizStarted, setQuizStarted] = useState(false);

    const startQuiz = () => {
        setQuizStarted(true);
    };

    return (
        <>
            {/* Conditional rendering of Header */}
            {!quizStarted && <Header />}
            <div className="main-content">

                {!quizStarted ? (
                    <div className="start-quiz-popup">
                        <button
                            onClick={startQuiz}
                            className="btn btn-primary btn-lg shadow-lg rounded-pill hover:opacity-80"
                        >
                            Start PHP Quiz
                        </button>
                    </div>
                ) : (
                    <div className="quiz-container">
                        <QuizTest fetchFrom='phpQuizData.json' technology='PHP' exam_time={1000} />
                    </div>
                )}
            </div>
            {/* Conditional rendering of Footer */}
            {/* {!quizStarted && <Footer />} */}
        </>
    );
};

export default PHP;