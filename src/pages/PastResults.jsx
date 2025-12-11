import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { APIURL } from '../config/Constant';

const PastResults = ({ email }) => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, passed, failed

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`${APIURL}/user-results?email=${email}`);
                const data = await response.json();

                if (response.ok) {
                    const sortedResults = (data.user.history || []).sort((a, b) => new Date(b.date) - new Date(a.date));
                    setResults(sortedResults);
                } else {
                    setError(data.message || 'Failed to fetch results.');
                }
            } catch (err) {
                setError('An error occurred while fetching results.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [email]);

    const getFilteredResults = () => {
        if (filter === 'passed') {
            return results.filter(result => result.score >= 5);
        } else if (filter === 'failed') {
            return results.filter(result => result.score < 5);
        }
        return results;
    };

    const filteredResults = getFilteredResults();

    const stats = {
        total: results.length,
        passed: results.filter(r => r.score >= 5).length,
        failed: results.filter(r => r.score < 5).length,
        average: results.length > 0 ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(1) : 0
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="loading-container">
                    <div className="spinner-large"></div>
                    <p>Loading your results...</p>
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
            <div className="past-results-container">
                <div className="page-header">
                    <h1>Quiz History</h1>
                    <p>Track your progress and review past quiz attempts</p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card stat-total">
                        <div className="stat-icon">
                            <i className="bi bi-journal-text"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.total}</h3>
                            <p>Total Attempts</p>
                        </div>
                    </div>

                    <div className="stat-card stat-pass">
                        <div className="stat-icon">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.passed}</h3>
                            <p>Passed</p>
                        </div>
                    </div>

                    <div className="stat-card stat-fail">
                        <div className="stat-icon">
                            <i className="bi bi-x-circle-fill"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.failed}</h3>
                            <p>Failed</p>
                        </div>
                    </div>

                    <div className="stat-card stat-avg">
                        <div className="stat-icon">
                            <i className="bi bi-trophy-fill"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.average}</h3>
                            <p>Average Score</p>
                        </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                {results.length > 0 && (
                    <div className="filter-container">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            <i className="bi bi-list-ul"></i> All ({results.length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'passed' ? 'active' : ''}`}
                            onClick={() => setFilter('passed')}
                        >
                            <i className="bi bi-check-circle"></i> Passed ({stats.passed})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'failed' ? 'active' : ''}`}
                            onClick={() => setFilter('failed')}
                        >
                            <i className="bi bi-x-circle"></i> Failed ({stats.failed})
                        </button>
                    </div>
                )}

                {/* Results List */}
                {filteredResults.length > 0 ? (
                    <div className="results-grid">
                        {filteredResults.map((result, index) => (
                            <div key={index} className={`result-card ${result.score >= 5 ? 'passed' : 'failed'}`}>
                                <div className="result-header">
                                    <div className="result-icon">
                                        <i className={`bi bi-${result.score >= 5 ? 'check-circle-fill' : 'x-circle-fill'}`}></i>
                                    </div>
                                    <div className="result-title">
                                        <h3>{result.category}</h3>
                                        <p className="result-date">
                                            <i className="bi bi-calendar3"></i>
                                            {new Date(result.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="result-score">
                                    <div className="score-circle">
                                        <span className="score-value">{result.score}</span>
                                        <span className="score-total">/10</span>
                                    </div>
                                    <div className="score-percentage">
                                        {(result.score * 10)}%
                                    </div>
                                </div>
                                <div className="result-status">
                                    <span className={`status-badge ${result.score >= 5 ? 'pass' : 'fail'}`}>
                                        {result.score >= 5 ? 'Passed' : 'Failed'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <i className="bi bi-inbox"></i>
                        <h3>No {filter !== 'all' ? filter : ''} results found</h3>
                        <p>
                            {filter !== 'all'
                                ? `You haven't ${filter === 'passed' ? 'passed' : 'failed'} any quizzes yet.`
                                : 'Start taking quizzes to see your results here!'}
                        </p>
                        {results.length === 0 && (
                            <button onClick={() => navigate('/quiz-dashbord')} className="start-quiz-btn">
                                <i className="bi bi-play-circle"></i>
                                Start Your First Quiz
                            </button>
                        )}
                    </div>
                )}
            </div>
            <Footer />

            <style jsx>{`
                .past-results-container {
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

                .page-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .page-header h1 {
                    font-size: 36px;
                    font-weight: 800;
                    color: #333;
                    margin: 0 0 10px 0;
                }

                .page-header p {
                    font-size: 16px;
                    color: #666;
                    margin: 0;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
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

                /* Filter Buttons */
                .filter-container {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 30px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .filter-btn {
                    background: white;
                    border: 2px solid #e0e0e0;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-size: 15px;
                    font-weight: 600;
                    color: #666;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }

                .filter-btn:hover {
                    border-color: #667eea;
                    color: #667eea;
                    transform: translateY(-2px);
                }

                .filter-btn.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-color: transparent;
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                /* Results Grid */
                .results-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 25px;
                }

                .result-card {
                    background: white;
                    border-radius: 20px;
                    padding: 25px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                    border-left: 5px solid transparent;
                }

                .result-card.passed {
                    border-left-color: #28a745;
                }

                .result-card.failed {
                    border-left-color: #dc3545;
                }

                .result-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
                }

                .result-header {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .result-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    flex-shrink: 0;
                }

                .result-card.passed .result-icon {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    color: white;
                }

                .result-card.failed .result-icon {
                    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
                    color: white;
                }

                .result-title {
                    flex: 1;
                }

                .result-title h3 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #333;
                    margin: 0 0 8px 0;
                }

                .result-date {
                    font-size: 14px;
                    color: #666;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .result-date i {
                    font-size: 14px;
                }

                .result-score {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 15px;
                }

                .score-circle {
                    display: flex;
                    align-items: baseline;
                    gap: 4px;
                }

                .score-value {
                    font-size: 48px;
                    font-weight: 800;
                    color: #333;
                    line-height: 1;
                }

                .score-total {
                    font-size: 20px;
                    font-weight: 600;
                    color: #999;
                }

                .score-percentage {
                    font-size: 24px;
                    font-weight: 700;
                    color: #667eea;
                }

                .result-status {
                    display: flex;
                    justify-content: flex-end;
                }

                .status-badge {
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 700;
                    color: white;
                }

                .status-badge.pass {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                }

                .status-badge.fail {
                    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 80px 20px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                }

                .empty-state i {
                    font-size: 80px;
                    color: #e0e0e0;
                    margin-bottom: 20px;
                }

                .empty-state h3 {
                    font-size: 24px;
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
                    .past-results-container {
                        padding: 20px 15px 60px;
                    }

                    .page-header h1 {
                        font-size: 28px;
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

                    .results-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .filter-container {
                        gap: 10px;
                    }

                    .filter-btn {
                        padding: 10px 20px;
                        font-size: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .page-header h1 {
                        font-size: 24px;
                    }

                    .score-value {
                        font-size: 36px;
                    }

                    .score-percentage {
                        font-size: 20px;
                    }
                }
            `}</style>
        </>
    );
};

export default PastResults;
