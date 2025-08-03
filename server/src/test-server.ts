import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/connection';
import { settings } from './db/schema';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/test-db', async (req, res) => {
  try {
    await db.select().from(settings).limit(1);
    res.json({ message: 'Database connection successful!' });
  } catch (error: any) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
