import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
app.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validate all required fields
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 100) {
        return res.status(400).json({ message: 'Name must be between 2 and 100 characters.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Validate phone format
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Please enter a valid phone number.' });
    }

    // Validate password length
    if (password.length < 6 || password.length > 128) {
        return res.status(400).json({ message: 'Password must be between 6 and 128 characters.' });
    }

    try {
        const users = readUsers();
        const normalizedEmail = email.trim().toLowerCase();

        // Check if the email already exists
        if (users.find((user) => user.email.toLowerCase() === normalizedEmail)) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user with hashed password
        users.push({
            name: name.trim(),
            email: normalizedEmail,
            phone: phone.trim(),
            password: hashedPassword,
            history: [],
            createdAt: new Date().toISOString()
        });
        writeUsers(users);
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Failed to register user. Please try again.' });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const users = readUsers();
        const normalizedEmail = email.trim().toLowerCase();
        const user = users.find((user) => user.email.toLowerCase() === normalizedEmail);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare password with hashed password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token with more user data
        const token = jwt.sign(
            {
                email: user.email,
                name: user.name,
                phone: user.phone
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful.',
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone
            },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login. Please try again.' });
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

    if (!email || !question || selectedAnswer === undefined) {
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
    console.log(`Server running at http://localhost:${PORT}`);
});
