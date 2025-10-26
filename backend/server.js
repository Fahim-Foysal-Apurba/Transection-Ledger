import express from 'express';
import cors from 'cors';
import accountRoutes from './Apis.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', accountRoutes);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));