import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { APIURL } from '../config/Constant';

const QuizDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userData')) || null;
    const [quizData, setQuizData] = useState({
        totalQuizzes: 0,
        passQuizzes: 0,
        failQuizzes: 0,
        avgScore: 0,
        recentActivity: [],
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

                    // Calculate pass and fail quizzes based on a passing threshold (e.g., 5/10)
                    const passThreshold = 5;
                    const passQuizzes = history.filter(result => result.score >= passThreshold).length;
                    const failQuizzes = history.length - passQuizzes;

                    // Calculate average score for completed quizzes
                    const totalScore = history.reduce((sum, result) => sum + result.score, 0);
                    const avgScore = history.length > 0 ? totalScore / history.length : 0;

                    // Get recent activity (last 5 quizzes)
                    const recentActivity = history.slice(-5).reverse();

                    setQuizData({
                        totalQuizzes: history.length,
                        passQuizzes,
                        failQuizzes,
                        avgScore: avgScore.toFixed(1),
                        recentActivity,
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

    const quizCategories = [
        {
            name: 'React JS',
            path: '/react-js',
            icon: 'bi-filetype-jsx',
            gradient: 'linear-gradient(135deg, #61dafb 0%, #21a1c4 100%)',
            description: '50+ Questions',
        },
        {
            name: 'PHP',
            path: '/php',
            icon: 'bi-filetype-php',
            gradient: 'linear-gradient(135deg, #777bb3 0%, #4f5b93 100%)',
            description: '40+ Questions',
        },
        {
            name: 'Full Stack',
            path: '/full-stack-developer',
            icon: 'bi-stack',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            description: '60+ Questions',
        },
        {
            name: 'AI Bots',
            path: '/ai-bots',
            icon: 'bi-robot',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            description: '30+ Questions',
        },
    ];

    if (loading) {
        return (
            <>
                <Header />
                <div className="loading-container">
                    <div className="spinner-large"></div>
                    <p>Loading your dashboard...</p>
                </div>
                <Footer />
                <style jsx>{`
                    .loading-container {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                    }
                    .spinner-large {
                        width: 50px;
                        height: 50px;
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #667eea;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="error-container">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <h3>Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-btn">
                        <i className="bi bi-arrow-clockwise"></i> Try Again
                    </button>
                </div>
                <Footer />
                <style jsx>{`
                    .error-container {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        padding: 40px 20px;
                        text-align: center;
                    }
                    .error-container i {
                        font-size: 80px;
                        color: #dc3545;
                    }
                    .error-container h3 {
                        color: #333;
                        margin: 0;
                    }
                    .error-container p {
                        color: #666;
                        margin: 0;
                    }
                    .retry-btn {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        transition: transform 0.3s ease;
                    }
                    .retry-btn:hover {
                        transform: translateY(-2px);
                    }
                `}</style>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="dashboard-container">
                {/* Welcome Section */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
                        <p>Track your progress and continue your learning journey</p>
                    </div>
                    <div className="welcome-illustration">
                        <i className="bi bi-bar-chart-fill"></i>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card stat-total">
                        <div className="stat-icon">
                            <i className="bi bi-journal-text"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{quizData.totalQuizzes}</h3>
                            <p>Total Quizzes</p>
                        </div>
                    </div>

                    <div className="stat-card stat-pass">
                        <div className="stat-icon">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{quizData.passQuizzes}</h3>
                            <p>Passed</p>
                        </div>
                    </div>

                    <div className="stat-card stat-fail">
                        <div className="stat-icon">
                            <i className="bi bi-x-circle-fill"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{quizData.failQuizzes}</h3>
                            <p>Failed</p>
                        </div>
                    </div>

                    <div className="stat-card stat-avg">
                        <div className="stat-icon">
                            <i className="bi bi-trophy-fill"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{quizData.avgScore}</h3>
                            <p>Average Score</p>
                        </div>
                    </div>
                </div>

                {/* Quiz Categories Section */}
                <div className="section-header">
                    <h2>Start a New Quiz</h2>
                    <p>Choose a category to test your knowledge</p>
                </div>

                <div className="quiz-categories">
                    {quizCategories.map((category, index) => (
                        <div
                            key={index}
                            className="category-card"
                            onClick={() => navigate(category.path)}
                            style={{ background: category.gradient }}
                        >
                            <div className="category-icon">
                                <i className={`bi ${category.icon}`}></i>
                            </div>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <div className="category-arrow">
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Section */}
                {quizData.recentActivity.length > 0 && (
                    <>
                        <div className="section-header">
                            <h2>Recent Activity</h2>
                            <p>Your last {quizData.recentActivity.length} quiz attempts</p>
                        </div>

                        <div className="recent-activity">
                            {quizData.recentActivity.map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-icon" style={{
                                        background: activity.score >= 5
                                            ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                                            : 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)'
                                    }}>
                                        <i className={`bi bi-${activity.score >= 5 ? 'check-circle-fill' : 'x-circle-fill'}`}></i>
                                    </div>
                                    <div className="activity-content">
                                        <h4>{activity.category}</h4>
                                        <p className="activity-date">
                                            {activity.date ? new Date(activity.date).toLocaleDateString() : 'Recently'}
                                        </p>
                                    </div>
                                    <div className="activity-score">
                                        <span className={`score-badge ${activity.score >= 5 ? 'pass' : 'fail'}`}>
                                            {activity.score}/10
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Empty State */}
                {quizData.totalQuizzes === 0 && (
                    <div className="empty-state">
                        <i className="bi bi-clipboard-data"></i>
                        <h3>No Quiz History Yet</h3>
                        <p>Start your first quiz to see your progress here!</p>
                        <button onClick={() => navigate('/react-js')} className="start-quiz-btn">
                            <i className="bi bi-play-circle"></i>
                            Start Your First Quiz
                        </button>
                    </div>
                )}
            </div>
            <Footer />

            <style jsx>{`
                .dashboard-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px 80px;
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

                /* Welcome Section */
                .welcome-section {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 20px;
                    padding: 40px;
                    margin-bottom: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
                }

                .welcome-content h1 {
                    font-size: 36px;
                    font-weight: 800;
                    margin: 0 0 10px 0;
                }

                .welcome-content p {
                    font-size: 18px;
                    margin: 0;
                    opacity: 0.9;
                }

                .welcome-illustration i {
                    font-size: 100px;
                    opacity: 0.2;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 50px;
                }

                .stat-card {
                    background: white;
                    border-radius: 15px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
                }

                .stat-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    color: white;
                }

                .stat-total .stat-icon {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .stat-pass .stat-icon {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                }

                .stat-fail .stat-icon {
                    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
                }

                .stat-avg .stat-icon {
                    background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
                }

                .stat-content h3 {
                    font-size: 36px;
                    font-weight: 800;
                    margin: 0;
                    color: #333;
                }

                .stat-content p {
                    font-size: 14px;
                    color: #666;
                    margin: 5px 0 0 0;
                    font-weight: 500;
                }

                /* Section Header */
                .section-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .section-header h2 {
                    font-size: 32px;
                    font-weight: 800;
                    color: #333;
                    margin: 0 0 10px 0;
                }

                .section-header p {
                    font-size: 16px;
                    color: #666;
                    margin: 0;
                }

                /* Quiz Categories */
                .quiz-categories {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 25px;
                    margin-bottom: 60px;
                }

                .category-card {
                    border-radius: 20px;
                    padding: 40px 30px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                }

                .category-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 200%;
                    height: 200%;
                    background: rgba(255, 255, 255, 0.1);
                    transform: rotate(45deg);
                    transition: all 0.5s ease;
                }

                .category-card:hover::before {
                    top: -100%;
                    right: -100%;
                }

                .category-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
                }

                .category-icon {
                    font-size: 48px;
                    margin-bottom: 20px;
                    opacity: 0.9;
                }

                .category-card h3 {
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0 0 10px 0;
                }

                .category-card p {
                    font-size: 14px;
                    margin: 0;
                    opacity: 0.9;
                }

                .category-arrow {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    font-size: 24px;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }

                .category-card:hover .category-arrow {
                    transform: translateX(5px);
                    opacity: 1;
                }

                /* Recent Activity */
                .recent-activity {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .activity-item {
                    background: white;
                    border-radius: 15px;
                    padding: 25px 30px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                }

                .activity-item:hover {
                    transform: translateX(5px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
                }

                .activity-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    color: white;
                    flex-shrink: 0;
                }

                .activity-content {
                    flex: 1;
                }

                .activity-content h4 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #333;
                    margin: 0 0 5px 0;
                }

                .activity-date {
                    font-size: 14px;
                    color: #666;
                    margin: 0;
                }

                .activity-score {
                    flex-shrink: 0;
                }

                .score-badge {
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: 700;
                    color: white;
                }

                .score-badge.pass {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                }

                .score-badge.fail {
                    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 80px 20px;
                }

                .empty-state i {
                    font-size: 100px;
                    color: #e0e0e0;
                    margin-bottom: 20px;
                }

                .empty-state h3 {
                    font-size: 28px;
                    font-weight: 700;
                    color: #333;
                    margin: 0 0 10px 0;
                }

                .empty-state p {
                    font-size: 16px;
                    color: #666;
                    margin: 0 0 30px 0;
                }

                .start-quiz-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 16px 40px;
                    border-radius: 12px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
                }

                .start-quiz-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .dashboard-container {
                        padding: 20px 15px 60px;
                    }

                    .welcome-section {
                        padding: 30px 25px;
                        flex-direction: column;
                        text-align: center;
                    }

                    .welcome-content h1 {
                        font-size: 28px;
                    }

                    .welcome-content p {
                        font-size: 16px;
                    }

                    .welcome-illustration {
                        margin-top: 20px;
                    }

                    .welcome-illustration i {
                        font-size: 60px;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                        gap: 15px;
                    }

                    .stat-card {
                        padding: 20px;
                    }

                    .stat-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 28px;
                    }

                    .stat-content h3 {
                        font-size: 28px;
                    }

                    .section-header h2 {
                        font-size: 24px;
                    }

                    .quiz-categories {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .category-card {
                        padding: 30px 25px;
                    }

                    .activity-item {
                        padding: 20px;
                        gap: 15px;
                    }

                    .activity-icon {
                        width: 50px;
                        height: 50px;
                        font-size: 24px;
                    }

                    .activity-content h4 {
                        font-size: 16px;
                    }

                    .score-badge {
                        padding: 8px 16px;
                        font-size: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .welcome-content h1 {
                        font-size: 24px;
                    }

                    .section-header h2 {
                        font-size: 20px;
                    }

                    .category-card h3 {
                        font-size: 20px;
                    }
                }
            `}</style>
        </>
    );
};

export default QuizDashboard;
