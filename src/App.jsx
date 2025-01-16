import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import QuizTest from './pages/QuizTest';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserRegistration />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/quiz-test" element={<QuizTest />} />
            </Routes>
        </Router>
    );
}

export default App;
