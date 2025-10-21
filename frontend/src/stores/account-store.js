import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [],
    loading: false,
    error: null
  }),

  actions: {
async createAccount(data) {
  // data = { name, balance }
  if (!data.name || !data.name.trim()) return null

  this.loading = true
  this.error = null
  try {
    // Send both name and balance to backend
    const res = await api.post('/createAccount', {
      name: data.name,
      balance: data.balance || 0
    })
    this.accounts.push(res.data) // add new account to local state
    return res.data                // return the created account
  } catch (err) {
    this.error = err.response?.data?.message || err.message
    console.error('Error creating account:', err)
    return null
  } finally {
    this.loading = false
  }
},
// account-store.js
async fetchAccounts() {
  this.loading = true
  this.error = null
  try {
    const res = await api.get('/accounts')  // GET request to backend
    this.accounts = res.data               // store all accounts in reactive state
  } catch (err) {
    this.error = err.response?.data?.message || err.message
    console.error('Error fetching accounts:', err)
  } finally {
    this.loading = false
  }
},


    // Utility: find account by ID
    getAccountById(id) {
      return this.accounts.find(acc => acc.account_id === id)
    }
  }
})



