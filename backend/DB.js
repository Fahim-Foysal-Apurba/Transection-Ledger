import pg from 'pg';

const { Pool } = pg;

const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mini_ledger',
    password: 'root',
    port: 5432,
});

pool.connect().then(() => {
    console.log('Connected to the database successfully.');
}).catch((err) => {
    console.error('Database connection error:', err.stack);
});

export default pool;