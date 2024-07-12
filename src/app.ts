import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Rodando!'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;