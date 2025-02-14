const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);

const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));