import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('✅ Connected to the DB');
});

// handle unexpected errors (prevents crash)
pool.on('error', (err) => {
  console.error('❌ Unexpected DB error', err);
});

export default pool;