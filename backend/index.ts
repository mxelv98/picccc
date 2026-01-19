import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './api/admin.js';
import userRoutes from './api/user.js';
import predictionRoutes from './api/predictions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/predictions', predictionRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
