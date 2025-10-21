<template>
  <q-card flat class="q-pa-md">

    <q-card-section>
      <div class="text-h6">Transaction History</div>
    </q-card-section>

    <q-table
      :rows="transactions"
      :columns="columns"
      row-key="txn_id"
      flat
      bordered
      :rows-per-page-options="[10]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="txn_id" :props="props">{{ props.row.txn_id }}</q-td>
          <q-td key="created_at" class="bg-warning" :props="props">
                <div>{{ formatDate.date }}</div>
                <div class="text-caption text-grey-7">{{ formatDate.time }}</div>
          </q-td>
          <q-td key="transaction" class="bg-info text-white text-center" :props="props">{{ formatTransaction(props.row) }}</q-td>
          <q-td key="description" :props="props">{{ props.row.description }}</q-td>
        </q-tr>
      </template>

      <template v-slot:no-data>
        <div class="text-center q-pa-md">
          There is no transactions history
        </div>
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useTransactionStore } from 'src/stores/transactions-store'

const transactionStore = useTransactionStore()
const transactions = ref([])

const columns = [
  { name: 'txn_id', label: 'Transaction ID', align: 'left', field: 'txn_id' },
  { name: 'created_at', label: 'Date', align: 'left', field: 'created_at' },
  { name: 'transaction', label: 'Transaction', align: 'left', field: 'transaction' },
  { name: 'description', label: 'Description', align: 'left', field: 'description' }
]

dayjs.extend(utc)
dayjs.extend(timezone)

function formatDate(time) {
  const date = dayjs(time).tz('Asia/Dhaka')
  return {
    date: date.format('D MMMM YYYY'),      // e.g. 15 November 2025
    time: date.format('hh:mm:ss A'),       // e.g. 10:15:32 PM
  }
}

function formatTransaction(txn) {
  if (txn.type === 'credit') return `${txn.to_account} is credited ${txn.amount} Taka`
  if (txn.type === 'debit') return `${txn.from_account} is debited ${txn.amount} Taka`
  if (txn.type === 'transfer')
    return `${txn.amount} transferred from ${txn.from_account} to ${txn.to_account}`
  return ''
}

onMounted(async () => {
  await transactionStore.fetchTransactions()
  transactions.value = transactionStore.transactions
})
</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}

.q-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.text-center {
  color: #666;
}
</style>



