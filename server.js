import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS
const PORT = 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to save user data
app.post('/save-user', (req, res) => {
    const userData = req.body;
    const filePath = path.resolve('public', 'userData.json');

    // Check if the file exists
    fs.readFile(filePath, 'utf8', (err, data) => {
        let users = [];
        if (!err && data) {
            users = JSON.parse(data); // Parse existing data
        }

        // Add new user data
        users.push(userData);

        // Write updated data to file
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                return res.status(500).send('Failed to save user data.');
            }
            res.status(200).send('User data saved successfully.');
        });
    });
});

// Serve the public folder
app.use(express.static(path.resolve('public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
