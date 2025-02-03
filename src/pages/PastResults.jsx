import React, { useState, useEffect } from 'react';
import { APIURL } from '../config/Constant';
import Header from '../component/Header';
import Footer from '../component/Footer';
import "./PastResults.css";

const PastResults = ({ email }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user results from the backend
        const fetchResults = async () => {
            try {
                const response = await fetch(`${APIURL}user-results?email=${email}`);
                const data = await response.json();

                if (response.ok) {
                    // Sort results in descending order by date
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

    if (loading) {
        return <div className="text-center mt-5">Loading results...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <>
            <Header />
            <div className="container py-5">
                <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#2C3E50' }}>
                    Past Results
                </h2>
                {results.length > 0 ? (
                    <div className="table-responsive shadow-lg p-4 bg-white rounded">
                        <table className="table table-hover text-center align-middle">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'table-light' : ''}>
                                        <td style={{ fontSize: '1rem', color: '#555' }}>
                                            {new Date(result.date).toLocaleString()}
                                        </td>
                                        <td style={{ fontSize: '1rem', fontWeight: 'bold', color: '#34495E' }}>
                                            {result.category}
                                        </td>
                                        <td
                                            style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                color: result.score >= 8 ? '#27AE60' : '#E74C3C',
                                            }}
                                        >
                                            {result.score}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div
                        className="text-center p-5 shadow-lg rounded bg-light"
                        style={{
                            border: '2px dashed #AAB7B8',
                            color: '#2C3E50',
                            fontSize: '1.2rem',
                            fontStyle: 'italic',
                        }}
                    >
                        No results found.
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default PastResults;
