import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 5000;
const USERS_FILE = path.resolve('public', 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Helper function to read/write users.json
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
    const users = readUsers();

    // Check if the email already exists
    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    // Save new user
    users.push({ name, email, phone, password });
    writeUsers(users);
    res.status(201).json({ message: 'User registered successfully' });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
