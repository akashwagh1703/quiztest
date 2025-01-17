import React, { useState } from 'react';

const SaveResult = ({ email, score, outof, category }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false); // State to disable the button after saving

    const saveResult = async () => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://localhost:5000/save-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, // User's email
                    score, // User's score
                    outof,
                    category, // Quiz category
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Result saved successfully!');
                setDisabled(true); // Disable the button after successful save
            } else {
                setError(data.message || 'Failed to save result.');
            }
        } catch (err) {
            setError('An error occurred while saving the result.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="save-result-component">
            <button
                className="btn btn-primary"
                onClick={saveResult}
                disabled={loading || disabled} // Disable the button if loading or result already saved
            >
                {loading ? 'Saving...' : disabled ? 'Result Saved' : 'Save Result'}
            </button>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default SaveResult;
