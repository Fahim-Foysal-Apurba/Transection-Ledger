import { defineStore } from 'pinia'
import { api } from 'boot/axios' 

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: []
  }),

  actions: {

    async fetchTransactions() {
      try {
        const res = await api.get('/allTransactions')
        this.transactions = res.data

      } catch (err) {

        this.error = err.response?.data?.message || err.message
        console.error('Error fetching transactions', err)
      }
    },


    async cashIn(data) {

      try {
      const res = await api.post('/cashin', { 
        account_id: data.account_id, 
        amount: data.amount,
        description: data.description });

        const transaction = res.data;

        this.transactions = [...this.transactions, transaction];

        return transaction;
      } catch (err) {
        console.error('Error during cash in:', err);

        return null;
      }

    },

    async cashOut(data) {

      try {
      const res = await api.post('/cashout', { 
        account_id: data.account_id, 
        amount: data.amount,
        description: data.description });

        const transaction = res.data;
        this.transactions =[...this.transactions, transaction];

        return transaction;
      } catch (err) {
        console.error('Error during cash out:', err);
        return null;
      }
      
    },

    async transfer(data) {

      try {
      const res = await api.post('/transfer', { 
        from_account: data.from_account, 
        to_account: data.to_account,
        amount: data.amount,
        description: data.description });

        const transaction = res.data;
        
        this.transactions =[...this.transactions, transaction];

        return transaction;
      } catch (err) {
        console.error('Error during cash out:', err);
        return null;
      }
      
    }
  }
})

