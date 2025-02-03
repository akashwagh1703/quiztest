import React, { useState, useEffect } from 'react';
import './QuizDashboard.css'; // Custom styles for the dashboard
import Header from './Header';
import Footer from './Footer';
import { APIURL } from '../config/Constant';

const QuizDashboard = () => {
    const user = JSON.parse(localStorage.getItem('userData')) || null;
    const [quizData, setQuizData] = useState({
        totalQuizzes: 0,
        passQuizzes: 0,
        failQuizzes: 0,
        avgScore: 0, // Average score of completed quizzes
        lastQuiz: '', // Last quiz name and score
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${APIURL}/user-results?email=${user.email}`);
                const data = await response.json();

                if (response.ok) {
                    const history = data.user.history || [];

                    const totalQuizzes = 10; // Replace with dynamic value if needed

                    // Calculate pass and fail quizzes based on a passing threshold (e.g., 5/10)
                    const passThreshold = 5;
                    const passQuizzes = history.filter(result => result.score >= passThreshold).length;
                    const failQuizzes = history.length - passQuizzes;

                    // Calculate average score for completed quizzes
                    const totalScore = history.reduce((sum, result) => sum + result.score, 0);
                    const avgScore = history.length > 0 ? totalScore / history.length : 0;

                    // Get the last quiz data
                    const lastQuiz = history.length > 0 ? history[history.length - 1] : null;

                    setQuizData({
                        totalQuizzes,
                        passQuizzes,
                        failQuizzes,
                        avgScore: avgScore.toFixed(2), // Limit to two decimal places
                        lastQuiz: lastQuiz ? `${lastQuiz.category} - ${lastQuiz.score} points` : 'No quizzes taken yet',
                    });
                } else {
                    setError(data.message || 'Failed to fetch quiz data.');
                }
            } catch (err) {
                setError('An error occurred while fetching quiz data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user.email]);

    if (loading) {
        return <div className="text-center mt-5">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <>
            {/* Header Component */}
            <Header />
            <div className="dashboard-container">
                <h2 className="dashboard-title">Quiz Test Dashboard</h2>

                <div className="dashboard-summary">
                    <div className="summary-item summary-item-total">
                        <h3>Total Quizzes</h3>
                        <p>{quizData.totalQuizzes}</p>
                    </div>
                    <div className="summary-item summary-item-pass">
                        <h3>Passed Quizzes</h3>
                        <p>{quizData.passQuizzes}</p>
                    </div>
                    <div className="summary-item summary-item-fail">
                        <h3>Failed Quizzes</h3>
                        <p>{quizData.failQuizzes}</p>
                    </div>
                    <div className="summary-item summary-item-avg">
                        <h3>Average Score</h3>
                        <p>{quizData.avgScore}</p>
                    </div>
                    <div className="summary-item summary-item-last">
                        <h3>Last Quiz</h3>
                        <p>{quizData.lastQuiz}</p>
                    </div>
                </div>
            </div>
            {/* Footer Component */}
            <Footer />
        </>
    );
};

export default QuizDashboard;
