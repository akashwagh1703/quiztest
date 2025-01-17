import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // For token generation

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
    users.push({ name, email: normalizedEmail, phone, password });
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

        console.log('Normalized Email:', normalizedEmail);
        console.log('User Found:', user);

        if (!user) {
            console.log('No user found with email:', normalizedEmail);
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        console.log('Input Password:', password);
        console.log('Stored Password:', user.password);

        // Compare plaintext password directly
        if (password !== user.password) {
            console.log('Passwords do not match.');
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
