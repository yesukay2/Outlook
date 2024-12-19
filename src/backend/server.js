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
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
));

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://promotionaloutlook.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

// app.use((req, res, next) => {
//     if (req.method === 'OPTIONS') {
//         res.setHeader('Access-Control-Allow-Origin', 'https://promotionaloutlook.netlify.app');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });



// Connect to MongoDB
connect(process.env.VITE_MONGODB_URI,{socketTimeoutMS : 50000, connectTimeoutMS : 50000, maxPoolSize : 10}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Schema and Model
const userSchema = new Schema({
    username: String,
    password: String,
});

const User = model('User', userSchema);

// debugging
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});


// test route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

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

// Fallback route for undefined endpoints
app.use((req, res) => {
    res.status(404).send("Route not found");
  });
  

// Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


export default app;