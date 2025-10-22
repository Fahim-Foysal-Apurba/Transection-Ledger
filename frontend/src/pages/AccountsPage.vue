<template>
  <q-page class="q-pa-md">

    <div class="row q-my-xl q-btn-gutter-md justify-center">
      <q-btn label="Create New Account  +" color="primary"  @click="openDialog = true"/>
    </div>

    <div v-if="successMessage" class="text-positive text-subtitle1 q-mb-md text-center bg-green-1 text-green-7 q-pa-sm q-rounded">
      {{ successMessage }}
    </div>


    <AccountsTable
      :rows="accountStore.accounts"
      :columns="columns"
    />

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


  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from 'src/stores/account-store'
import AccountsTable from 'src/components/AccountsTable.vue'


const accountStore = useAccountStore()

const openDialog = ref(false)


const newName = ref('')
const newBalance = ref(0)

const successMessage = ref('')

const columns = [
  { name: 'account_id', label: 'ID', field: 'account_id', align: 'center' },
  { name: 'name', label: 'Account Holder', field: 'name', align: 'center' },
  { name: 'balance', label: 'Balance', field: 'balance', align: 'center' },
  { name: 'created_at', label: 'Created At', field: 'created_at', align: 'center' },
]

async function createAccount() {
  if (!newName.value.trim()) return 
  if (isNaN(Number(newBalance.value)) || newBalance.value < 0) return

  const newAccount = await accountStore.createAccount({
    name: newName.value,
    balance: newBalance.value || 0
  })

  if (newAccount) {
    successMessage.value = `${newAccount.name}'s account successfully created.  The account number is ${newAccount.account_id}.`
  }

  await accountStore.fetchAccounts()

  newName.value = ''
  newBalance.value = 0
  openDialog.value = false
}

onMounted(() => {
  accountStore.fetchAccounts()
})
</script>





