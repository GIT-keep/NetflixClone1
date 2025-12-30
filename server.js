import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://netflix-clone1-r7p6.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Mock user database (replace with real database in production)
const users = [
  { username: 'user', password: 'password' },
  { username: 'test', password: 'test123' }
];

// Login endpoint
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        error_msg: 'Username and password are required' 
      });
    }

    // Find user (in production, use bcrypt for password hashing)
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ 
        error_msg: 'Invalid username or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ jwt_token: token });
  } catch (error) {
    res.status(500).json({ error_msg: 'Server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
