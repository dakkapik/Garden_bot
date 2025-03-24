const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'suggestions.txt');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit-suggestion', (req, res) => {
    const suggestion = req.body.suggestion;
    if (!suggestion) {
        return res.status(400).send('Suggestion cannot be empty.');
    }
    
    const entry = `\n${new Date().toISOString()}: ${suggestion}`;
    fs.appendFile(FILE_PATH, entry, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('Suggestion received!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
