import fs from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';

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

const writeUsers = async (users) => {
    try {
        // Ensure the directory exists
        await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });

        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing users file:', error);
        throw error;
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

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const users = await readUsers();
        const normalizedEmail = email.trim().toLowerCase();

        // Check if the email already exists
        if (users.find((user) => user.email.toLowerCase() === normalizedEmail)) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Save new user without hashing the password
        users.push({ name, email: normalizedEmail, phone, password, history: [] });
        await writeUsers(users);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Failed to register user.' });
    }
}

// Login User
async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const users = await readUsers();
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
async function saveResult(req, res) {
    const { email, score, outof, category } = req.body;
    const date = new Date().toISOString();

    if (!email || score === undefined || outof === undefined || !category) {
        return res.status(400).json({ message: 'Email, score, and category are required.' });
    }

    try {
        const users = await readUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.history) {
            user.history = [];
        }

        user.history.push({ date, score, outof, category });
        await writeUsers(users);

        res.json({ message: 'Result saved successfully.', user });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ message: 'Failed to save result.' });
    }
}

// Get User Results
async function getUserResults(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const users = await readUsers();
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
async function saveAnswer(req, res) {
    const { email, question, selectedAnswer, isCorrect } = req.body;

    if (!email || !question || !selectedAnswer) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const users = await readUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.history) {
            user.history = [];
        }

        user.history.push({ question, selectedAnswer, isCorrect, date: new Date().toISOString() });
        await writeUsers(users);

        res.json({ message: 'Answer saved successfully.', user });
    } catch (error) {
        console.error('Error saving answer:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}