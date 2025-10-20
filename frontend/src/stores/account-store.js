import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: [],
    nextId: 1
  }),

  actions: {
    createAccount(name) {
      this.accounts.push({
        id: this.nextId++,
        name,
        balance: 0
      });
    },

    cashIn(id, amount) {
      const acc = this.accounts.find(a => a.id === id);
      if (acc) acc.balance += amount;
    },

    cashOut(id, amount) {
      const acc = this.accounts.find(a => a.id === id);
      if (acc && acc.balance >= amount) acc.balance -= amount;
    }
  }
});
