import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [],
    error: null
  }),

  actions: {
     async createAccount(data) {

       try {
         const res = await api.post('/createAccount', {
           name: data.name,
           balance: data.balance || 0
         });

         const newAccount = res.data;
     
         this.accounts = [...this.accounts, newAccount];
         return newAccount;

       } catch (err) {

         console.error('Error creating account:', err);
     
         return null;
       } 
     },

     async fetchAccounts() {

       try {
         const res = await api.get('/accounts') 
         this.accounts = res.data 
                       
       } catch (err) {
         console.error('Error fetching accounts:', err)
       }
     },

  }
})



