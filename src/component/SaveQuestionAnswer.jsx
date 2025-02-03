import React, { useEffect } from 'react';

const SaveQuestionAnswer = ({ email, question, selectedAnswer, correctAnswer }) => {
    useEffect(() => {
        const saveAnswer = async () => {
            if (!email || !question || !selectedAnswer) return;

            const isCorrect = selectedAnswer === correctAnswer;
            const response = await fetch('/save-answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, question, selectedAnswer, isCorrect })
            });

            const data = await response.json();
            console.log('Save answer response:', data);
        };

        saveAnswer();
    }, [email, question, selectedAnswer, correctAnswer]);

    return null;
};

export default SaveQuestionAnswer;
