import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

// Ensure the path works with Vercel's file system
const USERS_FILE = path.resolve(process.cwd(), 'public', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || '123456789';

// Helper functions to read/write `users.json`
const readUsers = () => {
    try {
        const filePath = USERS_FILE;
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data || '[]');
        }
        return [];
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing users file:', error);
    }
};

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Route handling
    switch (req.method) {
        case 'POST':
            if (req.url === '/api/register') return registerUser(req, res);
            if (req.url === '/api/login') return loginUser(req, res);
            if (req.url === '/api/save-result') return saveResult(req, res);
            if (req.url === '/api/save-answer') return saveAnswer(req, res);
            break;
        case 'GET':
            if (req.url.startsWith('/api/user-results')) return getUserResults(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Register User
function registerUser(req, res) {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if the email already exists
    if (users.find((user) => user.email.toLowerCase() === normalizedEmail)) {
        return res.status(400).json({ message: 'Email already registered.' });
    }

    // Save new user without hashing the password
    users.push({ name, email: normalizedEmail, phone, password, history: [] });
    writeUsers(users);
    res.status(201).json({ message: 'User registered successfully.' });
}

// Login User
function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const users = readUsers();
        const normalizedEmail = email.trim().toLowerCase();
        const user = users.find((user) => user.email.toLowerCase() === normalizedEmail);

        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Login successful.',
            user: { email: user.email, name: user.name },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Save Result
function saveResult(req, res) {
    const { email, score, outof, category } = req.body;
    const date = new Date().toISOString();

    if (!email || score === undefined || outof === undefined || !category) {
        return res.status(400).json({ message: 'Email, score, and category are required.' });
    }

    try {
        const users = readUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.history) {
            user.history = [];
        }

        user.history.push({ date, score, outof, category });
        writeUsers(users);

        res.json({ message: 'Result saved successfully.', user });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ message: 'Failed to save result.' });
    }
}

// Get User Results
function getUserResults(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const users = readUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error fetching user results:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Save Answer
function saveAnswer(req, res) {
    const { email, question, selectedAnswer, isCorrect } = req.body;

    if (!email || !question || !selectedAnswer) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const users = readUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.history) {
            user.history = [];
        }

        user.history.push({ question, selectedAnswer, isCorrect, date: new Date().toISOString() });
        writeUsers(users);

        res.json({ message: 'Answer saved successfully.', user });
    } catch (error) {
        console.error('Error saving answer:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}