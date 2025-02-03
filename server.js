import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // For token generation
import { BASEURL } from './src/config/Constant.js';

const app = express();
const PORT = 5000;
const USERS_FILE = path.resolve('public', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || '123456789'; // Use environment variable for production

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Helper functions to read/write `users.json`
const readUsers = () => {
    if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data || '[]');
    }
    return [];
};

const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
};

// Register User Endpoint
app.post('/register', (req, res) => {
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
});

// Login Endpoint
app.post('/login', (req, res) => {
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
});

// Save User Result Endpoint
app.post('/save-result', (req, res) => {
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
});

// Fetch User Results
app.get('/user-results', (req, res) => {
    const { email } = req.query; // Extract email from query params

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
});

// save answer
app.post('/save-answer', (req, res) => {
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
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at ${BASEURL}:${PORT}`);
});
