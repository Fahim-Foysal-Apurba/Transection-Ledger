CREATE TABLE IF NOT EXISTS accounts (
    account_id SERIAL PRIMARY KEY,
    account_number VARCHAR(10) GENERATED ALWAYS AS (
        LPAD(account_id::text, 5, '0')
    ) STORED,
    name VARCHAR(100) NOT NULL,
    balance NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    txn_id SERIAL PRIMARY KEY,
    from_account INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    to_account INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('debit', 'credit', 'transfer')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
