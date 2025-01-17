import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import QuizTest from './pages/QuizTest';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-register" element={<UserRegistration />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/quiz-test" element={<QuizTest />} />
            </Routes>
        </Router>
    );
}

export default App;
