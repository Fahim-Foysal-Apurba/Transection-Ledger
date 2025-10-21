<template>
  <q-page class="q-pa-md">

    <!-- Create Account Button -->
    <div class="row q-my-xl">
      <q-btn label="Create New Account" color="primary" @click="openDialog = true"/>
    </div>

    <!-- Accounts Table -->
    <AccountsTable
      :rows="accountStore.accounts"
      :columns="columns"
      @show-transactions="openTransactionHistory"
    />

    <!-- Create Account Dialog -->
    <q-dialog v-model="openDialog">
      <q-card style="min-width:600px">
        <q-card-section>
          <div class="text-h6">Create New Account</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newName" label="Account Holder Name" outlined dense />
          <q-input v-model.number="newBalance" label="Initial Balance" type="number" outlined dense class="q-mt-sm"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="primary" label="Create" @click="createAccount" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Transaction History Dialog -->
    <q-dialog v-model="transactionDialog">
      <q-card style="min-width:800px">
        <q-card-section>
          <div class="text-h6">Transaction History for Account #{{ selectedAccountId }}</div>
        </q-card-section>

        <q-card-section>
          <TransactionHistory :account-id="selectedAccountId" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" v-close-popup @click="transactionDialog = false"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from 'src/stores/account-store'
import AccountsTable from 'src/components/AccountsTable.vue'
//import TransactionHistory from 'src/components/TransactionHistory.vue'

const accountStore = useAccountStore()

// Dialogs
const openDialog = ref(false)
const transactionDialog = ref(false)
const selectedAccountId = ref(null)

// Form fields
const newName = ref('')
const newBalance = ref(0)

// Table columns
const columns = [
  { name: 'account_id', label: 'ID', field: 'account_id' },
  { name: 'name', label: 'Account Holder', field: 'name' },
  { name: 'balance', label: 'Balance', field: 'balance', align: 'right' },
  { name: 'created_at', label: 'Created At', field: 'created_at' },
  { name: 'actions', label: 'Transaction History', align: 'center' }
]

// Create new account
function createAccount() {
  if (!newName.value.trim()) return

  accountStore.createAccount({
    name: newName.value,
    balance: newBalance.value || 0
  })

  newName.value = ''
  newBalance.value = 0
  openDialog.value = false
}

// Open Transaction History dialog
function openTransactionHistory(accountId) {
  selectedAccountId.value = accountId
  transactionDialog.value = true
}

// Fetch accounts on page load
onMounted(() => {
  accountStore.fetchAccounts()
})
</script>




