import pg from 'pg';

const {Pool} = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mini_ledger',
    password: 'root',
    port: 5432,
});


pool.connect().then(()=>{
    console.log("Connected to PostgreSQL database");
})

export default pool;