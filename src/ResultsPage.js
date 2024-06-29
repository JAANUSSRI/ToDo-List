// ResultsPage.js

import React, { useState, useEffect } from 'react';

const ResultsPage = ({goBack}) => {
    const [quizResults, setQuizResults] = useState([]);

    useEffect(() => {
        fetchQuizResults();
    }, []);

    const fetchQuizResults = () => {
        fetch('http://localhost:5000/quiz/results')
            .then(res => res.json())
            .then(data => {
                setQuizResults(data);
            })
            .catch(error => console.error('Error fetching quiz results:', error));
    };

    return (
        <center>
            <div className="table-container">
                <h2>Quiz Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizResults.map(result => (
                            <tr key={result._id}>
                                <td>{result.username}</td>
                                <td>{result.password}</td>
                                <td>{result.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={goBack} style={{ position: 'absolute', bottom: 10, left: 10 }}>Back</button>
            </div>
        </center>
        
    );
};

export default ResultsPage;
