import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import Home from './pages/Home';
import QuizDashboard from './component/QuizDashboard';
import ReactJS from './pages/ReactJS';
import PastResults from './pages/PastResults';
import PHP from './pages/PHP';
import FullStackDeveloper from './pages/FullStackDeveloper';

function App() {
    const user = JSON.parse(localStorage.getItem('userData')) || null;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-register" element={<UserRegistration />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/react-js" element={<ReactJS />} />
                <Route path="/php" element={<PHP />} />
                <Route path="/full-stack-developer" element={<FullStackDeveloper />} />
                <Route path="/quiz-dashbord" element={<QuizDashboard />} />
                <Route path="/past-results" element={user ? <PastResults email={user.email} /> : <div>Please log in to view your results.</div>}
                />
            </Routes>
        </Router>
    );
}

export default App;
