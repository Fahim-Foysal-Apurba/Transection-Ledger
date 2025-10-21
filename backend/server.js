import express from 'express';
import cors from 'cors';
import accountRoutes from './Apis.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', accountRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));