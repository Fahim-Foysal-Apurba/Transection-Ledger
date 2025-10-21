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

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating account:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get all accounts api

router.get('/accounts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accounts ORDER BY account_id DESC');  
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching accounts:', err);
        res.status(500).json({ error: 'Internal server error' });
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
        res.status(500).json({ error: 'Internal server error', error: err.message });
    }
});


// cash out api
router.post('/cashout', async (req, res) => {
    try {
        const { account_id, amount, description } = req.body;

        await pool.query('BEGIN');
        const amt = amount ? Number(amount) : 0.00;

        const acc = await pool.query("SELECT balance FROM accounts WHERE account_id=$1", [account_id]);

        if (acc.rows.length === 0) throw new Error("From account not found");

        if (parseFloat(acc.rows[0].balance) < amount) {
           throw new Error("Insufficient balance");
           } else{

                await pool.query("UPDATE accounts SET balance = balance - $1 WHERE account_id=$2", 
                    [amt, account_id]);

                const txn = await pool.query(
                  "INSERT INTO transactions (from_account, amount, type, description) VALUES ($1,$2,$3,$4) RETURNING *",
                  [account_id, amt, 'debit', description || 'Cash Out']
                );

                await pool.query("COMMIT");
                res.json(txn.rows[0]);
            }

        }catch (err) {
                 await pool.query("ROLLBACK");
                 res.status(400).json({ error: err.message })
         } 
});

router.get('/allTransactions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM transactions ORDER BY txn_id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
});  


export default router;
