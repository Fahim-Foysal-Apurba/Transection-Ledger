import express from 'express';
import pool from './DB.js';

const router= express.Router();


// create account api
router.post('/createAccount', async (req, res) => {
  try {
    const { name, balance } = req.body; 

    const bal = balance ? Number(balance) : 0.00;

    const result = await pool.query(
      'INSERT INTO accounts (name, balance) VALUES ($1, $2) RETURNING *',
      [name, bal]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating account:', err);
  }
});


//get all accounts api
router.get('/accounts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accounts ORDER BY account_id DESC');  
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching accounts:', err);
    }       
});

//Cash in api
router.post('/cashin', async (req, res) => {
    try {
        const { account_id, amount, description } = req.body;
        
        await pool.query('BEGIN');
        const amt = amount ? Number(amount) : 0.00;

        await pool.query(
            'UPDATE accounts SET balance = balance + $1 WHERE account_id = $2',
            [amt, account_id]
        );

        const result= await pool.query(
            'INSERT INTO transactions (to_account, amount, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [account_id, amt, 'credit', description || 'Cash In']
        );
        await pool.query('COMMIT');
        res.json(result.rows[0]);

    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error during cash in:', err);
    }
});


// cash out api
router.post('/cashout', async (req, res) => {
    try {
        const { account_id, amount, description } = req.body;

        await pool.query('BEGIN');
        const amt = amount ? Number(amount) : 0.00;
       
        await pool.query("UPDATE accounts SET balance = balance - $1 WHERE account_id=$2", 
        [amt, account_id]);

        const txn = await pool.query(
         "INSERT INTO transactions (from_account, amount, type, description) VALUES ($1,$2,$3,$4) RETURNING *",
          [account_id, amt, 'debit', description || 'Cash Out']
        );

        await pool.query("COMMIT");
        res.json(txn.rows[0]);

        }catch (err) {
                 await pool.query("ROLLBACK");
         } 
});


// trabsfer amount api
router.post('/transfer', async (req, res) => {
    try {
        const { from_account, to_account, amount, description } = req.body;

        await pool.query('BEGIN');
        const amt = amount ? Number(amount) : 0.00;

        await pool.query("UPDATE accounts SET balance = balance - $1 WHERE account_id=$2", 
            [amt, from_account]);
        
            await pool.query("UPDATE accounts SET balance = balance + $1 WHERE account_id=$2", 
            [amt, to_account]);

        const txn = await pool.query(
          "INSERT INTO transactions (from_account, to_account, amount, type, description) VALUES ($1,$2,$3,$4,$5) RETURNING *",
          [from_account, to_account, amt, 'transfer', description || 'Transfer Amount']
        );

        await pool.query("COMMIT");
        res.json(txn.rows[0]);
            

        }catch (err) {
                 await pool.query("ROLLBACK");
         } 
});

//get all transactions api
router.get('/allTransactions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM transactions ORDER BY txn_id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching transactions:', err);
    } 
});  


export default router;
