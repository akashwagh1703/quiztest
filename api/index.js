import fs from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import os from 'os';

// Use a more reliable path resolution
const USERS_FILE = path.join(process.cwd(), 'public', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || '123456789';

// Helper functions to read/write `users.json`
const readUsers = async () => {
    try {
        // Ensure the directory exists
        await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });

        try {
            const data = await fs.readFile(USERS_FILE, 'utf8');
            return JSON.parse(data || '[]');
        } catch (readError) {
            // If file doesn't exist, return empty array and create file
            if (readError.code === 'ENOENT') {
                await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
                return [];
            }
            throw readError;
        }
    } catch (error) {
        console.error('Error reading/creating users file:', error);
        return [];
    }
};

// const writeUsers = async (users) => {
//     try {
//         // Ensure the directory exists
//         await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });

//         await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
//     } catch (error) {
//         console.error('Error writing users file:', error);
//         throw error;
//     }
// };

const writeUsers = async (users) => {
    try {
        // Use system's temp directory
        const tempDir = os.tmpdir();
        const tempFile = path.join(tempDir, 'users.json');

        await fs.writeFile(tempFile, JSON.stringify(users, null, 2), 'utf8');
        console.log('File written to temp directory:', tempFile);
    } catch (error) {
        console.error('Error writing file:', error);
    }
};

export default async function handler(req, res) {
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

    // Ensure body is parsed for POST requests
    if (req.method === 'POST') {
        // Body might not be parsed in Vercel serverless functions
        try {
            if (typeof req.body === 'string') {
                req.body = JSON.parse(req.body);
            }
        } catch (error) {
            console.error('Error parsing body:', error);
        }
    }

    // Route handling
    try {
        switch (req.method) {
            case 'POST':
                if (req.url === '/api/register') return await registerUser(req, res);
                if (req.url === '/api/login') return await loginUser(req, res);
                if (req.url === '/api/save-result') return await saveResult(req, res);
                if (req.url === '/api/save-answer') return await saveAnswer(req, res);
                break;
            case 'GET':
                if (req.url.startsWith('/api/user-results')) return await getUserResults(req, res);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Unhandled error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Register User
async function registerUser(req, res) {
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
        const users = await readUsers();
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
        await writeUsers(users);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Failed to register user. Please try again.' });
    }
}

// Login User
async function loginUser(req, res) {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Read users and normalize email
        const users = await readUsers();
        const normalizedEmail = email.trim().toLowerCase();

        // Find user by normalized email
        const user = users.find((user) => user.email.toLowerCase() === normalizedEmail);

        // Validate user credentials
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
            { expiresIn: '24h' } // Extended to 24 hours for better UX
        );

        // Respond with user info and token
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
}

// Save Result
async function saveResult(req, res) {
    const { email, score, outof, category } = req.body;
    const date = new Date().toISOString();

    // Validate input
    if (!email || score === undefined || outof === undefined || !category) {
        return res.status(400).json({ message: 'Email, score, and category are required.' });
    }

    try {
        const users = await readUsers();
        const user = users.find((u) => u.email === email);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Ensure history exists
        user.history = user.history || [];

        // Add new result to history
        user.history.push({
            date,
            score,
            outof,
            category
        });

        // Save updated users
        await writeUsers(users);

        // Respond with success message
        res.status(200).json({
            message: 'Result saved successfully.',
            result: { date, score, outof, category }
        });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ message: 'Failed to save result.' });
    }
}

// Get User Results
async function getUserResults(req, res) {
    const { email } = req.query;

    // Validate input
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const users = await readUsers();
        const user = users.find((u) => u.email === email);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Return user results
        res.json({
            name: user.name,
            email: user.email,
            history: user.history || []
        });
    } catch (error) {
        console.error('Error fetching user results:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Save Answer
async function saveAnswer(req, res) {
    const { email, question, selectedAnswer, isCorrect } = req.body;

    // Validate input - Fixed logic error
    if (!email || !question || selectedAnswer === undefined) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const users = await readUsers();
        const user = users.find((u) => u.email === email);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Ensure history exists
        user.history = user.history || [];

        // Add new answer to history
        const answerEntry = {
            question,
            selectedAnswer,
            isCorrect,
            date: new Date().toISOString()
        };
        user.history.push(answerEntry);

        // Save updated users
        await writeUsers(users);

        // Respond with success message
        res.status(200).json({
            message: 'Answer saved successfully.',
            answer: answerEntry
        });
    } catch (error) {
        console.error('Error saving answer:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}