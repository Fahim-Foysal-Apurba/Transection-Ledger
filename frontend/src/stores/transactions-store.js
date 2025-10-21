// src/stores/transactions-store.js
import { defineStore } from 'pinia'
import { api } from 'boot/axios'  // <- import from boot

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
  }),
  actions: {
    async fetchTransactions() {
      try {
        const res = await api.get('/allTransactions')
        this.transactions = res.data
      } catch (err) {
        console.error('Error fetching transactions', err)
      }
    },

    async cashIn(account_id, amount) {
      return await api.post('/cashin', { account_id, amount })
    },

    async cashOut(account_id, amount) {
      return await api.post('/cashout', { account_id, amount })
    },

    async transfer(from_account, to_account, amount) {
      try {
        const res = await api.post('/transfer', { from_account, to_account, amount })
        return { success: true, message: res.data.message }
      } catch (err) {
        return { success: false, message: err.response?.data?.error || err.message }
      }
    }
  }
})

