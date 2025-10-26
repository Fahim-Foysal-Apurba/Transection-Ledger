<template>
  <q-card flat class="q-pa-md">

    <q-card-section>
      <div class="text-h6 text-center">Transaction History</div>
    </q-card-section>

    <q-table
      :rows="transactionStore.transactions"
      :columns="columns"
      row-key="txn_id"
      flat
      bordered
      :rows-per-page-options="[10]"
    >
      <template v-slot:body="props">

        <q-tr :props="props">
          <q-td key="txn_id"  :props="props">{{ props.row.txn_id }}</q-td>

          <q-td key="created_at" class="bg-warning" :props="props">
            <div>{{ formatDate(props.row.created_at).date }}</div>
            <div class="text-caption text-grey-7">{{ formatDate(props.row.created_at).time }}</div>
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
import { onMounted, watch, ref } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useTransactionStore } from 'src/stores/transactions-store'

const transactionStore = useTransactionStore()
const prevLength = ref(0)


const columns = [
  { name: 'txn_id', label: 'Transaction ID', align: 'center', field: 'txn_id' },
  { name: 'created_at', label: 'Date', align: 'center', field: 'created_at' },
  { name: 'transaction', label: 'Transaction', align: 'center', field: 'transaction' },
  { name: 'description', label: 'Description', align: 'center', field: 'description' }
]

dayjs.extend(utc)
dayjs.extend(timezone)

function formatDate(time) {
  const date = dayjs(time).tz('Asia/Dhaka')
  return {
    date: date.format('D MMMM YYYY'),    
    time: date.format('hh:mm:ss A'),       
  }
}

function formatTransaction(txn) {
  if (txn.type === 'credit') return `Account Id ${txn.to_account} is credited ${txn.amount} Taka`
  if (txn.type === 'debit') return `Account Id ${txn.from_account} is debited ${txn.amount} Taka`
  if (txn.type === 'transfer')
    return `${txn.amount} taka transferred from Account ID ${txn.from_account} to Account ID ${txn.to_account}`
  return ''
}
watch(() => transactionStore.transactions.length, async (newLength) => {
    if (newLength > prevLength.value) {
     await transactionStore.fetchTransactions()
    }
    prevLength.value = newLength
  }
)

onMounted(async () => {
  await transactionStore.fetchTransactions()
  prevLength.value = transactionStore.transactions.length
})
</script>

<style scoped>
.text-h6 {
  font-weight: 600;
}
</style>



