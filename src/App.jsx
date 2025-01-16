// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch
import UserForm from './pages/UserForm';
import QuizTest from './pages/QuizTest';

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<UserForm />} /> {/* Use element instead of component */}
        <Route path="/quiz-test" element={<QuizTest />} /> {/* Use element instead of component */}
      </Routes>
    </Router>
  );
};

export default App;
